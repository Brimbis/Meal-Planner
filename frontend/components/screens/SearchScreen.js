import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(""); // State for meal type search
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State for selected ingredients

  // Ingredient categories
  const ingredients = {
    Protein: ["Chicken", "Beef", "Pork", "Turkey", "Fish", "Tofu", "Beans", "Eggs"],
    Fruits: ["Apples", "Oranges", "Bananas", "Strawberries", "Blueberries", "Pineapple", "Grapes", "Mango", "Avocado"],
    Vegetables: ["Carrots", "Broccoli", "Spinach", "Bell Peppers", "Tomatoes", "Cucumbers", "Cauliflower", "Zucchini"],
    Grains: ["Rice", "Oats", "Pasta", "Bread", "Corn"],
    Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream"],
    NutsAndSeeds: ["Almonds", "Walnuts", "Peanuts", "Chia Seeds"],
    FatsAndOils: ["Olive Oil", "Coconut Oil", "Avocado Oil", "Butter"],
  };

  // Handle selecting/deselecting ingredients
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
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <TextInput
          placeholder="Enter a meal type (e.g., salad, sandwich)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            borderWidth: 1,
            fontSize: 12,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            flex: 1, // Ensures the TextInput takes up available space
          }}
        />
        <Pressable onPress={handleSearch}>
          <Ionicons name="search" size={30} color="#6A9C89" style={{ marginLeft: 10 }} />
        </Pressable>
      </View>

      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
          Select ingredients
        </Text>

        <ScrollView style={{ marginBottom: 20 }} showsVerticalScrollIndicator={false}>
          {/* Protein Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Protein</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Protein.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Fruits Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Fruits</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Fruits.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Vegetables Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Vegetables</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Vegetables.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Grains Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Grains</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Grains.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Dairy Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Dairy</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Dairy.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Nuts & Seeds Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Nuts & Seeds</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.NutsAndSeeds.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {/* Fats & Oils Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Fats & Oils</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.FatsAndOils.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#16423C" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        {/* Clear Selected Ingredients Button */}
        <Pressable
          onPress={() => setSelectedIngredients([])} // Clears the selected ingredients
          style={{
            marginTop: 10,
            backgroundColor: "#f44336", // Red color for the clear button
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Clear Ingredients</Text>
        </Pressable>
        <View paddingBottom={50}/>
      </SafeAreaView>
    </SafeAreaView>
  );
}
