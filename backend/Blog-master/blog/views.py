from .models import Blog,Category
from .serializers import BlogViewSerializers,CatogeryViewSerializer,BlogDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from blog.commons.permission import IsOwnerOrReadOnly

class BlogAllView(APIView):
    def get(self, request, format=None):
        blogs = Blog.objects.filter(on_deleted = False, public = True)  
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)

class CategoryView(generics.ListAPIView):
    # queryset = Category.objects.prefetch_related('blog').filter(on_deleted = False)
    # serializer_class = CatogeryViewSerializer
    def get(self, request, format=None):
        category = Category.objects.prefetch_related('blog').filter(on_deleted = False, 
                                                                    blog__on_deleted = False, 
                                                                    blog__public = True)
        #category = Category.objects.filter(on_deleted = False)
        serializer = CatogeryViewSerializer(category, many=True)
        return Response(serializer.data)
    
class BlogUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        blogs = Blog.objects.filter(on_deleted = False , user = request.user)
        # blogs = Blog.objects.filter(on_deleted = False)
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)



# class UserView(APIView):
    
    
class BlogUpload(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    def post(self, request, format=None):
        serializer = BlogDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogDetail(APIView):
    permissions_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]
    def put(self, request, pk,format=None):
        blog = Blog.objects.get(pk=pk)