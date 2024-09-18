from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from .models import APIInfo, MealInfo
from .forms import MealNameForm
from .services import MealAPI, processMealData

from django.http import HttpResponseRedirect

def index(request):
    
    MealsSearched = MealInfo.objects.all().values()
    
    api = APIInfo.objects.filter().values()
    apiURLMealSearch = api[0]["URL"]
    apiURLRandomMealSearch = api[1]["URL"]
    apiURLMealCategories = api[2]["URL"]

    if request.method == "POST":
        form = MealNameForm(request.POST)
        if form.is_valid():
            MealInput = form.cleaned_data["Meal"]
            l = MealInfo(MealName=MealInput)
            l.save()
            
            apiURLMealSearch += MealInput
            
            returnMeal = MealAPI(apiURLMealSearch).returnMealData()
            mealData = processMealData(returnMeal)
            meals = mealData.returnMeals()
            
            context = {
                'meals':MealsSearched, 
                'MealName':request.POST.get("Meal", ""), 
                'FormData':form, 
                'data':meals, 
                'apiData':apiURLMealSearch
            }
            
            template = loader.get_template('submitted.html')
            return HttpResponse(template.render(context, request))
    else:
        form = MealNameForm()
    context = {
    'form':form, 
    'meals':MealsSearched,
    'apiMealSearch':apiURLMealSearch, 
    'apiRandom':apiURLRandomMealSearch, 
    'apiCategories':apiURLMealCategories
    }
        
        
    template = loader.get_template("index.html")
    return HttpResponse(template.render(context, request))