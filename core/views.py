from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from rest_framework.generics import get_object_or_404

from rest_framework.viewsets import ModelViewSet
from rest_framework import generics

from rest_framework.pagination import PageNumberPagination
from rest_framework import pagination
from django.core.paginator import Paginator

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

import datetime

from .models import Weights
from .models import Sleeping
from .models import Walking
from .models import Calorie
from .models import Myuser

from .serializers import WeightsSerializer
from .serializers import SleepingSerializer
from .serializers import WalkingSerializer
from .serializers import CalorieSerializer
from .serializers import MyuserSerializer


def front(request):
    context = {}
    return render(request, "index.html", context)


class WeightListView(APIView):
    def get(self, request, format=None) -> Response:
        fval = request.query_params.get('type')
        print("Weight filter", fval)
        posts = Weights.objects.filter(UserID=fval).order_by('-time')[:7]
        # posts = Weights.objects.all()
        serializer = WeightsSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None) -> Response:
        request.data['time'] = '2023-05-17'
        # print(request.data)
        serializer = WeightsSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WalkingListView(APIView):
    def get(self, request, format=None) -> Response:
        fval = request.query_params.get('type')
        # print("Walking filter", fval)
        posts = Walking.objects.filter(UserID=fval)
        # print(posts)
        posts = Walking.objects.filter(UserID=fval).order_by('-time')[:7]
        # print(posts)
        # posts = Weights.objects.all()
        serializer = WalkingSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None) -> Response:
        serializer = WalkingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        valv = request.query_params.get('id')
        Walking.objects.get(id=valv).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, format=None):
        item_id = request.data.get('id')
        item = Walking.objects.get(id=item_id)

        serializer = WalkingSerializer(item, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAuthView(APIView):
    def get(self, request, format=None) -> Response:
        got_username = request.data['Username']
        posts = Myuser.objects.get(Username=got_username)
        serializer = MyuserSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None) -> Response:
        got_username = request.data['Username']
        got_password = request.data['Password']
        branch = request.data['mypara']
        print("User login para:", branch)
        if branch == 'login':
            user = Myuser.objects.get(Username=got_username, Password=got_password)
            if user is not None:
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        elif branch == 'getID':
            posts = Myuser.objects.get(Username=got_username)
            serializer = MyuserSerializer(posts)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            serializer = MyuserSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalorieListView(APIView):
    def get(self, request, format=None) -> Response:
        fval = request.query_params.get('type')
        posts = Calorie.objects.filter(UserID=fval).order_by('-time')[:7]
        serializer = CalorieSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None) -> Response:
        serializer = CalorieSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        valv = request.query_params.get('id')
        Calorie.objects.get(id=valv).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, format=None):
        item_id = request.data.get('id')
        item = Calorie.objects.get(id=item_id)
        serializer = CalorieSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SleepingListView(APIView):
    def get(self, request, format=None) -> Response:
        fval = request.query_params.get('type')
        posts = Sleeping.objects.filter(UserID=fval).order_by('-id')[:7]
        serializer = SleepingSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None) -> Response:
        serializer = SleepingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        valv = request.query_params.get('id')
        Sleeping.objects.get(id=valv).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, format=None):
        item_id = request.data.get('id')
        item = Sleeping.objects.get(id=item_id)
        serializer = SleepingSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
