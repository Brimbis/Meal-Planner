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
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 16, textAlign: "center" }}>Here are some recipes based on your selections:</Text>

      {/* Back Button */}
      <Pressable
        style={{
          backgroundColor: "#E0E0E0",
          padding: 10,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          alignSelf: "flex-start",
          marginTop: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

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
                    padding: 10,
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
                        width: "100%",
                        height: 120,
                        borderRadius: 10,
                        resizeMode: "cover",
                        marginBottom: 10,
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
                      backgroundColor: "#007bff",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 5,
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
  );
}
