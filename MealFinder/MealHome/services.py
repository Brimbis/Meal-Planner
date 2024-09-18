import requests

# www.themealdb.com/api/json/v1/1/search.php?s={MealName}

class MealAPI:
    def __init__(self, url):
        self.url = url
        r = requests.get(self.url)
        self.data = r.json()
    def returnMealData(self):
        return self.data

class processMealData:
    def __init__(self, data):
        self.data = data
    def returnMealData(self):
        return self.data
        
    def returnMeals(self):
        main = []
        if self.data["meals"] is not None:
            for x in self.data["meals"]:
                meals = x
                main.append(meals)
        return main