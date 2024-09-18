from django import forms

class MealNameForm(forms.Form):
    Meal = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Meal Name', 'style': 'width: 300px;'}))
    