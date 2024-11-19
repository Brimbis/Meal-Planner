import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, Image, Pressable } from "react-native";
import styles from "../styles/styles"; // Ensure it's the correct path for styles
import { LinearGradient } from "expo-linear-gradient";
import API from "../API"; // Import the API class

export default function BookmarkScreen({ navigation, setIsLoggedIn }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch favorite meals on component mount
    useEffect(() => {
        // Get favorite meal IDs from localStorage
        const savedFavoritesIds = JSON.parse(localStorage.getItem("favoriteMealIds")) || [];

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
    }, []);

    // Function to remove meal from favorites
    const removeFromFavorites = (mealId) => {
        const updatedFavorites = favorites.filter(meal => meal.id !== mealId);
        setFavorites(updatedFavorites);

        // Optionally, update localStorage or API here as well
        const updatedFavoriteIds = updatedFavorites.map(meal => meal.id);
        localStorage.setItem("favoriteMealIds", JSON.stringify(updatedFavoriteIds));

        // If you want to remove from your API's saved meals, you can add functionality here.
        // API.removeSavedMeals(mealId); // Implement in the API class if necessary.
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
