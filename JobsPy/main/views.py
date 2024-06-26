from django.shortcuts import render
from rest_framework import generics, permissions

from JobsPy.main.models import Skills
from JobsPy.main.serializers import SkillsSerializer


# Create your views here.


class SkillsListAPIView(generics.ListAPIView):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    permission_classes = (permissions.AllowAny,)