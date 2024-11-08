// HomeScreen.js
import getIPAddress from "../IPAddress.js";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image, 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles.js";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation, setIsLoggedIn }) {

  const handleSwitchToProfile = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Profile" }],
    });
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstname');
    await AsyncStorage.removeItem('lastname');
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
      >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable style={styles.buttonContainerSmall} onPress={handleLogout}>
          <Text style={styles.smallTitle}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.separator}/>
      <Pressable style={styles.buttonContainerSmall} onPress={handleSwitchToProfile}>
          <Text style={styles.smallTitle}>View Profile</Text>
      </Pressable>
      <Text style={styles.title}>Meet the team!</Text>
      <View style={styles.separator}/>
      <View style = {styles.footerContainer}>
        <Image style={styles.imageContainer} 
        source={require('../pictures/vineboomcatrainbowatthesametimething.gif')}/>
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
}