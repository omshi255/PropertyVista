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
