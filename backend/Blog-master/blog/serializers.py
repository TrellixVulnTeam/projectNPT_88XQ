from django.db.models import fields
from rest_framework import serializers
from blog.models import Blog,Category


class BlogViewSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content','user', 'updated_at']
       
        
    def get_user(self, obj):
        username = obj.user.username
        return username
    
    def get_category(self, obj):
        category = obj.category.title
        return category
    
class BlogViewAll(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content','user', 'updated_at']
        
    def get_user(self, obj):
        username = obj.user.username
        return username
    
class CatogeryViewSerializer(serializers.ModelSerializer):
    blog = BlogViewAll(many = True)
    class Meta:
        model = Category
        fields = ['id', 'title','blog']
        #fields = ['id', 'title']
    
    
    
      
class BlogDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content']
        
    
        
    
        
