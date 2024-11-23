import getIPAddress from "./IPAddress";

export default class API {

    static bookmarkedMeals = []; // Bookmarking meals to display on Bookmarks tab
    static homeMeals = [];
    static dailyCalories = [];

    static addDailyCalories(day, calories) {
      const caloriesPerDay = {
        day: day,
        calories: calories, 
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

    static removeBookmarkedMeal(id) {
      const index = this.bookmarkedMeals.findIndex(entry => entry.id === id);

      // If an entry with the given id is found, remove it from the array
      if (index !== -1) {
        this.bookmarkedMeals.splice(index, 1);
      }
    }

  static addHomeMeal(id, title, image, calories) {
      const meal = {
        id: id, 
        title: title, 
        image: image, 
        calories: calories, 
      };

      this.homeMeals.push(meal);
  }

  static addBookmarkedMeal(id, title, image) {
    console.log("Meal Bookmarked: ", id, title, image);

    // Check if the meal already exists based on the id
    const mealExists = this.bookmarkedMeals.some(meal => meal.id === id);

    if (mealExists) {
        console.log("Meal already bookmarked.");
        return; // Do not add the duplicate meal
    }

    const meal = {
        id: id,
        title: title,
        image: image,
    };

    this.bookmarkedMeals.push(meal);
    console.log(this.bookmarkedMeals);
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
