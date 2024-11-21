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
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles.js";
import { LinearGradient } from "expo-linear-gradient";
import API from "../API";

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const mealIDs = [649314, 638488, 1095996, 657889]; //, 660128, 634927, 660292, 715397, 633569, 639632, 658155, 715481, 658987, 656486];
var now = new Date();
var dayNum = now.getDay() - 1;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [mealData, setMealData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNextDay = () => {
    const nextDay = (dayNum + 1) % 7;
    dayNum = nextDay
    return days[nextDay];
  };

  const fetchMeals = async () => {
    setLoading(true);
    setMealData([]);
  
    try {
      const mealPromises = mealIDs.map(id => API.getMealData(id.toString()));
      const nutritionPromises = mealIDs.map(id => API.getNutritionData(id.toString()));
  
      // Await all meal and nutrition fetches
      const meals = await Promise.all(mealPromises);
      const nutrition = await Promise.all(nutritionPromises);
  
      for (let i = 0; i < meals.length; i += 2) {
        let calories = parseInt(nutrition[i].calories) + parseInt(nutrition[i + 1].calories);
        const mealWithDay = {
          day: getNextDay(),
          meal1: meals[i],
          meal2: meals[i + 1],
          calories: calories,
        };
        setMealData((prevMealData) => [...prevMealData, mealWithDay]);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
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
          
          <View marginBottom={30}>

            {/* Day Title */}
            <View style={homeStyles.weekdayBox}>
              <Text style={homeStyles.weekdayText}>{item.day}</Text>
            </View>

            {/* Meal 1 and Meal 2 in a Single View */}
            <View style={homeStyles.mealBox}>

              {/* Meal 1 */}
              <Pressable style={homeStyles.imageContainer}
                onPress={() => navigation.navigate("HomeSelectScreen", item.meal1.id)}>
                <Image
                  source={{ uri: item.meal1.image }}
                  style={homeStyles.mealImage}
                />
                <Text
                  style={homeStyles.mealBoxText}
                  numberOfLines={0}
                >
                  {item.meal1.title}
                </Text>
              </Pressable>

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Meal 2 */}
              <Pressable style={homeStyles.imageContainer}
                onPress={() => navigation.navigate("HomeSelectScreen", item.meal2.id)}>
                <Image
                  source={{ uri: item.meal2.image }}
                  style={homeStyles.mealImage}
                />
                <Text
                  style={homeStyles.mealBoxText}
                  numberOfLines={0}
                >
                  {item.meal2.title}
                </Text>
              </Pressable>

              {/* Separator Line */}
              <View style={homeStyles.mealBoxSeparatorLine} />

              {/* Calories Section */}
              <View style={styles.calorieContainer}>
                <Text style={homeStyles.mealBoxText}>Estimated Calories: </Text>
                <Text style={homeStyles.calorieNumber}>  {item.calories.toString()}</Text>
              </View>
            </View>
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

  mealBox: {
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10, 
    height: "auto",
    width: "85%",
    borderColor: "#6A9C89", 
    borderWidth: 5, 
  },

  mealBoxText: {
    fontSize: 16,
    color: '#5D5D5D', 
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },

  mealBoxSeparatorLine: {
    margin: 10,
    width: "80%",
    borderBottomColor: "#6A9C89",
    borderBottomWidth: 3,
    paddingBottom: 0,
    alignSelf: 'center', 
  },

  weekdayText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "left",
    color: "#16423C",
    paddingLeft: 20,
  },

  weekdayBox: {
    height: 45,
    width: "85%",
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10, 
    borderColor: "#6A9C89", 
    borderWidth: 5, 
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingLeft: 20,
  },

  mealImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#16423C",
    marginHorizontal: 10,
  },

  calorieContainer: {
    paddingTop: 10,
    width: "90%", 
  },

  calorieNumber: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#16423C",
  }, 
});