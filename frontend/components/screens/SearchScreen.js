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
import { LinearGradient } from "expo-linear-gradient";
import styles from '../styles/styles.js';

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
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Search</Text>

      {/* Search Bar */}
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <View style={{ flexDirection: "row", flex: 1, overflow: "hidden" }}>
          {/* TextInput inside a View to maintain border radius */}
          <TextInput
            placeholder="Enter a meal type (e.g., salad, sandwich)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              backgroundColor: "white", // White background inside the search bar
              fontSize: 12,
              color: "#888", // Grey text color
              borderWidth: 1,
              border: "none",
              borderRadius: 20,
              padding: 10,
              cursor: "none",
              flex: 1, // Ensures TextInput takes up available space
            }}
          />
          {/* Search Icon inside the search bar */}
          <Pressable
            onPress={handleSearch}
            style={{
              position: "absolute", // To position the icon inside the TextInput
              right: 10, // Places the icon on the right side
              top: "50%", // Vertically centers the icon
              transform: [{ translateY: -11 }], // Adjusts for perfect vertical centering
            }}
          >
            <Ionicons name="search" size={20} color="#6A9C89" />
          </Pressable>
        </View>
      </View>


      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20, color: "#16423C" }}>
          Select ingredients
        </Text>

        <ScrollView style={{ marginBottom: 60 }} showsVerticalScrollIndicator={false}>
          {/* Protein Section */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5}}>Protein:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Protein.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#4CAF50" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10, }}>Fruits:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Fruits.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10,}}>Vegetables:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Vegetables.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10, }}>Grains:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Grains.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10, }}>Dairy:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.Dairy.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10, }}>Nuts & Seeds:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.NutsAndSeeds.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10, }}>Fats & Oils:</Text>
          <View style={styles.separatorLineSearch}/>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {ingredients.FatsAndOils.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleIngredientSelect(item)}
                style={{
                  backgroundColor: selectedIngredients.includes(item) ? "#03E18D" : "#6A9C89",
                  padding: 10,
                  marginRight: 10,
                  marginBottom: 10,
                  borderRadius: 20,
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
        {selectedIngredients.length > 0 && (
          <Pressable
            onPress={() => setSelectedIngredients([])} // Clears the selected ingredients
            style={{
              marginTop: "auto",
              backgroundColor: "#bf5f52", // Lighter green color
              paddingVertical: 10,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 60, // Adds space to lift the button above the nav bar
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Clear Ingredients
            </Text>
          </Pressable>
        )}

        <View paddingBottom={50}/>
      </SafeAreaView>
      
    </SafeAreaView>
    </View>
    </LinearGradient>
  );
}
