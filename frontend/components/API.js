import getIPAddress from "./IPAddress";
import React, { useContext, useState } from "react";

export default class API {

    static savedMeals = []; // Bookmarking meals to display on Bookmarks tab
    static selectedMeals = []; // Selecting meals to display on Home tab

    static deleteSelectedMeal(id) {
        for (let i = 0; i < selectedMeals.length; i++) {
            if (selectedMeals[i] === id) {
                selectedMeals.splice(i, 1); // Remove 1 element at index i
                break; // Exit the loop once the element is found and removed
            }
        }
    }

    static deleteSavedMeal(id) {
        for (let i = 0; i < savedMeals.length; i++) {
            if (savedMeals[i] === id) {
                savedMeals.splice(i, 1); // Remove 1 element at index i
              break; // Exit the loop once the element is found and removed
            }
        }
    }

  static addSelectedMeals(meal) {
    try {
      if (this.selectedMeals.includes(meal)) {
        // Catch duplicate entries
        console.log(`Meal ID ${meal} is already in selectedMeals.`);
        return;
      }

      this.selectedMeals.push(meal); // Append the meal ID
      console.log(
        "Meal successfully selected. Current selected meals:",
        this.selectedMeals
      );
    } catch (error) {
      console.log("Unable to save meal", error, meal);
    }
  }

  static addSavedMeals(meal) {
    try {
      if (this.savedMeals.includes(meal)) {
        // Catch duplicate enteries
        console.log(`Meal ID ${meal} is already in savedMeals.`);
        return;
      }
      this.savedMeals.push(meal); // Append the meal ID
      console.log(
        "Meal successfully bookmarked. Current saved meals:",
        this.savedMeals
      );
    } catch (error) {
      console.log("Unable to save meal", error, meal);
    }
  }

  static async searchAPI(query, ingredients) {
    try {
      const requestBody = {
        query: query,
        ingredients: ingredients,
      };

      // Make POST request
      const response = await fetch(`http://${getIPAddress()}:5000/API/Search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Error: response not ok", response);
        return;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async getNutritionData(id) {
    try {
      const requestBody = {
        id: id,
      };

      // Make POST request
      const response = await fetch(
        `http://${getIPAddress()}:5000/API/nutrition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        console.error("Error: response not ok", response);
        return;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  static async getMealData(id) {
    try {
      const requestBody = {
        id: id,
      };

      // Make POST request
      const response = await fetch(`http://${getIPAddress()}:5000/API/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Error: response not ok", response);
        return;
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}
