// HomeScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View, 
  FlatList,
  Image,
  ActivityIndicator, 
  StyleSheet, 
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState(API.selectedMeals);

  const fetchMeals = async () => {
    setLoading(true);
    setMealData([]);

    try {
        // Fetch meal and nutrition data for each meal ID
        const mealPromises = selectedMeals.map(id => API.getMealData(id.toString()));
        const nutritionPromises = selectedMeals.map(id => API.getNutritionData(id.toString()));

        // Await all meal and nutrition fetches
        const meals = await Promise.all(mealPromises);
        const nutrition = await Promise.all(nutritionPromises);

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const now = new Date();
        const currentDayIndex = now.getDay();

        const mealsOfTheWeek = [];

        // Initialize meal index tracker
        let mealIndex = 0;

        // Loop through the days of the week starting from today
        for (let i = 0; i < 7; i++) {
            const dayIndex = (currentDayIndex + i) % 7; // Cycle through the days of the week
            const dayName = daysOfWeek[dayIndex];

            // Get meal1 and meal2 sequentially
            const meal1 = meals[mealIndex] || {}; // Fallback to empty object if no meal data
            mealIndex++;
            const meal2 = meals[mealIndex] || {}; // Fallback to empty object if no meal data
            mealIndex++;

            const nutritionData1 = nutrition[mealIndex - 2] || {}; // Nutrition for the first meal (adjusted index)
            const nutritionData2 = nutrition[mealIndex - 1] || {}; // Nutrition for the second meal (adjusted index)

            // Calculate total calories for the day
            const calories = (nutritionData1.calories ? parseInt(nutritionData1.calories) : 0) + 
                             (nutritionData2.calories ? parseInt(nutritionData2.calories) : 0);

            const mealWithDay = {
                day: dayName,
                meal1: meal1,
                meal2: meal2,
                calories: calories,
            };

            // Add the meal object to the array for the week
            mealsOfTheWeek.push(mealWithDay);
        }

        // Set the meal data for the entire week (7 days)
        setMealData(mealsOfTheWeek);

    } catch (error) {
        console.error("Error fetching meals:", error);
    } finally {
        setLoading(false);
    }
};

  // Trigger meals fetching when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSelectedMeals(API.selectedMeals);
      fetchMeals();
    }, [])
  );


  return (
    <SafeAreaView>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
      
      <View paddingTop={50} />

      <FlatList
        data={mealData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          
          <View marginBottom={30}>

            {/* Day Title */}
            <View style={homeStyles.weekdayBox}>
              <Text style={homeStyles.weekdayText}>{item.day}</Text>
            </View>

            {/* Meal 1 and Meal 2 in a Single View */}
            <View style={homeStyles.mealBox}>

              {/* Meal 1 */}
              {Object.keys(item.meal1).length !== 0 ? (
                <>
                  <Pressable style={homeStyles.imageContainer}
                    onPress={() => navigation.navigate("HomeSelectScreen", { recipe: item.meal1 })}>

                    <Image
                    source={{ uri: item.meal1.image }}
                    style={homeStyles.mealImage}
                    />
                    <Text
                      style={homeStyles.mealBoxText}
                      numberOfLines={0}
                    >
                      {item.meal1.title}
                    </Text>
                    </Pressable>
                </>
              ) : (
                <View marginVertical={50}>
                  <Text style={homeStyles.mealBoxText}>No meal selected</Text>
                </View>
              )}
                

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Meal 2 */}
              {Object.keys(item.meal2).length !== 0 ? (
                <>
                  <Pressable style={homeStyles.imageContainer}
                    onPress={() => navigation.navigate("HomeSelectScreen", { recipe: item.meal2 })}>
                    <Image
                    source={{ uri: item.meal2.image }}
                    style={homeStyles.mealImage}
                    />
                    <Text
                      style={homeStyles.mealBoxText}
                      numberOfLines={0}
                    >
                      {item.meal2.title}
                    </Text>
                  </Pressable>
                </>
                ) : (
                  <View marginVertical={50}>
                    <Text style={homeStyles.mealBoxText}>No meal selected</Text>
                  </View>
                )}

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Calories Section */}
              <View style={styles.calorieContainer}>
                <Text style={homeStyles.mealBoxText}>Estimated Calories:</Text>
                <Text style={homeStyles.calorieNumber}>  {item.calories.toString()}</Text>
              </View>
            </View>
          </View>
        )}
      />
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#61A69C" />
          <View paddingBottom={50} />
        </>
      ) : (
        <View paddingBottom={50} />
      )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({

  mealBox: {
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10, 
    height: "auto",
    width: "85%",
    borderColor: "#6A9C89", 
    borderWidth: 5, 
  },

  mealBoxText: {
    fontSize: 16,
    color: '#5D5D5D', 
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },

  mealBoxSeparatorLine: {
    margin: 10,
    width: "80%",
    borderBottomColor: "#6A9C89",
    borderBottomWidth: 3,
    paddingBottom: 0,
    alignSelf: 'center', 
  },

  weekdayText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "left",
    color: "#16423C",
    paddingLeft: 20,
  },

  weekdayBox: {
    height: 45,
    width: "85%",
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10, 
    borderColor: "#6A9C89", 
    borderWidth: 5, 
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 20,
  },

  mealImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#16423C",
    marginHorizontal: 10,
  },

  calorieContainer: {
    paddingTop: 10,
    width: "90%", 
  },

  calorieNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#16423C",
  }, 
});