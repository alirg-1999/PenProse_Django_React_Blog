from django.db import models
from django.contrib.auth.models import AbstractUser, User


class BaseModel(models.Model):
    is_delete = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# custom User for Profile
class ProfileUser(AbstractUser, BaseModel):
    object = User()
    userimage = models.ImageField(blank=True)
    telegram = models.CharField(max_length=255, blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    instagram = models.CharField(max_length=255, blank=True, null=True)
    github = models.CharField(max_length=255, blank=True, null=True)
    youtube = models.CharField(max_length=255, blank=True, null=True)
    linkedin = models.CharField(max_length=255, blank=True, null=True)
    first_name = 'none'
    last_name = 'none'


# category
class Category(BaseModel):
    title = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.title


# Blog Post models
class Post(BaseModel):
    title = models.CharField(max_length=255)
    content = models.TextField()
    slug = models.SlugField(default='', null=False, unique=True , max_length=255)
    postimg = models.ImageField()
    author = models.ForeignKey(ProfileUser, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return (f'{self.title} by {self.author.username}')


        return self.get(self.slug)


# like for Post Models
class LikePost(BaseModel):
    blog_post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='is_like')
    user_id = models.ForeignKey(ProfileUser, on_delete=models.CASCADE)
    is_like = models.BooleanField()

    class Meta:
        unique_together = ('user_id', 'blog_post')


    def __str__(self) -> str:
        return (f'like by {self.user_id.username} on {self.blog_post.title}')
