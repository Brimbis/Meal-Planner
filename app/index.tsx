import {
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePress = () => {
    if (!isLogin) {
      if (firstName && lastName && email && password) {
        setIsComplete(true);
        setGreeting(
          `Welcome, ${firstName}! Thank you for Registering an account with us!`
        );
      } else {
        setIsComplete(false);
        setGreeting(`Please fill in all fields!`);
      }
    }
    else {
      if (email && password) {
        setIsComplete(true);
        setGreeting(
          `Login Successful`
        );
      } else {
        setIsComplete(false);
        setGreeting(`Please fill in all fields!`);
      }
    }
  };

  const handleSwitchLogin = () => {
    if (isLogin){
      setIsLogin(false);
    }
    else {
      setIsLogin(true)
    }
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setGreeting("")
  };

  if (isLogin == false) {
    return (
      <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        dither={true}
        locations={[0.1, 0.8]}
        start={[0.1, 0.2]}
        style={styles.linearGradient}
      >
        <Text style={styles.title}> Register Now </Text>
        <View style={styles.separator}/>
        <View style={styles.inputContainer}>
        <Text style={styles.smallTitle}>First Name</Text>
          <TextInput
            style={styles.textInput}
            selectionColor={"azure"}
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.smallTitle}>Last Name</Text>
          <TextInput
            style={styles.textInput}
            selectionColor={"azure"}
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
        </View>
          <View style={styles.inputContainer}>
          <Text style={styles.smallTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            selectionColor={"azure"}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.smallTitle}>Password</Text>
          <TextInput
            style={styles.textInput}
            selectionColor={"azure"}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.separator}/>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={handlePress}
            color="#0D2A26"
            />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Switch to Login"
            onPress={handleSwitchLogin}
            color="#0D2A26"
            />
        </View>
        <Text
          style={[styles.paragraph, { color: isComplete ? "aquamarine" : "salmon" }]}>
          {greeting}
        </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        dither={true}
        locations={[0.1, 0.8]}
        start={[0.1, 0.2]}
        style={styles.linearGradient}
        >
          <Text style={styles.title}> Sign In </Text>
          <View style={styles.separator}/>
          <View style={styles.inputContainer}>
            <Text style={styles.smallTitle}>Email</Text>
            <TextInput
              style={styles.textInput}
              selectionColor={"azure"}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
          <Text style={styles.smallTitle}>Password</Text>
            <TextInput
              style={styles.textInput}
              selectionColor={"azure"}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <View style={styles.separator}/>
          <View style={styles.buttonContainer}>
            <Button 
              title="Login" 
              onPress={handlePress}
              color="#0D2A26"
              />
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              title="Switch to Sign Up" 
              onPress={handleSwitchLogin}
              color="#0D2A26"
              />
          </View>
          <Text
            style={[styles.paragraph, { color: isComplete ? "aquamarine" : "salmon" }]}>
            {greeting}
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#16423C",
    padding: 8,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textInput: {
    height: 40,
    width: 400,
    borderColor: "white",
    borderWidth: 1,
    marginHorizontal: "auto",
    marginVertical: 10,
    padding: 10,
  },

  inputContainer: {
    width: 400,
    marginHorizontal: "auto",
    fontFamily: "Inter", 
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white", 
  },
  smallTitle: {
    fontSize: 15, 
    fontWeight: "bold",
    color: "white",  
  }, 

  buttonContainer: {
    height: 40,
    width: 200,
    marginHorizontal: "auto",
    marginVertical: 5, 
  },

  separator: {
    marginVertical: 8,
  }
});
