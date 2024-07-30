from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import permissions, status, generics
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from JobsPy.accounts.serializers import UserSerializer, ChangePasswordSerializer
from JobsPy.company.serializers import CompanyProfileSerializer
from JobsPy.jobseekers.serializers import JobSeekerSerializer

userModel = get_user_model()

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    pass  # Use default implementation

class MyTokenRefreshView(TokenRefreshView):
    pass  # Use default implementation


class UserRegistrationAPIView(CreateAPIView):
    queryset = userModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'email': user.email}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    permission_classes = (permissions.AllowAny)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        email = user.email


        if hasattr(user, 'company'):  # Check if the user has a company profile
            profile_serializer = CompanyProfileSerializer(user.company)
            user_type = 'company'
        elif hasattr(user, 'jobseeker'):  # Check if the user has a job seeker profile
            profile_serializer = JobSeekerSerializer(user.jobseeker)
            user_type = 'jobseeker'
        else:
            return Response({'error': 'User profile not found'}, status=404)

        return Response({'user_type': user_type, 'user': profile_serializer.data, 'email': email})



class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = userModel
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Set the new password
            self.object.set_password(serializer.validated_data['new_password'])
            self.object.save()
            return Response({'status': 'password set'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)