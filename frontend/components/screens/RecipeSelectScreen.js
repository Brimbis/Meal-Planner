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
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {/* Container for the top buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Pressable
          style={{
            backgroundColor: "#C4DAD2",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#16423C" />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#C4DAD2",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => API.addSavedMeals(recipe.id)}
        >
          <Ionicons name="bookmark" size={24} color="#16423C" />
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
              style={{ 
                width: 200, 
                height: 200, 
                borderRadius: 100,
                borderWidth: 5,
                borderColor: "#16423C",}}
              resizeMode="cover"
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, textAlign: "center"}}>{recipe?.title}</Text>
            <Text style={{ fontSize: 16, marginTop: 10, color: "#6A9C89" }}>
              <Text style={{ fontWeight: "bold" }}>{calories || "N/A"}</Text> cal
            </Text>


          </View>
  
          {/* Display ingredients */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#16423C" }}>
              Ingredients:
            </Text>
            <FlatList
              data={ingredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={{ fontSize: 16, color: "#6D9083" }}>
                  • {item.name}: {item.amount.us.value} {item.amount.us.unit}
                </Text>
              )}
            />
          </View>


        </ScrollView>
      </View>
  
      {/* Back to RecipeSearchScreen */}
      <Pressable
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 20,
          marginBottom: 70, // Space from the bottom edge
          alignSelf: "center", // Center the button horizontally
          width: "90%", // Make the button wide
        }}
        onPress={() => API.addSelectedMeals(recipe.id)}
      >
        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 }}>Add to Home</Text>
      </Pressable>
    </SafeAreaView>
    </View>
    </LinearGradient>
  );
  
}
