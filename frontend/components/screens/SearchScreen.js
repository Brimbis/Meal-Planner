import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(""); // State for meal type search
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State for selected ingredients

  // List of ingredients
  const ingredientList = ["blueberries", "strawberries", "beef", "chicken", "carrots", "spinach", "bread"];

  // Add/remove ingredients from selected list
  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  // Navigate to RecipeSearchScreen with query and selected ingredients
  const handleSearch = () => {
    navigation.navigate("RecipeSearchScreen", {
      query: searchQuery.trim(),
      ingredients: selectedIngredients,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Search</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Enter a meal type (e.g., salad, sandwich)"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginVertical: 20,
        }}
      />

      {/* Scrollable Ingredient Buttons */}
      <ScrollView horizontal style={{ marginVertical: 20 }} showsHorizontalScrollIndicator={false}>
        {ingredientList.map((ing) => (
          <TouchableOpacity
            key={ing}
            onPress={() => handleIngredientSelect(ing)}
            style={{
              backgroundColor: selectedIngredients.includes(ing) ? "#16423C" : "#6A9C89",
              padding: 10,
              marginRight: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{ing}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Button title="Search Recipes" onPress={handleSearch} />
      </View>
    </SafeAreaView>
  );
}
