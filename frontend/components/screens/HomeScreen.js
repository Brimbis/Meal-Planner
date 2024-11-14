// HomeScreen.js
import React from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image, 
  ScrollView, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var now = new Date();
var day = days[ now.getDay() ];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.topContainer}>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
        <ScrollView>
          <View paddingTop={100}/>
          <View style={styles.weekdayBox}>
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
          <View style={styles.mealBox}>
            <Text style={styles.mealBoxText}>Estimated Calories:</Text>
          </View>
          <Text style={styles.title}>Meet the team!</Text>
          <View style={styles.separator}/>
          <View style = {styles.footerContainer}>
            <Image style={styles.imageContainer} 
            source={require('../pictures/vineboomcatrainbowatthesametimething.gif')}/>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}