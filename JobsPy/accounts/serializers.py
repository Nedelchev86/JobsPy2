# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.validators import UniqueValidator


userModel = get_user_model()
# class UserRegistrationSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(
#         required=True,
#         label="Email Address"
#     )
#
#     password = serializers.CharField(
#         required=True,
#         label="Password",
#         style={'input_type': 'password'}
#     )
#
#
#     class Meta:
#         model = userModel
#         fields = ['email', 'password', 'role']  # Assuming 'role' is a field in your Account model
#         extra_kwargs = {
#             'password': {'write_only': True},  # Ensure password is write-only
#         }
#     def create(self, validated_data):
#         user = userModel.objects.create_user(**validated_data)
#         return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = userModel
        fields = ['email', 'password', 'role']  # Assuming 'role' is a field in your Account model
        extra_kwargs = {
            'password': {'write_only': True},  # Ensure password is write-only
        }

    def create(self, validated_data):
        user = userModel.objects.create_user(**validated_data)
        return user



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        # Add any password validation logic here (optional)
        return value

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({'old_password': 'Old password is incorrect'})
        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user