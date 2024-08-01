from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response

from JobsPy.main.models import Skills, Seniority, Contact
from JobsPy.main.serializers import SkillsSerializer, SenioritySerializer, ContactSerializer


# Create your views here.


class SkillsListAPIView(generics.ListAPIView):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    permission_classes = (permissions.AllowAny,)


class SeniorityListView(generics.ListAPIView):
    queryset = Seniority.objects.all()
    serializer_class = SenioritySerializer
    permission_classes = (permissions.AllowAny,)


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)