// WelcomeScreen.js
import getIPAddress from "./IPAddress.js";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image, 
  ScrollView, 
} from "react-native";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${getIPAddress()}:5000/items/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const items = await response.json();
        setData(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSwitchToProfile = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Profile" }],
    });
  }


  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstname');
    await AsyncStorage.removeItem('lastname');
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleEditPress = (item) => {
    setSelectedItem(item);
    setIsEditModalVisible(true);
  };

  const handleDeletePress = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${getIPAddress()}:5000/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error(errorResponse.message || "Failed to delete item");
      }

      setData((prevData) => prevData.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Failed to delete item");
    }
  };

  const addItem = async (newItem) => {
    console.log("Adding item:", newItem);
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token in addItem:", token);
      const response = await fetch(`http://${getIPAddress()}:5000/items/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error(errorResponse.message || "Failed to add item");
      }
      const savedItem = await response.json();
      console.log("saved", savedItem);
      setData((prevData) => [savedItem, ...prevData]);
    } catch (error) {
      console.error("Error adding item", error);
      alert("Failed to add item");
    }
  };

  const saveEditedItem = async (editedItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${getIPAddress()}:5000/items/${editedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedItem.title,
            description: editedItem.description,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("server error", errorResponse);
        throw new Error(errorResponse.message || "Failed to update item");
      }

      const savedItem = await response.json();
      setData((prevData) =>
        prevData.map((item) => (item._id === editedItem._id ? savedItem : item))
      );
    } catch (error) {
      console.error("Error updating item", error);
      alert("Failed to update item");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
      >
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
      </View>
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff00ff" />
        ): data.length ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.itemActions}>
                  <TouchableOpacity onPress={() => handleEditPress(item)}>
                    <FontAwesome name="edit" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeletePress(item._id)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ):(
          <View>
            <Text alignSelf='center' 
                  style={styles.smallTitle}>No items found</Text>
          </View>
        )}
      </View>
      <AddItemModal onAddItem={addItem} />
      {selectedItem && (
            <EditItemModal
              item={selectedItem}
              isVisible={isEditModalVisible}
              onClose={() => setIsEditModalVisible(false)}
              onSave={saveEditedItem}
            />
      )}
      <View style={styles.footerContainer}>
      </View>
      <View style={styles.footerContainer}>
        <Pressable style={styles.buttonContainerSmall} onPress={handleLogout}>
          <Text style={styles.smallTitle}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.separator}/>
      <Pressable style={styles.buttonContainerSmall} onPress={handleSwitchToProfile}>
          <Text style={styles.smallTitle}>View Profile</Text>
      </Pressable>
      <Text style={styles.title}>Meet the team!</Text>
      <View style={styles.separator}/>
      <View style = {styles.footerContainer}>
        <Image style={styles.imageContainer} 
        source={require('./Pictures/vineboomcatrainbowatthesametimething.gif')}/>
      </View>
      </LinearGradient>
    </SafeAreaView>
  );
}