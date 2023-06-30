from django.contrib.auth import get_user_model
# import models
from .models import *
# import serializers
from .serializers import *
# import rest framework viewset
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.get_queryset()
    serializer_class = UserSerializers
    lookup_field = 'username'


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.get_queryset()
    serializer_class = CategorySerializers
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.filter(is_delete=False)
    serializer_class = PostSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    lookup_field = 'slug'

    def get_queryset(self):
        queryset = super().get_queryset()
        find_title = self.request.query_params.get('search', None)
        find_category = self.request.query_params.get('category', None)
        author_id = self.request.query_params.get('author', None)

        if find_title:
            queryset = self.queryset.filter(title=find_title)
        if find_category:
            queryset = self.queryset.filter(category=find_category)
        if author_id:
            queryset = self.queryset.filter(author=author_id)

        return queryset


class LikePostViewSet(viewsets.ModelViewSet):
    queryset = LikePost.objects.get_queryset()
    serializer_class = LinkSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        find_like = self.request.query_params.get('like', None)

        if find_like:
            queryset = self.queryset.filter(blog_post=find_like)

        return queryset
