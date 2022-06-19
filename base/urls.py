from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as av
from . import views
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # home, room<pk>, rooms
    path('login', views.loginPage, name="login"),
    path('logout', views.logoutUser, name="logout"),
    path('check-log', views.checkLogin, name="logged"), #av.obtain_auth_token
    path('', views.getRooms, name="home"),
    path('room/', views.getRooms, name="rooms"),
    path('room/<str:pk>/', views.getRoom, name="room"),
    path('room/<str:pk>/update', views.updateRoom, name="room-update"),
    path('room/<str:pk>/delete', views.deleteRoom, name="room-delete"),
    path('user/<str:name>', views.userPage, name="user-activity"),
    path('create-room', views.createRoom, name="create-room"),
    path('topics', views.getTopics, name="get-topics"),
    path('token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
    path('token',views.MyTokenObtainPairView.as_view(), name="token"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

