from rest_framework import serializers
from blog.models import Blog


class BlogViewSerializers(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content','user', 'updated_at']
        # fields = ['id', 'title', 'category', 'content', 'updated_at']
        
    def get_user(self, obj):
        username = obj.user.username
        return username
    
    def get_category(self, obj):
        category = obj.category.title
        return category
    
    
class BlogDetailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'content']
        
    
        
    
        
