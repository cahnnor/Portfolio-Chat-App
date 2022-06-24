from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')),
    #path('room/', include('base.urls')),
    #path('room/<str:pk>/', include('base.urls'))
]