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
//import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function DailyCalories({ navigation }) {
  const [weeklyCalories, setWeeklyCalories] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  // Fetch meals and nutrition data
  useEffect(() => {
    async function fetchMealsAndNutrition() {
      console.log("API.selectedMeals:", API.selectedMeals);
      try {
        const meals = API.selectedMeals;
        console.log("meals:", meals);
        console.log("Fetched meals:", meals);
        if (meals.length > 0) {
          let dailyCalories = { ...weeklyCalories };

          // Split meals into pairs
          for (let i = 0; i < meals.length; i += 2) {
            const mealPair = meals.slice(i, i + 2);

            // Fetch nutrition data for each meal
            for (let meal of mealPair) {
              let totalDailyCalories = 0;
              const nutritionData = await API.getNutritionData(meal.toString());
              const calories = parseFloat(nutritionData.calories);
              totalDailyCalories += calories;
              console.log("Calories for meal:", nutritionData.calories);

              const day = getDay(i / 2);
              dailyCalories[day] += totalDailyCalories;
              console.log(`total calories for' ${day}:' ${dailyCalories[day]}`);
            }
            setWeeklyCalories(dailyCalories);
          }
        }
      } catch (error) {
        console.error("Error fetching meals or nutrition data:", error);
      }
    }

    fetchMealsAndNutrition();
  }, []);

  const getDay = (index) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days[index % 7];
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        {Object.keys(weeklyCalories).map((day, index) => (
          <View key={index} style={CaloriesStyles.caloriesContainer}>
            <Text style={styles.title}>
              {day}: {weeklyCalories[day]}
            </Text>
          </View>
        ))}
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
