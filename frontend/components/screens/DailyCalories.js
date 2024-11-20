import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function DailyCalories({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Calories</Text>
      {/* Add your components and logic here */}
    </View>
  );
}

const CaloriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
