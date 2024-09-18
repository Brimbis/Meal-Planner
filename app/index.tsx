import {
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePress = () => {
    if (firstName && lastName && email && password) {
      setIsComplete(true);
      setGreeting(
        `Welcome, ${firstName}! Thank you for Registering an account with us!`
      );
    } else {
      setIsComplete(false);
      setGreeting(`Please fill in all fields!`);
      setIsLogin(false);
    }
  };

  const handleSwitchLogin = () => {
    setIsLogin(true);
  };

  if (isLogin == false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Register Now </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
        />
        <View style={styles.buttonContainer}>
          <Button title="Sign Up!!" onPress={handlePress} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Switch to Login" onPress={handleSwitchLogin} />
        </View>
        <Text
          style={[styles.paragraph, { color: isComplete ? "green" : "red" }]}
        >
          {greeting}
        </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Sign In </Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
        />
        <View style={styles.buttonContainer}>
          <Button title="Login In!!" onPress={handlePress} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Back to sign up!" onPress={handlePress} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    width: "75%",
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: "auto",
    marginVertical: 10,
    padding: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  buttonContainer: {
    height: 40,
    width: "40%",
    marginHorizontal: "auto",
  },
});
