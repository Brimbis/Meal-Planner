import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DailyCalories from "./DailyCalories";
import { useNavigation, navigation } from "@react-navigation/native";

export default function ProfileScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedFirstName = await AsyncStorage.getItem("firstname");
      const storedLastName = await AsyncStorage.getItem("lastname");

      setEmail(storedEmail || ""); // Set default to empty string if null
      setFirstName(storedFirstName || "");
      setLastName(storedLastName || "");
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("firstname");
    await AsyncStorage.removeItem("lastname");
    setIsLoggedIn(false);
  };

  const updateUserData = async () => {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("firstname", firstName);
    await AsyncStorage.setItem("lastname", lastName);
  };
  const navigateToDailyCalories = () => {
    navigation.navigate("DailyCalories");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View style={profileStyles.profileContainer}>
          <View style={profileStyles.profileImageContainer}>
            <Image
              style={profileStyles.profileImage}
              source={require("../pictures/blank-profile-picture-png.png")}
            />
          </View>
          <View style={{ marginTop: 70 }}>
            <Text style={styles.title}>
              {firstName} {lastName}
            </Text>
          </View>
          <Pressable
            style={profileStyles.pressable}
            onPress={navigateToDailyCalories}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.smallTitle}>Daily Calories</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="white"
              />
            </View>
          </Pressable>

          <Pressable style={profileStyles.pressable} onPress={updateUserData}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.smallTitle}>Accessibility{""}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="white"
              ></Ionicons>
            </View>
          </Pressable>
          <Pressable style={profileStyles.logout} onPress={handleLogout}>
            <Text style={styles.smallTitle}>Logout</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  logout: {
    height: 45,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6A9C89",
    marginHorizontal: "auto",
    marginTop: 10,
    borderRadius: 5,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: "white",
  },
  profileImageContainer: {
    height: "auto",
    width: "auto",
    borderRadius: 20,
    backgroundColor: "#2D6059",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    position: "absolute",
    top: -60,
  },

  profileContainer: {
    display: "flex",
    backgroundColor: "#0D2A26",
    padding: 10,
    height: "auto",
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  },

  pressable: {
    marginVertical: 10,
    width: "80%",
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginHorizontal: "auto",
  },
});
