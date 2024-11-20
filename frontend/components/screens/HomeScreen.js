// HomeScreen.js
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View, 
  FlatList,
  Image,
  ActivityIndicator, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const mealIDs = [649314, 638488, 1095996, 657889, 660128, 634927, 660292, 715397, 633569, 639632, 658155, 715481, 658987, 656486];
var now = new Date();
var dayNum = now.getDay() - 1;

export default function HomeScreen() {
  const [mealData, setMealData] = useState({});
  const [loading, setLoading] = useState(false);

  const getNextDay = () => {
    (dayNum < 6) ? dayNum += 1 : dayNum = 0;
    return days[dayNum];
  }

  const fetchMeals = async () => {
    setLoading(true);
    const mealDataArray = [];

    // Loop through each mealID, fetch the data, and append it
    for (let i = 0; i < mealIDs.length; i += 2) {
      const meal1 = await API.getMealData(mealIDs[i].toString());
      const meal2 = await API.getMealData(mealIDs[i + 1].toString());

      // Add day information
      const mealWithDay = {
        day: getNextDay(),
        meal1: meal1,
        meal2: meal2, 
      };

      mealDataArray.push(mealWithDay); // Append the augmented meal data
    }

    // After all data is fetched, update the state with the mealData array
    setMealData(mealDataArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchMeals();
  }, []);


  return (
    <SafeAreaView>
      <LinearGradient
          colors={["#6A9C89", "#16423C"]}
          style={styles.linearGradient}
          locations={[0.6, 1]}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={mealData}
              renderItem={({ item }) => (
              <View>
                <View paddingTop={50}/>
                  <View style={styles.weekdayBox}>
                    <Text style={styles.weekdayText}>{item.day}</Text>
                  </View>
                  <View style={styles.mealBox}>
                    <Text style={styles.mealBoxText}>{item.meal1.title}</Text>
                    <Image 
                      style={{}}
                      source={{
                        uri: item.meal1.image
                      }}
                    />
                  <View style={styles.mealBoxSeparatorLine}></View>
                    <Text style={styles.mealBoxText}>{item.meal2.title}</Text>
                  <View style={styles.mealBoxSeparatorLine}></View>
                    <Text style={styles.mealBoxText}>Estimated Calories:</Text>
                  </View>
              </View>
              )}
              />
            <View paddingBottom={50}/>
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}