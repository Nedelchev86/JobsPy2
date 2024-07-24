from rest_framework import serializers
from .models import JobSeeker, Education
from ..jobs.models import Skills, Applicant


class JobSeekerSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(
        queryset=Skills.objects.all(),
        many=True,  # Allow multiple skills
        slug_field='name'  # Use the 'name' field of the Skills model
    )
    class Meta:
        model = JobSeeker
        exclude = [ 'activated']




class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = '__all__'  # Include all fields or specify the fields you need


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'image', 'institution', 'description', 'start_date', 'end_date']