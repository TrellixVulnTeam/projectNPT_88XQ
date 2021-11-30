from .models import Blog
from .serializers import BlogViewSerializers
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BlogView(APIView):
    def get(self, request, format=None):
        blogs = Blog.objects.all()
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)


class BlogDetail(APIView):
    def post(self, request, format=None):
        serializer = BlogViewSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



