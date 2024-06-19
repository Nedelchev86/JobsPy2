from rest_framework import serializers
from .models import JobSeeker
from ..jobs.models import Skills


class JobSeekerSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(
        queryset=Skills.objects.all(),
        many=True,  # Allow multiple skills
        slug_field='name'  # Use the 'name' field of the Skills model
    )
    class Meta:
        model = JobSeeker
        fields = '__all__'  # or specify fields explicitly




