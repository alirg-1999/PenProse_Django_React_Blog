from rest_framework import serializers
from rest_framework.authtoken.models import Token
# import models
from .models import *


# serialize User
class UserSerializers(serializers.ModelSerializer):

    class Meta:
        model = ProfileUser
        fields = ['id',  'username', 'email', 'userimage',
                  'twitter', 'telegram', 'instagram', 'github', 'linkedin', 'create_at', 'youtube', 'password']

        read_only_fields = ['is_staff']
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = ProfileUser(**validated_data)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return user


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']


class PostSerializers(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", 'author', "author_username", 'category', 'postimg',
                  'title', 'content', 'slug', 'create_at']

    def get_author_username(self, obj):
        return obj.author.username


class LinkSerializers(serializers.ModelSerializer):
    class Meta:
        model = LikePost
        fields = ['id', 'blog_post', 'user_id', 'is_like']
