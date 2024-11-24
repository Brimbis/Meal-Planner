import React, { useState } from "react";
import { SafeAreaView, Text, View, FlatList, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";
import styles from "../styles/styles";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function BookmarkScreen({ navigation }) {
    const [mealData, setMealData] = useState(API.bookmarkedMeals); // Meals to display
    const [notification, setNotification] = useState("");

    // Fetch favorite meals on screen focus
    const fetchMeals = async () => {
        // Log to ensure we're receiving the right data from API
        console.log("Fetching meals:", API.bookmarkedMeals);
        const updatedMeals = [...API.bookmarkedMeals]; // Get the latest bookmarked meals
        setMealData(updatedMeals); // Update the state to trigger re-render
    };

    // Use useFocusEffect to refetch meals when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchMeals(); // Fetch meals whenever the screen is focused
        }, [])
    );

    const handleDeletePress = (id) => {
        API.removeBookmarkedMeal(id);
        // Refresh meal data after deletion
        setMealData((prevMealData) => prevMealData.filter((meal) => meal.id !== id));
        showNotification("Meal removed from bookmarks!");
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 3000); // Hide after 3 seconds
    };

    return (
        <SafeAreaView>
            <LinearGradient
                colors={["#6A9C89", "#16423C"]} 
                style={styles.linearGradient}
                locations={[0.6, 1]}
            >
                {/* Notification Message */}
                {notification ? (
                    <View
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        right: 20,
                        backgroundColor: "#16423C",
                        padding: 10,
                        borderRadius: 20,
                        zIndex: 1,
                    }}
                    >
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                            {notification}
                        </Text>
                    </View>
                    ) : null}

                <View marginTop={40} />

                <View style={bookmarkStyles.savedMealsBox}>

                {mealData && mealData.length !== 0 ? (
                        <FlatList
                            data={mealData}
                            keyExtractor={(item) => item.id} // Use `id` as the key for better list optimization
                            renderItem={({ item }) => (
                                <>
                                    <Pressable
                                        style={bookmarkStyles.imageContainer}
                                        onPress={() => navigation.navigate("BookmarkSelectScreen", { recipe: item })}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={bookmarkStyles.bookmarkMealImage}
                                        />
                                        <Text
                                            style={bookmarkStyles.bookmarkMealTitle}
                                            numberOfLines={0}
                                        >
                                            {item.title}
                                        </Text>
                                        <Pressable
                                            style={bookmarkStyles.trashButton}
                                            onPress={() => handleDeletePress(item.id)}
                                        >
                                            <Ionicons name="trash" size={24} color="#FFFFFF" />
                                        </Pressable>
                                    </Pressable>
                                    <View style={bookmarkStyles.separator} />
                                </>
                            )}
                        />
                    ) : (
                        <Text style={bookmarkStyles.bookmarkTitle}>No Bookmarked Meals</Text>
                    )}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

// Define bookmark-specific styles here in the same file
const bookmarkStyles = {
    bookmarkContainer: {
        height: "100%",
        flex: 1,
    },
    bookmarkTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        justifyContent: "center", 
    },
    separator: {
        marginVertical: 10,
        height: 1,
        backgroundColor: "#fff",
        width: "80%",
        alignSelf: "center",
    },
    savedMealsBox: {
        flex: 1,
        width: "85%",
        alignSelf: "center",
        justifyContent: "center", 
        backgroundColor: "#0D2A26", // Dark Green background for the meals box
        marginTop: 20,
        marginBottom: 100,
        borderRadius: 15,
        height: "auto",
    },
    imageContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        paddingLeft: 20,
        justifyContent: "space-between", // This will ensure items are spaced out
    },
    bookmarkMealImage: {
        width: 125,
        height: 125,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: "#16423C",
    },
    bookmarkMealTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        paddingLeft: 20,
        flexShrink: 1, // Ensure title doesn't overflow
        maxWidth: '70%', // Limit the width to prevent overflow
        marginRight: 20,
    },
    trashButton: {
        marginLeft: 'auto', // Align the trashcan button to the right
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    bookmarkRemoveButton: {
        backgroundColor: "#D64D2B",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    bookmarkNoFavoritesText: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    },
};
