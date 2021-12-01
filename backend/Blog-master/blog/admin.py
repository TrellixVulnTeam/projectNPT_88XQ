from django.contrib import admin
from django.db.models import fields
from .models import Blog, Category
from django import forms
# Register your models here.


admin.site.register(Blog)

    
    
class CategoryAdmin(admin.ModelAdmin):
    fields = ['title','on_deleted']
    
admin.site.register(Category, CategoryAdmin)