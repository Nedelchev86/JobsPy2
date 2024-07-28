from django.shortcuts import render
from rest_framework import generics, permissions

from JobsPy.main.models import Skills, Seniority
from JobsPy.main.serializers import SkillsSerializer, SenioritySerializer


# Create your views here.


class SkillsListAPIView(generics.ListAPIView):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    permission_classes = (permissions.AllowAny,)


class SeniorityListView(generics.ListAPIView):
    queryset = Seniority.objects.all()
    serializer_class = SenioritySerializer
    permission_classes = (permissions.AllowAny,)