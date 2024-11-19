import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Button, ScrollView, Image, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

  const fetchCalories = async (id) => {
    let mealData = await API.getMealData(JSON.stringify(id));
    return mealData.calories;
  };

  useEffect(() => {
    // Once recipes are loaded, fetch calories for each recipe
    if (data && data.results) {
      data.results.forEach(async (recipe) => {
        if (!calories[recipe.id]) {
          const calorieData = await fetchCalories(recipe.id);
          setCalories((prevState) => ({
            ...prevState,
            [recipe.id]: calorieData,
          }));
        }
      });
    }
  }, [data]); // Run this effect when `data` changes (i.e., recipes are fetched)

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
                  Calories: {calories[recipe.id] !== undefined ? calories[recipe.id] : "Loading..."}
                </Text>

              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  ); 
}
