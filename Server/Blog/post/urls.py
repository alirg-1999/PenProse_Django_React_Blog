from django.urls import path, include
from .views import PostViewSet, UserViewSet, CategoryViewSet, LikePostViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('post', PostViewSet, basename='post')
router.register('users', UserViewSet, basename='user')
router.register('category', CategoryViewSet, basename='category')
router.register('like', LikePostViewSet, basename='like')

urlpatterns = [
    path('api/', include(router.urls))
]
