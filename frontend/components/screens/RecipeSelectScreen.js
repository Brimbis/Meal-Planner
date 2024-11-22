import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { LinearGradient } from "expo-linear-gradient";
import styles from '../styles/styles.js';
import getIPAddress from "../IPAddress";
import API from "../API";

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
      const calorieResponse = await fetch(`http://${getIPAddress()}:5000/api/nutrition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const calorieData = await calorieResponse.json();
      setCalories(calorieData.calories);

      const ingredientResponse = await fetch(`http://${getIPAddress()}:5000/api/ingredients`, {
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
      {/* Container for the top buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Pressable
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#FF5722",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => API.addSavedMeals(recipe.id)}
        >
          <Ionicons name="bookmark" size={24} color="white" />
        </Pressable>
      </View>
  
      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80 }} // Add bottom padding to avoid overlap
        >
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
              <Text style={{ fontSize: 16 }}>
                - {item.name}: {item.amount.us.value} {item.amount.us.unit}
              </Text>
            )}
          />
        </ScrollView>
      </View>
  
      {/* Back to RecipeSearchScreen */}
      <Pressable
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 5,
          marginBottom: 70, // Space from the bottom edge
          alignSelf: "center", // Center the button horizontally
          width: "90%", // Make the button wide
        }}
        onPress={() => API.addHomeMeals(recipe.id, recipe.title, recipe.image, calories)}
      >
        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Add to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
  
}
