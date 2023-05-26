"""
URL configuration for PM6G2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from core.views import front
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front),
    path('home/', front),
    path('sleep/', front),
    path('weight/', front),
    path('calorie/', front),
    path('walking/', front),
    path('login/', front),
    path('signup/', front),
    path('users/', views.UserAuthView.as_view()),
    path('dbwalking/', views.WalkingListView.as_view()),
    path('dbweights/', views.WeightListView.as_view()),
    path('dbcalorie/', views.CalorieListView.as_view()),
    path('dbsleeping/', views.SleepingListView.as_view()),
]
