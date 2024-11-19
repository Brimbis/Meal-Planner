import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, Image, Pressable } from "react-native";
import styles from "../styles/styles"; // Ensure it's the correct path for styles
import { LinearGradient } from "expo-linear-gradient";
import API from "../API"; // Import the API class
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function BookmarkScreen({ navigation, setIsLoggedIn }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch favorite meals on component mount
    useEffect(() => {
        // Get favorite meal IDs from AsyncStorage
        const fetchFavoritesFromStorage = async () => {
            try {
                const savedFavoritesIds = JSON.parse(await AsyncStorage.getItem("favoriteMealIds")) || [];
                if (savedFavoritesIds.length > 0) {
                    const fetchFavorites = async () => {
                        try {
                            const mealRequests = savedFavoritesIds.map((mealId) =>
                                API.getMealData(mealId) // Using API class method to fetch meal data
                            );

                            // Wait for all meal data requests to resolve
                            const fetchedMeals = await Promise.all(mealRequests);

                            // Update the state with the fetched meal data
                            setFavorites(fetchedMeals);
                        } catch (err) {
                            setError("Failed to load favorite meals. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    };

                    fetchFavorites();
                } else {
                    setLoading(false); // If no favorites, stop loading
                }
            } catch (err) {
                setError("Error retrieving favorites.");
                setLoading(false);
            }
        };

        fetchFavoritesFromStorage();
    }, []);

    // Function to remove meal from favorites
    const removeFromFavorites = async (mealId) => {
        const updatedFavorites = favorites.filter(meal => meal.id !== mealId);
        setFavorites(updatedFavorites);

        // Update AsyncStorage with the new list of favorite IDs
        const updatedFavoriteIds = updatedFavorites.map(meal => meal.id);
        try {
            await AsyncStorage.setItem("favoriteMealIds", JSON.stringify(updatedFavoriteIds));
        } catch (err) {
            setError("Error saving favorites.");
        }

        
    };

    // Render the bookmarks
    const renderItem = ({ item }) => (
        <View style={styles.bookmarkMealCard}>
            <Image source={{ uri: item.image }} style={styles.bookmarkMealImage} />
            <Text style={styles.bookmarkMealTitle}>{item.title}</Text>
            <Text style={styles.bookmarkMealSummary}>{item.summary}</Text>
            <Pressable onPress={() => removeFromFavorites(item.id)} style={styles.bookmarkRemoveButton}>
                <Text style={styles.bookmarkRemoveButtonText}>Remove from Favorites</Text>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={styles.bookmarkContainer}>
            <LinearGradient
                colors={["#6A9C89", "#16423C"]}
                style={styles.bookmarkLinearGradient}
            >
                <Text style={styles.bookmarkTitle}>Bookmarks</Text>
                <View style={styles.separator} />
            </LinearGradient>

            {loading ? (
                <Text style={styles.bookmarkLoadingText}>Loading...</Text>
            ) : error ? (
                <Text style={styles.bookmarkErrorText}>{error}</Text>
            ) : favorites.length === 0 ? (
                <Text style={styles.bookmarkNoFavoritesText}>No favorite meals yet!</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.bookmarkListContainer}
                />
            )}
        </SafeAreaView>
    );
}
