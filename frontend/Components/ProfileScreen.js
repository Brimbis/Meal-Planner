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
import styles from "./styles/styles";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedFirstName = await AsyncStorage.getItem('firstname');
            const storedLastName = await AsyncStorage.getItem('lastname');
            
            setEmail(storedEmail || ''); // Set default to empty string if null
            setFirstName(storedFirstName || '');
            setLastName(storedLastName || '');
        };
    
        fetchUserData();
    }, []);

    const updateUserData = async () => {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('firstname', firstName);
        await AsyncStorage.setItem('lastname', lastName);
    }

    const handleSwitchToWelcome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
        });
    }

    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient
            colors={["#6A9C89", "#16423C"]}
            style={styles.linearGradient}
            >
                <Text style={styles.title}>Profile</Text>
            <View style={styles.separator}/>
                <View>
                    <Image style={styles.profileImage} 
                    source={require('./Pictures/blank-profile-picture-png.png')}/>
                </View>
            <View style={styles.inputContainer}>
                <Text style={styles.smallTitle}>First Name</Text>
                <TextInput
                style={styles.textInput}
                selectionColor={"azure"}
                onChangeText={(text) => setFirstName(text)}
                value={firstName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.smallTitle}>Last Name</Text>
                <TextInput
                style={styles.textInput}
                selectionColor={"azure"}
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.smallTitle}>Email</Text>
                <TextInput
                style={styles.textInput}
                selectionColor={"azure"}
                onChangeText={(text) => setEmail(text)}
                value={email}
                />
            </View>
            <View style={styles.separator} />
                <Pressable style={styles.buttonContainerSmall} onPress={updateUserData}>
                    <Text style={styles.smallTitle}>Save</Text>
                </Pressable>
                <View style={styles.separator}/>
                <Pressable style={styles.buttonContainerSmall} onPress={handleSwitchToWelcome}>
                    <Text style={styles.smallTitle}>Go Back</Text>
                </Pressable>
            </LinearGradient>
        </SafeAreaView>
    );
}