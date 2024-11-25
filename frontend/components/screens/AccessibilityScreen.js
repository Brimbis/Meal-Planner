import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccessibilityScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#6A9C89", "#16423C"]}
        style={styles.linearGradient}
      >
        <View
          style={{
            flex: 0.9,
            justifyContent: "center",
          }}
        >
          <Pressable
            style={AccessibilityStyles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#16423C" />
          </Pressable>
          <View style={AccessibilityStyles.gifContainer}>
            <Image
              style={AccessibilityStyles.img}
              source={require("../pictures/vineboomcatrainbowatthesametimething.gif")}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const AccessibilityStyles = StyleSheet.create({
  gifContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: 300,
    height: 300,
    borderRadius: 10,
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
