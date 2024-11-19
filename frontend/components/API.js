import getIPAddress from "./IPAddress";

export default class API {

    static savedMeals = [];

    get savedMeals() {
        return savedMeals;
    }

    static addSavedMeals(meal) {
        try {
            savedMeals.append(meal);
        }
        catch (error) {
            console.log("Unable to save meal", error, meal);
        }
    }

    static async searchAPI (query, ingredients) {
        try {
            const requestBody = {
                query: query,
                ingredients: ingredients,
            };
    
            // Make POST request
            const response = await fetch(`http://${getIPAddress()}:5000/API/Search`, {
                method: 'POST',
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
            console.error('Error fetching data:', error);
        }
    }

    static async getNutritionData(id) {
        try {
            const requestBody = {
                id: id, 
            };
    
            // Make POST request
            const response = await fetch(`http://${getIPAddress()}:5000/API/nutrition`, {
                method: 'POST',
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
            console.error('Error fetching data:', error);
        }
    }

    static async getMealData(id) {
        try {
            const requestBody = {
                id: id, 
            };
    
            // Make POST request
            const response = await fetch(`http://${getIPAddress()}:5000/API/id`, {
                method: 'POST',
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
            console.error('Error fetching data:', error);
        }
    }
}