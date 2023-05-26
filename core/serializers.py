from rest_framework import serializers
from rest_framework import pagination
from .models import Weights
from .models import Sleeping
from .models import Walking
from .models import Calorie
from .models import Myuser


class WeightsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weights
        fields = ('id', 'UserID', 'weight_val', 'time', 'unit')


class SleepingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleeping
        fields = ('id', 'UserID', 'sleep_dur', 'start', 'end', 'unit')

class WalkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Walking
        fields = ('id', 'UserID', 'Walking_val', 'time', 'time_created', 'Steps', 'unit')


class CalorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calorie
        fields = ('id', 'UserID', 'in_val', 'out_val', 'in_unit', 'out_unit', 'time')


class MyuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myuser
        fields = ('UserID', 'Username', 'Password', 'Email', 'created')

