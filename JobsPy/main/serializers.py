from rest_framework import serializers

from .models import Seniority
from ..jobs.models import Skills


class SkillsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skills
        fields = '__all__'


class SenioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Seniority
        fields = ['id', 'name']  # Include fields you want to expose via the API