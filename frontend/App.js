import { useState, useEffect } from "react";
import { StatusBar, StatusBarStyle } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Native imports

// Import your screens
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen'
import BookmarkScreen from './components/screens/BookmarkScreen';
import SearchScreen from './components/screens/SearchScreen';
import RecipeSearchScreen from './components/screens/RecipeSearchScreen'; 
import RecipeSelectScreen from './components/screens/RecipeSelectScreen'
import DailyCalories from "./components/screens/DailyCalories";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Add multiple screens if necessary
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="HomeSelectScreen" component={RecipeSelectScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="RecipeSearchScreen" component={RecipeSearchScreen} />
      <Stack.Screen name="RecipeSelectScreen" component={RecipeSelectScreen} />
    </Stack.Navigator>
  );
};


// Add multiple screens if necessary
const BookmarkStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bookmarks" component={BookmarkScreen} />
      <Stack.Screen name="BookmarkSelectScreen" component={RecipeSelectScreen} />
    </Stack.Navigator>
  );
};
const ProfileStack = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="DailyCalories" component={DailyCalories} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Optional: Show a loading indicator while checking login status
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              // Determine icon based on the route name
              if (route.name === "HomeTab") {
                iconName = "home";
              } else if (route.name === "SearchTab") {
                iconName = "search";
              } else if (route.name === "BookmarksTab") {
                iconName = "bookmark";
              } else if (route.name === "ProfileTab") {
                iconName = "person";
              }

              // Return the icon component
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white", // Active tab color
            tabBarInactiveTintColor: "white", // Inactive tab color
            tabBarShowLabel: false, // Hide labels for tabs
            tabBarActiveBackgroundColor: "#6A9C89",
            tabBarStyle: {
              position: "absolute",
              backgroundColor: "#16423C", // Set the background color of the tab bar
              height: "8%",
              width: "100%",
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              borderTopWidth: 0,
            },
            tabBarIconStyle: {
              alignItems: "center",
              marginVertical: "auto",
              justifyContent: "center",
            },
            animation: "fade",
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{ headerShown: false }}
          />
         <Tab.Screen
            name="SearchTab"
            component={SearchStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="BookmarksTab"
            component={BookmarkStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="ProfileTab"
            options={{ headerShown: false }}
            children={() => <ProfileStack setIsLoggedIn={setIsLoggedIn} />}
          ></Tab.Screen>
        </Tab.Navigator>
      ) : (
        // Not logged in, show the Login screen
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
