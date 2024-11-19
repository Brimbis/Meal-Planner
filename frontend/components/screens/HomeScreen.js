// HomeScreen.js
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View, 
  FlatList,
  Image, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const mealIDs = [123456, 123456, 123456, 123456, 123456, 123456, 123456, 123456]
var now = new Date();
var dayNum = now.getDay() - 1;


function getNextDay() {
  (dayNum < 6) ? dayNum += 1 : dayNum = 0;
  return days[dayNum];
}

export default function HomeScreen() {
  const [mealData, setMealData] = useState({});

  const fetchMeals = async () => {
    const mealData = [];
    for (let i = 0; i < mealIDs.length; i++) {
      mealData.push(await API.getMealData(mealIDs[i].toString()), getNextDay());
    }
    
    setMealData(mealData);
  }

  useEffect(() => {
    fetchMeals(); // Fetch recipes when component mounts
  }, []);

  return (
    <SafeAreaView>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
        <FlatList
          data={mealData}
          renderItem={({ item }) => (
          <View>
            <View paddingTop={50}/>
              <View style={styles.weekdayBox}>
                <Text style={styles.weekdayText}>{item.day}</Text>
              </View>
              <View style={styles.mealBox}>
                <Text style={styles.mealBoxText}>{item.toString()}</Text>
                <Image 
                  style={{}}
                  source={{
                    uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
                  }}
                />
              <View style={styles.mealBoxSeparatorLine}></View>
                <Text style={styles.mealBoxText}>Meal Data</Text>
              <View style={styles.mealBoxSeparatorLine}></View>
                <Text style={styles.mealBoxText}>Estimated Calories:</Text>
              </View>
          </View>
          )}
          />
          <View paddingBottom={50}/>
      </LinearGradient>
    </SafeAreaView>
  );
}