from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    pass  # Use default implementation

class MyTokenRefreshView(TokenRefreshView):
    pass  # Use default implementation
