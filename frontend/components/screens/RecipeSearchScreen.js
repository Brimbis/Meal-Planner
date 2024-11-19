import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Button, ScrollView, Image, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIPAddress from "../IPAddress";

export default function RecipeSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { query, ingredients } = route.params; // Get query and selected ingredients
  const [data, setData] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(true);

  const fetchRecipes = async () => {
    setRecipeLoading(true);
    try {

      const requestBody = {
        query: query,
        ingredients: ingredients.toString(),
      };

      console.log(JSON.stringify(requestBody));
      // Make POST request
      const response = await fetch(`http://${getIPAddress()}:5000/API/search`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Error: response not ok", response);
        return;
      }

      const result = await response.json();
      setData(result); // Update state with the data from API
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRecipeLoading(false);
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

      {recipeLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={{ marginTop: 20 }}>
          {data &&
            data.results.map((recipe, index) => (
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
