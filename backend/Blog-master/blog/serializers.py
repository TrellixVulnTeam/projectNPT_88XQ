from django.db.models import fields
from rest_framework import serializers
from blog.models import Blog, Category


class BlogViewSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content', 'user', 'updated_at']

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
        fields = ['id', 'title', 'content', 'user', 'updated_at']

    def get_user(self, obj):
        username = obj.user.username
        return username


class CategoryViewSerializer(serializers.ModelSerializer):
    blog = BlogViewAll(many=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'blog']
        # fields = ['id', 'title']


class BlogDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    category = serializers.CharField()

    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content', 'public']

    def create(self, validated_data):
        category = validated_data.pop('category')
        category_instance = Category.objects.get(title=category)
        blog_instance = Blog.objects.create(**validated_data, category=category_instance)
        return blog_instance

    def update(self, instance, validated_data):

        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        instance.content = validated_data.get('content', instance.content)
        instance.public = validated_data.get('public', instance.public)
        instance.save()
        return instance

