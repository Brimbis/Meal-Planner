import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles/styles'; // Correct import path for styles

const RecipeSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples,flour,sugar&number=5&ignorePantry=true&ranking=1';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '176739f866msh27757afccb10db1p171ceajsn0e4ff12ef3b1',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

export default RecipeSearch;
