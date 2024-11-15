// HomeScreen.js
import React from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View, 
  FlatList, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var now = new Date();
var dayNum = now.getDay() - 1;

function getNextDay() {
  (dayNum < 6) ? dayNum += 1 : dayNum = 0;
  return days[dayNum];
}

const WEEKDAYS = [
  {
    day: getNextDay(), 
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(), 
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(),
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(), 
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(),  
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(), 
    meal1: "", 
    meal2: "", 
  }, 
  {
    day: getNextDay(), 
    meal1: "", 
    meal2: "", 
  }, 
]

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
        <FlatList
          data={WEEKDAYS}
          renderItem={({ item }) => (
          <View>
            <View paddingTop={50}/>
              <View style={styles.weekdayBox}>
                <Text style={styles.weekdayText}>{item.day}</Text>
              </View>
              <View style={styles.mealBox}>
                <Text style={styles.mealBoxText}>Meal Data</Text>
              <View style={styles.mealBoxSeparatorLine}></View>
                <Text style={styles.mealBoxText}>Meal Data</Text>
              <View style={styles.mealBoxSeparatorLine}></View>
                <Text style={styles.mealBoxText}>Estimated Calories:</Text>
              </View>
            <View paddingTop={50}/>
          </View>
          )}
          />
      </LinearGradient>
    </SafeAreaView>
  );
}