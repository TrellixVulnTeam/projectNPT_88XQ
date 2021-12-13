from .models import Blog
from .serializers import BlogViewSerializers,BlogDetailSerializer,UserRegisterSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from blog.commons.permission import IsOwnerOrReadOnly
# from django.db.models import Prefetch
from blog.commons.paginations import PaginationAPIView
from rest_framework.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.filters import SearchFilter
from rest_framework import filters


class BlogAllView(PaginationAPIView):
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    serializer_class = BlogViewSerializers
    permissions_classes = [permissions.IsAuthenticated]
    queryset = Blog.objects.filter(on_deleted = False, public = True)  
    def get(self, request, format=None):
        page = self.paginate_queryset(self.queryset)
        print(page)
        if page is not None:
            serializerpage = self.serializer_class(page,many = True)
            return self.get_paginated_response(serializerpage.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
class BlogAllDetailView(APIView):
    permissions_classes = [permissions.IsAuthenticated]
    def get(self, request, pk,format=None):
        try:
            blogs = Blog.objects.get(id=pk,on_deleted = False, public = True)
            serializer = BlogViewSerializers(blogs)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    
# class CategoryAllView(generics.ListAPIView):
#     permissions_classes = [permissions.AllowAny]
#     def get(self, request, format=None):
#         category = Category.objects.prefetch_related(
#             Prefetch('blog',queryset=Blog.objects.filter(on_deleted = False, public = True))).filter(on_deleted = False)
#         serializer = CatogeryViewSerializer(category, many=True)
#         return Response(serializer.data)

# class CategoryAllDetailView(APIView):
#     permissions_classes = [permissions.AllowAny]
#     def get(self, request, pk,format=None):
#         try:
#             category = Category.objects.prefetch_related(
#             Prefetch('blog',queryset=Blog.objects.filter(on_deleted = False, public = True))).get(on_deleted = False,id = pk)
#             serializer = CatogeryViewSerializer(category)
#             return Response(serializer.data)
#         except:
#             return Response(status=status.HTTP_404_NOT_FOUND)
 
 
class BlogUserView(PaginationAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = BlogViewSerializers
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    def get(self, request, format=None):
        queryset = Blog.objects.filter(on_deleted = False , user = request.user)
        page = self.paginate_queryset(queryset)
        print(page)
        if page is not None:
            serializerpage = self.serializer_class(page,many = True)
            return self.get_paginated_response(serializerpage.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
   

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
    def get(self, request, pk, format=None):
        try:
            blog_obj = Blog.objects.get(pk=pk, on_deleted = False,user = request.user)
            serializers = BlogDetailSerializer(blog_obj)
            return Response(serializers.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk, format=None):
        try:
            blog_obj = Blog.objects.get(pk=pk, on_deleted = False,user = request.user)
            serializers = BlogDetailSerializer(blog_obj, data=request.data, partial=True)
            if serializers.is_valid():
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk, format=None):
        blog_obj = Blog.objects.get(pk=pk, on_deleted = False,user = request.user)
        blog_obj.on_deleted = True
        blog_obj.save()
        return Response({"message": "blog deleted!"}, status=status.HTTP_200_OK)     


class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer
    
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response_data =  {

                'user': serializer.data,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
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
   
        
class BlogFilterView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Blog.objects.filter(on_deleted=False, public=True)
    serializer_class = BlogViewSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'user__username', 'category__title']