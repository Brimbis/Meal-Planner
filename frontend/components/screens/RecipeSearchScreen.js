import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Button, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIPAddress from "../IPAddress";

export default function RecipeSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { query, ingredients } = route.params; // Get query and selected ingredients
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(query, ingredients);
  /*
  const fetchRecipes = async () => {
    try {
      setLoading(true);
  
      // Construct the API URL with query and ingredients
      const baseUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";
      const params = new URLSearchParams({
        query: query || "",
        includeIngredients: ingredients.join(","),
        number: 10,
        instructionsRequired: "true",
        ignorePantry: "true",
        sort: "max-used-ingredients",
      }).toString();
  
      const url = `${baseUrl}?${params}`;
  
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "176739f866msh27757afccb10db1p171ceajsn0e4ff12ef3b1",
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };
  
      // First API call
      const response = await fetch(url, options);
      const result = await response.json();
      const recipes = result.results || []; // Extract recipes
  
      // Nested API calls to fetch calorie data
      const enrichedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          try {
            const calorieUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/nutritionWidget.json`;
  
            const calorieResponse = await fetch(calorieUrl, options);
            const calorieData = await calorieResponse.json();
  
            return { ...recipe, calories: calorieData.calories }; // Append calorie data
          } catch (error) {
            console.error(`Error fetching calorie data for recipe ${recipe.id}:`, error);
            return { ...recipe, calories: "N/A" }; // Fallback for failed requests
          }
        })
      );
  
      setData(enrichedRecipes); // Update state with enriched recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  */

  const fetchRecipes = async () => {
    setLoading(true);
    try {

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (query) queryParams.append('query', query);
      if (ingredients.length > 0) queryParams.append('ingredients', ingredients.join(','));

      const requestBody = JSON.stringify({
        query: query,
        ingredients: ingredients,
      });

      // Make POST request
      const response = await fetch(`http://${getIPAddress()}:5000/API/search`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          requestBody,
        }
      });

      if (!response.ok) {
        console.error("Error: response not ok", response.status);
        return;
      }

      const result = await response.json();
      setData(result); // Update state with the data from API
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, [query, ingredients]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Recipes</Text>

      {/* Back Button */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />

      {loading ? (
        <Text style={{ textAlign: "center", marginVertical: 20 }}>Loading...</Text>
      ) : (
        <ScrollView style={{ marginTop: 20 }}>
          {data &&
            data.map((recipe, index) => (
              <View key={index} style={{ marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10 }}>
                {/* Recipe Title */}
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{recipe.title}</Text>

                {/* Recipe Image */}
                {recipe.image && (
                  <Image
                    source={{ uri: recipe.image }}
                    style={{ width: "100%", height: 200, marginVertical: 10, resizeMode: "cover" }}
                  />
                )}

                {/* Recipe Calories */}
                <Text style={{ fontSize: 16, color: "#555", textAlign: "center" }}>
                  Calories: {recipe.calories || "N/A"}
                </Text>

              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
