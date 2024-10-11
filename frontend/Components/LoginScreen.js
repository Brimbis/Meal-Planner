import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState('');

  const handlePress = async () => {
    if (isLogin) {
      if (email === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    }
  
    const url = isLogin
      ? 'http://192.168.0.8:5000/login'
      : 'http://192.168.0.8:5000/register';
  
    const body = isLogin
      ? { username: email, password }
      : { username: email, password, firstname: firstName, lastname: lastName };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          if (result.token) {
            // Save token and update login state
            await AsyncStorage.setItem('token', result.token);
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>
        
        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </>
        )}
        
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title={isLogin ? "Login" : "Sign Up"}
              onPress={handlePress}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
              onPress={() => setIsLogin(!isLogin)}
            />
          </View>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width:'80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 'auto',
    marginBottom: 12,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: '75%', // 75% of the width
    marginBottom: 15, // spacing between buttons
  },
  message: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
  },
});
