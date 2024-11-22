import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { LinearGradient } from "expo-linear-gradient";
import styles from '../styles/styles.js';
import API from "../API";

export default function RecipeSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { query, ingredients } = route.params; // Get query and selected ingredients
  const [data, setData] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(true);
  const [calories, setCalories] = useState({});

  const fetchRecipes = async () => {
    setRecipeLoading(true);
    const recipeData = await API.searchAPI(query, ingredients.toString());
    setData(recipeData);
    setRecipeLoading(false);
  };

  // const fetchCalories = async (id) => {
  //   let mealData = await API.getNutritionData(JSON.stringify(id));
  //   return mealData.calories;
  // };

  // useEffect(() => {
  //   // Once recipes are loaded, fetch calories for each recipe
  //   if (data && data.results) {
  //     data.results.forEach(async (recipe) => {
  //       if (!calories[recipe.id]) {
  //         const calorieData = await fetchCalories(recipe.id);
  //         setCalories((prevState) => ({
  //           ...prevState,
  //           [recipe.id]: calorieData,
  //         }));
  //       }
  //     });
  //   }
  // }, [data]); // Run this effect when `data` changes (i.e., recipes are fetched)

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, [query, ingredients]);

  return (
    <LinearGradient
          colors={["#6A9C89", "#03E18D"]}
          style={styles.linearGradient}
          locations={[0, 0.9]}
          start={[0.1, 0.3]}
        >
      <View
        style={{
        flex: 1,
        marginTop: 30, // Adds spacing from the top
        backgroundColor: "#C4DAD2", // Background color
        borderRadius: 20, // Rounds the corners
        overflow: "hidden", // Ensures content respects rounded corners
      }}
    >
    <SafeAreaView style={{ flex: 1, padding: 20, paddingBottom: 70}}>
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
      {/* Back Button */}
      <Pressable
        style={{
          backgroundColor: "#C4DAD2",
          padding: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      {/* Text next to the back button */}
      <Text style={{ fontSize: 16, textAlign: "center", flex:1, marginLeft: -1 }}>
        Here are some recipes based on your selections:
      </Text>
    </View>


      {recipeLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {data &&
              data.results.map((recipe, index) => (
                <View
                  key={index}
                  style={{
                    width: "45%", // Each box takes up 45% of the width
                    borderRadius: 15,
                    backgroundColor: "#f8f8f8",
                    marginBottom: 20,
                    padding: 7,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 2, // for Android shadow
                    alignItems: "center",
                  }}
                >
                  {/* Recipe Image */}
                  {recipe.image && (
                    <Image
                      source={{ uri: recipe.image }}
                      style={{
                        width: 120, // Set width and height to the same value
                        height: 120,
                        borderRadius: 60, // Half of the width/height
                        borderWidth: 3,
                        borderColor: "#16423C",
                        overflow: "hidden", // Ensures the image respects the border radius
                        resizeMode: "cover",
                        marginBottom: 10,
                        marginTop: 10,
                      }}
                    />
                  )}

                  {/* Recipe Title */}
                  <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                    {recipe.title}
                  </Text>

                  {/* Recipe Calories
                  <Text style={{ fontSize: 14, color: "#555", textAlign: "center" }}>
                    Calories: {calories[recipe.id] !== undefined ? calories[recipe.id] : "Loading..."}
                  </Text> */}

                  {/* Navigate to RecipeSelectScreen */}
                  <Pressable
                    style={{
                      marginTop: 10,
                      backgroundColor: "#6A9C89",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                    onPress={() => navigation.navigate("RecipeSelectScreen", { recipe })}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
                      View Recipe
                    </Text>
                  </Pressable>
                </View>
              ))}
          </View>
        </ScrollView>
      )}
      
    </SafeAreaView>
    </View>
    </LinearGradient>
  );
}
