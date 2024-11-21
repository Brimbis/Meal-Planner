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
import API from "../API";

export default function DailyCalories({ navigation }) {
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    async function fetchMealsAndNutrition() {
      try {
        const meals = API.getSavedMeals();
        console.log('meals:', meals); 
        console.log("Fetched meals:", meals);
        if (meals.length > 0) {
          const nutritionData = await getNutritionData(meals[0].id);
          setCalories(nutritionData.calories);
        }
      } catch (error) {
        console.error("Error fetching meals or nutrition data:", error);
      }
    }

    fetchMealsAndNutrition();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View style={CaloriesStyles.caloriesContainer}>
          <Text style={styles.title}>Daily Calories: {calories} </Text>
          {/* <Text style={styles.title}>Daily Calories</Text>
      {calories !== null ? (
        <Text style={styles.caloriesText}>
          You have consumed {calories} calories today.
        </Text>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )} */}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const CaloriesStyles = StyleSheet.create({
  caloriesContainer: {
    alignSelf: "center",
    backgroundColor: "#16423C",
    width: "80%",
    height: "auto",
  },
});
