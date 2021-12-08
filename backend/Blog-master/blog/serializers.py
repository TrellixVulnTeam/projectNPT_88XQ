from django.db.models import fields
from rest_framework import serializers
from blog.models import Blog, Category
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


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


class BlogDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    category = serializers.CharField(read_only=True)

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

        return super().update(instance, validated_data)


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


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')
