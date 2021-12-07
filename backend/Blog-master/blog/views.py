from .models import Blog,Category
from .serializers import BlogViewSerializers,CatogeryViewSerializer,BlogDetailSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from blog.commons.permission import IsOwnerOrReadOnly
from django.db.models import Prefetch
from blog.commons.paginations import PaginationAPIView
from rest_framework.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken

class BlogAllView(PaginationAPIView):
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    serializer_class = BlogViewSerializers
    permissions_classes = [permissions.AllowAny]
    queryset = Blog.objects.filter(on_deleted = False, public = True)  
    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializerpage = self.serializer_class(page,many = True)
            return self.get_paginated_response(serializerpage.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
class BlogAllDetailView(APIView):
    permissions_classes = [permissions.AllowAny]
    def get(self, request, pk,format=None):
        try:
            blogs = Blog.objects.get(id=pk,on_deleted = False, public = True)
            print(blogs)
            serializer = BlogViewSerializers(blogs)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    
class CategoryAllView(generics.ListAPIView):
    permissions_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        category = Category.objects.prefetch_related(
            Prefetch('blog',queryset=Blog.objects.filter(on_deleted = False, public = True))).filter(on_deleted = False)
        serializer = CatogeryViewSerializer(category, many=True)
        return Response(serializer.data)

class CategoryAllDetailView(APIView):
    permissions_classes = [permissions.AllowAny]
    def get(self, request, pk,format=None):
        try:
            category = Category.objects.prefetch_related(
            Prefetch('blog',queryset=Blog.objects.filter(on_deleted = False, public = True))).get(on_deleted = False,id = pk)
            serializer = CatogeryViewSerializer(category)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
 
class BlogUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        blogs = Blog.objects.filter(on_deleted = False , user = request.user)
        # blogs = Blog.objects.filter(on_deleted = False)
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)

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
    def get(self, request, pk,format=None):
        try:
            blog = Blog.objects.get(pk=pk,)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)