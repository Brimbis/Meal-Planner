import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Text,
    Pressable,
    View,
    TextInput, 
    Image, 
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchScreen({ navigation, setIsLoggedIn }) {
    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={["#6A9C89", "#16423C"]}
            style={styles.linearGradient}
            >
                <Text style={styles.title}>Search</Text>
            <View style={styles.separator}/>
            </LinearGradient>
        </SafeAreaView>
    );
}