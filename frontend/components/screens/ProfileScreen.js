import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={require("../pictures/blank-profile-picture-png.png")}
            />
            <View style={styles.separator} />
          </View>
          <View style={{ marginTop: 70 }}>
            <Text style={styles.title}>
              {" "}
              {firstName} {lastName}
            </Text>
          </View>
          <Pressable style={styles.separatorLine} onPress={updateUserData}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.smallTitle}>Daily Calories{""}</Text>
              <Ionicons
                iconStyle={{ postion: "absolute", alignSelf: "right" }}
                name="chevron-forward-outline"
                size={20}
                color="white"
              ></Ionicons>{" "}
            </View>
          </Pressable>
          <Pressable style={styles.separatorLine} onPress={updateUserData}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.smallTitle}>Allergen List{""}</Text>
              <Ionicons
                iconStyle={{ postion: "absolute", alignSelf: "right" }}
                name="chevron-forward-outline"
                size={20}
                color="white"
              ></Ionicons>{" "}
            </View>
          </Pressable>
          <Pressable style={styles.separatorLine} onPress={updateUserData}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.smallTitle}>Accessibility{""}</Text>
              <Ionicons
                iconStyle={{ flex: "row", marginLeft: 10 }}
                name="chevron-forward-outline"
                size={20}
                color="white"
              ></Ionicons>
            </View>
          </Pressable>
          <Pressable style={styles.buttonContainerSmall} onPress={handleLogout}>
            <Text style={styles.smallTitle}>Logout</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
