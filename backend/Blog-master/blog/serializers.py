from rest_framework import serializers
from blog.models import Blog


class BlogSerializers(serializers.ModelSerializers):
    class Meta:
        model = Blog
        fields = ['id', 'title', 'category', 'created_at', 'updated_at']
