from .models import Blog, Category
from .serializers import BlogViewSerializers, CategoryViewSerializer, BlogDetailSerializer, LogoutSerializer, \
    UserRegisterSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from blog.commons.permission import IsOwnerOrReadOnly
from django.db.models import Prefetch
from blog.commons.paginations import PaginationAPIView
from rest_framework.settings import api_settings
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import UserRegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class BlogAllView(PaginationAPIView):
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    serializer_class = BlogViewSerializers
    queryset = Blog.objects.filter(on_deleted=False, public=True)

    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializerpage = self.serializer_class(page, many=True)
            return self.get_paginated_response(serializerpage.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Get all blog


class BlogAllDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            blogs = Blog.objects.get(id=pk, on_deleted=False, public=True)
            print(blogs)
            serializer = BlogViewSerializers(blogs)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryAllView(generics.ListAPIView):
    def get(self, request, format=None):
        category = Category.objects.prefetch_related(
            Prefetch('blog', queryset=Blog.objects.filter(on_deleted=False, public=True))).filter(on_deleted=False)
        serializer = CatogeryViewSerializer(category, many=True)
        return Response(serializer.data)


class CategoryAllDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            category = Category.objects.prefetch_related(
                Prefetch('blog', queryset=Blog.objects.filter(on_deleted=False, public=True))).get(on_deleted=False,
                                                                                                   id=pk)
            serializer = CatogeryViewSerializer(category)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class BlogUserView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        blogs = Blog.objects.filter(on_deleted=False, user=request.user)
        serializer = BlogViewSerializers(blogs, many=True)
        return Response(serializer.data)


class BlogUpload(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = BlogDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogDetail(APIView):
    permissions_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def put(self, request, pk, format=None):
        try:
            blog_obj = Blog.objects.get(pk=pk, on_deleted=False)
            serializers = BlogDetailSerializer(blog_obj, data=request.data, partial=True)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        blog_obj = Blog.objects.get(pk=pk, on_deleted = False)
        blog_obj.on_deleted = True
        blog_obj.save()
        return Response({"message": "blog deleted!"}, status=status.HTTP_200_OK)


class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogOutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
