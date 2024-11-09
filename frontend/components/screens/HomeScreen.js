// HomeScreen.js
import React from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
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
          {/* Navigate to APItest screen */}
          <Pressable
            style={styles.buttonContainerSmall}
            onPress={() => navigation.navigate("APICall")}
          >
            <Text style={styles.smallTitle}>Go to API Test</Text>
          </Pressable>
      </View>
      <View style={styles.separator}/>
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