from .models import Blog,Category
from .serializers import BlogViewSerializers,CatogeryViewSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BlogView(APIView):
    def get(self, request, format=None):
        blogs = Blog.objects.filter(on_deleted = False , user = request.user)
        # blogs = Blog.objects.filter(on_deleted = False)
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)

class CategoryView(APIView):
    def get(self, request, format=None):
        # category = Category.objects.select_related("blog").filter(on_deleted = False)
        category = Category.objects.filter(on_deleted = False)
        serializer = CatogeryViewSerializer(category, many=True)
        return Response(serializer.data)

class BlogDetail(APIView):
    def post(self, request, format=None):
        serializer = BlogViewSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



