import React, { useState } from "react";
import { SafeAreaView, Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native"; // To navigate to the new screen

export default function SearchScreen() {
  const navigation = useNavigation();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Sample list of ingredients
  const ingredientList = ["blueberries", "strawberries", "beef", "chicken", "carrots", "spinach", "bread"];

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSearch = () => {
    // Navigate to 'RecipeSearchScreen' within the 'SearchStack' and pass the ingredients as params
    navigation.navigate('RecipeSearchScreen', {
      ingredients: selectedIngredients,  // Pass the selected ingredients to the RecipeSearchScreen
    });
  };
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Search</Text>

      {/* Scrollable Ingredient Buttons */}
      <ScrollView horizontal style={{ marginVertical: 20 }} showsHorizontalScrollIndicator={false}>
        {ingredientList.map((ing) => (
          <TouchableOpacity
            key={ing}
            onPress={() => handleIngredientSelect(ing)}
            style={{
              backgroundColor: "#6A9C89",
              padding: 10,
              marginRight: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{ing}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button to trigger the recipe search */}
      <Button title="Search Recipes" onPress={handleSearch} />
    </SafeAreaView>
  );
}
