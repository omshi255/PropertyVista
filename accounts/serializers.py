from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
# serializers.py
from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

from rest_framework import serializers
from .models import ExploreProperties  # Updated to match the correct model name

class ExplorePropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExploreProperties  # Updated to use ExploreProperties model
        fields = '__all__'  # You can specify specific fields if needed instead of '__all__'
#for rental proeprty

from rest_framework import serializers
from .models import RentalProperty

class RentalPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalProperty
        fields = '__all__'
#home interior
# serializers.py
from rest_framework import serializers
from .models import PropertyInterior

class PropertyInteriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyInterior
        fields = '__all__'
# serializers.py
from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'property']
        #user review
from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

