// HomeScreen.js
import React, { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import API from "../API";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [homeMeals, setHomeMeals] = useState(API.homeMeals);
  const [mealData, setMealData] = useState([]);
  const [notification, setNotification] = useState("");

  const fetchMeals = async () => {
    setHomeMeals(API.homeMeals);

    try {

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
            const meal1 = homeMeals[mealIndex] || {}; // Fallback to empty object if no meal data
            mealIndex++;
            const meal2 = homeMeals[mealIndex] || {}; // Fallback to empty object if no meal data
            mealIndex++;

            // Calculate total calories for the day
            const calories = (meal1.calories ? parseInt(meal1.calories) : 0) + 
                             (meal2.calories ? parseInt(meal2.calories) : 0);

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
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMeals(); // Fetch meals every time the screen is focused
    }, [])
  );

  useEffect(() => {
    fetchMeals();
  }, [homeMeals]);

  const handleDeletePress = (id) => {
    API.removeHomeMeal(id);
    setHomeMeals([...API.homeMeals]);
    showNotification("Meal removed from home!");
  }

  const handleBookmarkPress = (id, title, image) => {
    console.log("Meal bookmarked: ", id, title, image);
    if (API.addBookmarkedMeal(id, title, image)) {
      showNotification("Meal added to bookmarks!")
    }
    else {
      showNotification("Meal is already bookmarked")
    }
  }

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
  };


  return (
    <SafeAreaView>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
      
      {/* Notification Message */}
      {notification ? (
            <View
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                backgroundColor: "#0D2A26",
                padding: 10,
                borderRadius: 20,
                zIndex: 1,
              }}
            >
              <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                {notification}
              </Text>
            </View>
          ) : null}
      
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
                    <View paddingRight={20}>
                      <Pressable 
                        paddingVertical={20}
                        onPress={() => handleDeletePress(item.meal1.id)}
                        >
                        <Ionicons name="trash" size={24} color="#16423C"/>
                      </Pressable>
                      <Pressable
                        onPress={() => handleBookmarkPress(item.meal2.id, item.meal2.title, item.meal2.image)}
                      >
                        <Ionicons name="bookmark" size={24} color="#16423C"/>
                      </Pressable>
                    </View>
                  </Pressable>
                </>
              ) : (
                <View marginVertical={50}>
                  <Text style={homeStyles.mealBoxNoneAddedText}>No meal added</Text>
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
                    <View paddingRight={20}>
                      <Pressable 
                        paddingVertical={20}
                        onPress={() => handleDeletePress(item.meal2.id)}
                        >
                        <Ionicons name="trash" size={24} color="#16423C"/>
                      </Pressable>
                      <Pressable
                        onPress={() => handleBookmarkPress(item.meal2.id, item.meal2.title, item.meal2.image)}
                      >
                        <Ionicons name="bookmark" size={24} color="#16423C"/>
                      </Pressable>
                    </View>
                  </Pressable>
                </>
                ) : (
                  <View marginVertical={50}>
                    <Text style={homeStyles.mealBoxNoneAddedText}>No meal added</Text>
                  </View>
                )}

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Calories Section */}
              <View style={homeStyles.calorieContainer}>
                <Text style={homeStyles.calorieText}>Estimated Calories:</Text>
                <Text style={homeStyles.calorieNumber}>  {item.calories.toString()}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <View paddingBottom={50} />
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
    paddingHorizontal: 10,
    flex: 1,
  },

  mealBoxNoneAddedText: {
    fontSize: 16,
    color: '#5D5D5D', 
    fontSize: 18,
    alignSelf: "center", 
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
    paddingLeft: 15,
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
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  calorieText: {
    fontSize: 16,
    color: '#5D5D5D', 
    fontSize: 18,
    textAlign: "center",
  }, 

  calorieNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#16423C",
    textAlign: "center",
  }, 
});