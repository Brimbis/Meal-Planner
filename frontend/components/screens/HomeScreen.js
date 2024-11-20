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
  StyleSheet, 
} from "react-native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const mealIDs = [649314, 638488, 1095996, 657889, 660128, 634927, 660292, 715397, 633569, 639632, 658155, 715481, 658987, 656486];
var now = new Date();
var dayNum = now.getDay() - 1;

export default function HomeScreen() {
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNextDay = () => {
    (dayNum < 6) ? dayNum += 1 : dayNum = 0;
    return days[dayNum];
  }

  const fetchMeals = async () => {
    setLoading(true);

    setMealData([]);

    for (let i = 0; i < days.length * 2; i += 2) {
      const meal1 = await API.getMealData(mealIDs[i].toString());
      const meal2 = await API.getMealData(mealIDs[i + 1].toString());
      const nutrition1 = await API.getNutritionData(mealIDs[i].toString());
      const nutrition2 = await API.getNutritionData(mealIDs[i + 1].toString());

      let calories = parseInt(nutrition1.calories) + parseInt(nutrition2.calories);

      // Add day information
      const mealWithDay = {
        day: getNextDay(),
        meal1: meal1,
        meal2: meal2, 
        calories: calories, 
      };

      // Update the state with the new meal data, appending it to the existing array
      setMealData((prevMealData) => [...prevMealData, mealWithDay]);
    }

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
      
      <View paddingTop={50} />

      <FlatList
        data={mealData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>

            {/* Day Title */}
            <View style={homeStyles.weekdayBox}>
              <Text style={homeStyles.weekdayText}>{item.day}</Text>
            </View>

            {/* Meal 1 and Meal 2 in a Single View */}
            <View style={homeStyles.mealBox}>

              {/* Meal 1 */}
              <View style={homeStyles.imageContainer}>
                <Image
                  source={{ uri: item.meal1.image }}
                  style={homeStyles.mealImage}
                />
                <Text
                  style={[homeStyles.mealBoxText, { marginLeft: 20, flex: 1 }]}
                  numberOfLines={0} // Allows the text to wrap
                >
                  {item.meal1.title}
                </Text>
              </View>

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Meal 2 */}
              <View style={homeStyles.imageContainer}>
                <Image
                  source={{ uri: item.meal2.image }}
                  style={homeStyles.mealImage}
                />
                <Text
                  style={[homeStyles.mealBoxText, { marginLeft: 20, flex: 1 }]}
                  numberOfLines={0} // Allows the text to wrap
                >
                  {item.meal2.title}
                </Text>
              </View>

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Calories Section */}
              <View style={styles.calorieContainer}>
                <Text style={homeStyles.mealBoxText}>
                  Estimated Calories: 
                  <Text style={homeStyles.calorieNumber}>  {item.calories.toString()}</Text>
                </Text>
              </View>
            </View>
            <View paddingBottom={50} />
          </View>
        )}
      />
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#61A69C" />
          <View paddingBottom={50} />
        </>
      ) : (
        <View paddingBottom={50} />
      )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({

  mealButton: {
    height: 125, 

  },

  mealBox: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10, 
    justifyContent: "space-between", // Ensures that items inside the box are spaced properly
    height: "auto", // Let the content size dynamically, but still control the layout
  },

  mealBoxText: {
    fontSize: 16,
    textAlign: "right",
    justifyContent: 'center', 
    color: '#5D5D5D', 
    paddingVertical: 10, 
    paddingRight: 50, 
    fontSize: 18, 
  },

  mealBoxSeparatorLine: {
    margin: 10,
    width: "80%",
    borderBottomColor: "#6A9C89",
    borderBottomWidth: 3,
    paddingBottom: 0,
  },

  weekdayText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "left",
    color: "#16423C",
    paddingLeft: 20,
  },

  weekdayBox: {
    height: 45,
    width: "80%",
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  // Add a container for images with padding
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 20, // Add padding around the image
    paddingTop: 10, 
  },

  mealImage: {
    width: 125,
    height: 125,
    resizeMode: "cover",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#16423C",
    marginRight: 10,
  },

  calorieContainer: {
    justifyContent: "flex-end", 
    alignItems: "center", 
    paddingTop: 10,
    width: "100%",
  },

  calorieNumber: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "left",
    color: "#16423C",
  }, 

});