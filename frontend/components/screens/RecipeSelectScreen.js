import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Button, View, Image, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RecipeSelectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params || {}; // Get the selected recipe data
  const [calories, setCalories] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (recipe?.id) {
      fetchRecipeDetails(recipe.id);
    }
  }, [recipe]);

  const fetchRecipeDetails = async (id) => {
    try {
      // Replace PORT with the actual port number
      const calorieResponse = await fetch("http://localhost:5000/api/id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const calorieData = await calorieResponse.json();
      setCalories(calorieData.calories);
  
      const ingredientResponse = await fetch("http://localhost:5000/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const ingredientData = await ingredientResponse.json();
      setIngredients(ingredientData.ingredients || []);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Recipe Details
      </Text>

      {/* Display recipe details */}
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Image
          source={{ uri: recipe?.image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>Title: {recipe?.title}</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Calories: {calories || "N/A"}</Text>
      </View>

      {/* Display ingredients */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Ingredients:</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16 }}>- {item.name}: {item.amount.us.value} {item.amount.us.unit}</Text>
        )}
      />

      {/* Back to RecipeSearchScreen */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}