import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";
import { Ionicons } from "@expo/vector-icons";

export default function DailyCalories({ navigation }) {
  const [weeklyCalories, setWeeklyCalories] = useState(API.dailyCalories);

  useEffect(() => {
    async function fetchDailyCalories() {
      try {
        const dailyCalories = API.getDailyCalories();
        setWeeklyCalories(dailyCalories);
      } catch (error) {
        console.error("Error fetching daily calories:", error);
      }
    }

    fetchDailyCalories();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.caloriesContainer}>
      <Text
        style={styles.title}
      >{`${item.day}: ${item.calories} Calories`}</Text>
      <View style={CaloriesStyles.seporator} />
    </View>
  );

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flex: 0.8,
            borderRadius: 20,
            //flexDirection: "row",
            justifyContent: "auto",
            margin: 10,
          }}
        >
          <Pressable
            style={CaloriesStyles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#16423C" />
          </Pressable>
          <Text style={CaloriesStyles.title}>Weekly Calories</Text>
        </View>
        <View style={CaloriesStyles.caloriesContainer}>
          <FlatList
            data={weeklyCalories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
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
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    position: "absolute",
  },

  title: {
    fontSize: 32,
    color: "white",
    textDecorationLine: "underline",
    textAlign: "center",
    justifyContent: "center",
  },
  seporator: {
    margin: 5,
    borderBottomWidth: 1,
    borderColor: "white",
    width: "70%",
    alignSelf: "center",
  },
  goBack: {
    backgroundColor: "#C4DAD2",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
});
