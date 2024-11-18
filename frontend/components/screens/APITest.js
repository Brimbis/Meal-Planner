import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, SafeAreaView, FlatList } from 'react-native';
import styles from '../styles/styles'; // Correct import path for styles
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIPAddress from '../IPAddress';

export default function APITest({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    setLoading(true);
    console.log("fetching data...");
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log('No token found');
        return;
      }
      console.log('Token found:', token);

      const response = await fetch(`http://${getIPAddress()}:5000/API`, {
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
      console.log("API response data:", result);
      setData(result); // Update state with the data from API
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
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