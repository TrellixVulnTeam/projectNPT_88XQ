from django.db.models import fields
from rest_framework import serializers
from blog.models import Blog,Category
from django.contrib.auth.models import User

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
    category = serializers.CharField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content','public']
            
    def create(self, validated_data):
        category = validated_data.pop('category')
        categor_instance = Category.objects.get(title=category)
        blog_instance = Blog.objects.create(**validated_data, category = categor_instance)
        return blog_instance
    
    def update(self, instance, validated_data):
        instance.title  = validated_data.get('title', instance.title)
        instance.content  = validated_data.get('content', instance.content)
        instance.public  = validated_data.get('public', instance.public)
        instance.save()
        return instance
    
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        password2 = validated_data.get('password2')

        if password == password2:
            user = User(username=username, email=email)
            user.set_password(password)
            user.save()
            return user
        else:
            raise serializers.ValidationError({
                'error': 'Both passwords do not match'
            })
        
