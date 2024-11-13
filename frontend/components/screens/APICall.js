import React, { useState, useEffect } from 'react';
import {
SafeAreaView,
Text,
FlatList,
ActivityIndicator,
View,
} from 'react-native';
import styles from '../styles/styles.js';

export default function TestScreen({ navigation }) {
    const [data, setData] = useState([]); // To store the fetched data
    const [loading, setLoading] = useState(true); // To manage the loading state

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            .then((response) => response.json())
            .then((json) => {
                setData(json); // Update the data state
                setLoading(false); // Data has been loaded
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); // Stop loading even if there's an error
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.body}</Text>
                </View>
                )}
                />
            )}
        </SafeAreaView>
    );
}