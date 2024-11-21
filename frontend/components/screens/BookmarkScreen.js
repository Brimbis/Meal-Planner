import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API"; // Import the API class
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import styles from "../styles/styles"; // Import the global styles from styles.js

export default function BookmarkScreen({ navigation, setIsLoggedIn }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch favorite meals on component mount
    useEffect(() => {
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
        <View style={bookmarkStyles.bookmarkMealCard}>
            <Image source={{ uri: item.image }} style={bookmarkStyles.bookmarkMealImage} />
            <Text style={bookmarkStyles.bookmarkMealTitle}>{item.title}</Text>
            <Text style={bookmarkStyles.bookmarkMealSummary}>{item.summary}</Text>
            <Pressable onPress={() => removeFromFavorites(item.id)} style={bookmarkStyles.bookmarkRemoveButton}>
                <Text style={bookmarkStyles.bookmarkRemoveButtonText}>Remove from Favorites</Text>
            </Pressable>
        </View>
    );

    return (
        <SafeAreaView style={bookmarkStyles.bookmarkContainer}>
            <LinearGradient
                colors={["#6A9C89", "#16423C"]}
                style={bookmarkStyles.bookmarkLinearGradient}
            >
                <Text style={bookmarkStyles.bookmarkTitle}>Bookmarks</Text>
                <View style={bookmarkStyles.separator} />
            </LinearGradient>

            {loading ? (
                <Text style={bookmarkStyles.bookmarkLoadingText}>Loading...</Text>
            ) : error ? (
                <Text style={bookmarkStyles.bookmarkErrorText}>{error}</Text>
            ) : (
                // Render the savedMealsBox regardless of favorites length
                <View style={bookmarkStyles.savedMealsBox}>
                    {favorites.length === 0 ? (
                        <Text style={bookmarkStyles.bookmarkNoFavoritesText}>No favorite meals yet!</Text>
                    ) : (
                        <FlatList
                            data={favorites}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            contentContainerStyle={bookmarkStyles.bookmarkListContainer}
                        />
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}

// Define bookmark-specific styles here in the same file
const bookmarkStyles = {
    bookmarkContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    bookmarkLinearGradient: {
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    bookmarkTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    separator: {
        marginVertical: 10,
        height: 1,
        backgroundColor: "#fff",
    },
    savedMealsBox: {
        flex: 1,
        backgroundColor: "#16423C", // Dark Green background for the meals box
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    bookmarkMealCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    bookmarkMealImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    bookmarkMealTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    bookmarkMealSummary: {
        fontSize: 14,
        color: "#777",
    },
    bookmarkRemoveButton: {
        backgroundColor: "#D64D2B",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    bookmarkRemoveButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    bookmarkLoadingText: {
        textAlign: "center",
        fontSize: 18,
        color: "#777",
    },
    bookmarkErrorText: {
        textAlign: "center",
        fontSize: 18,
        color: "#D64D2B",
    },
    bookmarkNoFavoritesText: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    },
    bookmarkListContainer: {
        paddingBottom: 20,
    },
};
