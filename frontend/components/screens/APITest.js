import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, FlatList, Button, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/styles'; // Correct import path for styles
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIPAddress from '../IPAddress';

export function APITest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${getIPAddress()}:5000/API/test`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error: response not ok", response.status);
        return;
      }

      const result = await response.json();
      setData(result); // Update state with the data from API
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // Render FlatList only if data is an array
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()} // Provide a unique key for each item
          renderItem={({ item }) => (
            <View style={styles.container}>
              {/* Assuming each item has a "name" and "ingredients" property */}
              <Text style={styles.itemText}>{item.id}</Text>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemText}>{item.image}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export function RecipeSearchTest() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Destructure query and ingredients with fallback values
  const { query = "", ingredients = [] } = route.params || {}; 

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");

      // If token is null, handle the case appropriately (redirect to login or show error)
      if (!token) {
        console.error('No token found');
        return;
      }

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (query) queryParams.append('query', query);
      if (ingredients.length > 0) queryParams.append('ingredients', ingredients.join(','));

      // Make GET request
      const response = await fetch(`http://${getIPAddress()}:5000/API/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Error: response not ok", response.status);
        return;
      }

      const result = await response.json();
      setData(result); // Update state with the data from API
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts or params change
  }, [query, ingredients]);

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
