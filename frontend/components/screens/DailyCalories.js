import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";
import { Ionicons } from "@expo/vector-icons";

export default function DailyCalories({ navigation }) {
  const [weeklyCalories, setWeeklyCalories] = useState([]);

  const fetchDailyCalories = async () => {
    setWeeklyCalories(API.dailyCalories);
    console.log("Daily calories:", weeklyCalories);
  };

  useEffect(() => {
    fetchDailyCalories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            marginHorizontal: 5,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#C4DAD2",
              padding: 10,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#16423C" />
          </Pressable>
        </View>

        <Text style={CaloriesStyles.title}>Weekly Calories</Text>

        <View style={CaloriesStyles.caloriesContainer}>
          <FlatList
            data={weeklyCalories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={CaloriesStyles.seporator}>
                <Text style={styles.title}>
                  {item.day}: {item.calories}
                </Text>
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const CaloriesStyles = StyleSheet.create({
  caloriesContainer: {
    alignSelf: "center",
    backgroundColor: "#16423C",
    width: "70%",
    height: "auto",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },

  title: {
    fontSize: 32,
    color: "white",
    textDecorationLine: "underline",
    textAlign: "center",
    top: -50,
  },
  seporator: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "60%",
    alignSelf: "center",
  },
});
