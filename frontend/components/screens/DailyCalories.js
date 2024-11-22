import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";
//import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function DailyCalories({ navigation }) {
  const [weeklyCalories, setWeeklyCalories] = useState([{}]);

  // Fetch meals and nutrition data
  // useEffect(() => {
  //   async function fetchMealsAndNutrition() {
  //     console.log("API.selectedMeals:", API.selectedMeals);
  //     try {
  //       const meals = API.selectedMeals;
  //       console.log("meals:", meals);
  //       console.log("Fetched meals:", meals);
  //       if (meals.length > 0) {
  //         let dailyCalories = { ...weeklyCalories };

  //         // Split meals into pairs
  //         for (let i = 0; i < meals.length; i += 2) {
  //           const mealPair = meals.slice(i, i + 2);

  //           // Fetch nutrition data for each meal
  //           for (let meal of mealPair) {
  //             let totalDailyCalories = 0;
  //             const nutritionData = await API.getNutritionData(meal.toString());
  //             const calories = parseFloat(nutritionData.calories);
  //             totalDailyCalories += calories;
  //             console.log("Calories for meal:", nutritionData.calories);

  //             const day = getDay(i / 2);
  //             dailyCalories[day] += totalDailyCalories;
  //             console.log(`total calories for' ${day}:' ${dailyCalories[day]}`);
  //           }
  //           setWeeklyCalories(dailyCalories);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching meals or nutrition data:", error);
  //     }
  //   }

  //   fetchMealsAndNutrition();
  // }, []);

  // const getDay = (index) => {
  //   const days = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday",
  //   ];
  //   return days[index % 7];
  // };

  useEffect(() => {
    async function fetchDailyCalories() {
      try {
        const dailyCalories = await API.dailyCalories;
        setWeeklyCalories(dailyCalories);
      } catch (error) {
        console.error("Error fetching daily calories:", error);
      }
    }

    fetchDailyCalories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >

        <Text style={CaloriesStyles.title}>Weekly Calories</Text>
        <View style={CaloriesStyles.caloriesContainer}>
          <FlatList
            data={weeklyCalories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "white",
                  width: "60%",
                  alignSelf: "center",
                }}
              >
                <Text style={styles.title}>
                  {item.day}: {item.calories}
                </Text>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const CaloriesStyles = StyleSheet.create({
  caloriesContainer: {
    alignSelf: "center",
    backgroundColor: "#16423C",
    width: "70%",
    height: "auto",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    color: "white",
    textDecorationLine: "underline",
    textAlign: "center",
    top: -50,
  },
});
