from django.db import models

class APIInfo(models.Model):
    Name = models.CharField(max_length = 50)
    Active = models.CharField(max_length = 1)
    URL = models.CharField(max_length = 500)
    APIKey = models.CharField(max_length = 100)
    
class MealInfo(models.Model):
    MealName = models.CharField(max_length=100)