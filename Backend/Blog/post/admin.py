from django.contrib import admin
from .models import Post, ProfileUser, Category, LikePost


# admin Profile user
@admin.register(ProfileUser)
class UserAdmin(admin.ModelAdmin):
    fieldsets = [[None, {"fields": ['username', 'email', 'password']}],
                 ["Advanced options", {"classes": ["collapse"], "fields": ['userimage', ('twitter', 'telegram', 'instagram',), ('github', 'linkedin', 'youtube',)]}],]

    search_fields = ['username', 'email']


# admin Post user
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_filter = ['title']
    prepopulated_fields = {'slug': ['title']}
    search_fields = ['title']

    fieldsets = [[None, {'fields': [
        ('title', 'slug',), 'content', 'postimg', 'author', 'category']}]]


# admin Category
@admin.register(Category)
class CategoryModels(admin.ModelAdmin):
    search_fields = ['title']


# admin Like
admin.site.register(LikePost)
