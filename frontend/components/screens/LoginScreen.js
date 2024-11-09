import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from '../styles/styles.js';
import getIPAddress from "../IPAddress.js";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handlePress = async () => {
    if (isLogin) {
      if (email === "" || password === "") {
        setMessage("Please fill out all fields.");
        return;
      }
    } else {
      if (
        email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === ""
      ) {
        setMessage("Please fill out all fields.");
        return;
      }
    }

    const url = isLogin
      ? `http://${getIPAddress()}:5000/users/login`
      : `http://${getIPAddress()}:5000/users/register`;

    const body = isLogin
      ? { email: email, password }
      : { email: email, password, firstname: firstName, lastname: lastName };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage("Login successful");
          if (result.token) {
            // Save token and update login state
            await AsyncStorage.setItem("token", result.token);
            await AsyncStorage.setItem("firstname", result.firstname);
            await AsyncStorage.setItem("lastname", result.lastname);
            await AsyncStorage.setItem("email", result.email);
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          }
        } else {
          setMessage("Registration successful. Please log in.");
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error connecting to the server.");
    }
  };

  const handleSwitchLogin = () => {
    if (isLogin) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  if (isLogin == false) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
        >
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.separator} />
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
              secureTextEntry={true}
            />
          </View>
          <View style={styles.separator} />
          <Pressable style={styles.buttonContainerLarge} onPress={handlePress}>
            <Text style={styles.title}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.buttonContainerSmall}
            onPress={handleSwitchLogin}
          >
            <Text style={styles.smallTitle}>Switch to Login</Text>
          </Pressable>
          <Text style={styles.paragraph} color={"aquamarine"}>
            {message}
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
          <Text style={styles.title}>Login</Text>
          <View style={styles.separator} />
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
              secureTextEntry={true}
            />
          </View>
          <View style={styles.separator} />
          <Pressable style={styles.buttonContainerLarge} onPress={handlePress}>
            <Text style={styles.title}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.buttonContainerSmall}
            onPress={handleSwitchLogin}
          >
            <Text style={styles.smallTitle}>Switch to Sign Up</Text>
          </Pressable>
          <Text style={styles.paragraph}>{message}</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}