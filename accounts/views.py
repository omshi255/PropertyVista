from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth.models import User

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully"})
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return Response({"error": "Invalid credentials"}, status=400)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
        })

# property card
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer

class PropertyListView(APIView):
    def get(self, request):
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)

# slider logic

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import SliderProperty
import json

# Fetch slider properties
def slider_properties(request):
    sliders = SliderProperty.objects.all().values('id', 'title', 'image_url', 'description', 'link', 'rating')
    return JsonResponse(list(sliders), safe=False)

# Update rating for a specific slider property
@csrf_exempt
def update_rating(request, slider_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_rating = data.get('rating', None)
            slider = SliderProperty.objects.get(id=slider_id)
            if new_rating is not None:
                slider.rating = new_rating
                slider.save()
                return JsonResponse({'message': 'Rating updated successfully', 'rating': slider.rating})
        except SliderProperty.DoesNotExist:
            return JsonResponse({'error': 'Slider property not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
#contact agent
from django.shortcuts import render
from django.http import JsonResponse
from .models import PropertyAgent

def get_agents(request):
    agents = PropertyAgent.objects.all()
    agent_list = []

    for agent in agents:
        agent_data = {
            'name': agent.name,
            'phone_number': agent.phone_number,
            'email': agent.email,
            'property_location': agent.property_location,
            'property_description': agent.property_description,
            'property_image': agent.property_image.url if agent.property_image else ''
        }
        agent_list.append(agent_data)

    return JsonResponse(agent_list, safe=False)
#logout
from django.contrib.auth import logout
from django.http import JsonResponse

def user_logout(request):
    """
    Log the user out and return a response.
    """
    logout(request)  # This will log the user out
    return JsonResponse({"message": "Successfully logged out!"}, status=200)
#see properties
from django.http import JsonResponse
from .models import ExploreProperties

def get_explore_properties(request):
    category = request.GET.get('category', None)
    search_term = request.GET.get('search', None)

    # Filter properties based on query parameters
    properties = ExploreProperties.objects.all()
    if category:
        properties = properties.filter(category__iexact=category)
    if search_term:
        properties = properties.filter(title__icontains=search_term)

    # Serialize data to JSON
    property_list = [
        {
            "id": prop.id,
            "title": prop.title,
            "description": prop.description,
            "price": prop.price,
            "category": prop.category,
            "location": prop.location,
            "owner_name": prop.owner_name,
            "owner_contact": prop.owner_contact,
            "image": prop.image.url if prop.image else None,
        }
        for prop in properties
    ]
    return JsonResponse({"properties": property_list})
#search functonality
# accounts/views.py

from rest_framework import viewsets
from .models import ExploreProperties
from .serializers import ExplorePropertiesSerializer

class ExplorePropertiesViewSet(viewsets.ModelViewSet):
    queryset = ExploreProperties.objects.all()
    serializer_class = ExplorePropertiesSerializer
#rental properties
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RentalProperty
from .serializers import RentalPropertySerializer

class RentalPropertyListView(APIView):
    def get(self, request):
        properties = RentalProperty.objects.all()
        serializer = RentalPropertySerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
#home interiors

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import PropertyInterior
from .serializers import PropertyInteriorSerializer

class PropertyInteriorAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        properties = PropertyInterior.objects.all()
        serializer = PropertyInteriorSerializer(properties, many=True)
        return Response(serializer.data)
#fav
# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Favorite, PropertyInterior
from .serializers import FavoriteSerializer

@api_view(['POST'])
def add_to_favorites(request, property_id):
    user = request.user  # Get the logged-in user
    try:
        property = PropertyInterior.objects.get(id=property_id)
    except PropertyInterior.DoesNotExist:
        return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

    # Check if the property is already in the favorites
    if Favorite.objects.filter(user=user, property=property).exists():
        return Response({'message': 'Already in favorites'}, status=status.HTTP_200_OK)

    # Add property to favorites
    Favorite.objects.create(user=user, property=property)
    return Response({'message': 'Added to favorites'}, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
def remove_from_favorites(request, property_id):
    user = request.user
    try:
        property = PropertyInterior.objects.get(id=property_id)
    except PropertyInterior.DoesNotExist:
        return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

    favorite = Favorite.objects.filter(user=user, property=property).first()
    if favorite:
        favorite.delete()
        return Response({'message': 'Removed from favorites'}, status=status.HTTP_204_NO_CONTENT)
    return Response({'error': 'Not in favorites'}, status=status.HTTP_400_BAD_REQUEST)

#user reviews
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review
from .serializers import ReviewSerializer

class ReviewList(APIView):
    def get(self, request):
        reviews = Review.objects.all().order_by('-created_at')  # Latest reviews first
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
