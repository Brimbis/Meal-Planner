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
import APItest from './components/APITest';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null

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
                
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
    
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
    
              } else if (route.name === 'Bookmarks') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
    
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}

          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            }}
          >
          <Tab.Screen name="Home" component={HomeScreen} 
            options={{ headerShown: false }}
            />
          <Tab.Screen name="Search" component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen name="Bookmarks" component={BookmarkScreen}
            options={{ headerShown: false }}
            />
          <Tab.Screen name="Profile" component={ProfileScreen}
            options={{ headerShown: false }}
          />
  
        </Tab.Navigator>
      ) : (
        // Not logged in, show the Login screen
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}