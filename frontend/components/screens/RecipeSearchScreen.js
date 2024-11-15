import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Button, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RecipeSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ingredients } = route.params; // Get the selected ingredients from the previous screen
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    if (ingredients.length === 0) return;

    try {
      setLoading(true);
      let allRecipes = [];

      // Loop through each selected ingredient and make an API call for each
      for (let ingredient of ingredients) {
        const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&ignorePantry=true&ranking=1`;

        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": "176739f866msh27757afccb10db1p171ceajsn0e4ff12ef3b1", // Replace with your actual API key
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        };

        const response = await fetch(url, options);
        const result = await response.json();
        allRecipes = [...allRecipes, ...result]; // Combine results from all API calls
      }

      setData(allRecipes); // Set combined data from all ingredients
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes once ingredients are passed
  }, [ingredients]);

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
                    style={{ width: "100%", height: 200, marginVertical: 10, resizeMode: 'cover' }}
                  />
                )}
              </View>
            ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}