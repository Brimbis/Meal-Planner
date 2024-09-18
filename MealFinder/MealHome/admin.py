from django.contrib import admin
from .models import APIInfo, MealInfo

class APIAdmin(admin.ModelAdmin):
    list_display = ["Name", "Active", "URL", "APIKey"]
    
class MealAdmin(admin.ModelAdmin):
    list_display = ["MealName"]
    
admin.site.register(APIInfo, APIAdmin)

admin.site.register(MealInfo, MealAdmin)