import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen'
import BookmarkScreen from './components/screens/BookmarkScreen';
import SearchScreen from './components/screens/SearchScreen';
import APItest from './components/screens/APITest';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Add multiple screens if necessary
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}/>
      <Stack.Screen
        name="APICall"
        component={APItest}/>
    </Stack.Navigator>
  );
};

// Add multiple screens if necessary
const SearchStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}/>
    </Stack.Navigator>
  );
};

// Add multiple screens if necessary
const BookmarkStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Bookmarks"
        component={BookmarkScreen}/>
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error fetching token:', error);
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
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
                
              if (route.name === 'HomeTab') {
                iconName = focused ? 'home' : 'home-outline';
    
              } else if (route.name === 'SearchTab') {
                iconName = focused ? 'search' : 'search-outline';
    
              } else if (route.name === 'BookmarksTab') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
    
              } else if (route.name === 'ProfileTab') {
                iconName = focused ? 'person' : 'person-outline';
              
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarShowLabel: false

          })}

          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'black',
            }}
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
            children={(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        // Not logged in, show the Login screen
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}