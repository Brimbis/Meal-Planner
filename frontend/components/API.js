import getIPAddress from "./IPAddress";

export default class API {

    static savedMeals = []; // Bookmarking meals to display on Bookmarks tab
    static homeMeals = [];
    static dailyCalories = [{}];

    static addDailyCalories(day, calories) {
      const caloriesPerDay = {
        day: day || "",
        calories: calories || "", 
      };

    dailyCalories.push(caloriesPerDay);
  }

    static clearDailyCalories() {
      dailyCalories = [];
    }

    static removeHomeMeal(id) {
      const index = this.homeMeals.findIndex(entry => entry.id === id);

      // If an entry with the given id is found, remove it from the array
      if (index !== -1) {
        this.homeMeals.splice(index, 1);
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

  static addHomeMeals(id, title, image, calories) {
      const meal = {
        id: id, 
        title: title, 
        image: image, 
        calories: calories, 
      };

      this.homeMeals.push(meal);
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
