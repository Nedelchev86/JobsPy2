# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.validators import UniqueValidator

from JobsPy.company.models import CompanyProfile
from JobsPy.jobs.models import FavoriteJob, Job, Applicant
from JobsPy.jobseekers.serializers import JobSeekerSerializer
from JobsPy.main.models import Skills

userModel = get_user_model()


class JobSerializer(serializers.ModelSerializer):
    needed_skills = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Skills.objects.all())
    class Meta:
        model = Job
        fields = '__all__'

class FavoriteJobSerializer(serializers.ModelSerializer):
    job_details = JobSerializer(source='job', read_only=True)
    class Meta:
        model = FavoriteJob
        fields = '__all__'


class JobsDetailSerializer(serializers.ModelSerializer):
    company = serializers.SerializerMethodField()
    needed_skills = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Skills.objects.all())

    class Meta:
        model = Job
        fields = '__all__'
    def get_company(self, obj):
        user_id = obj.user_id


        try:
            user = CompanyProfile.objects.get(pk=user_id)

            return user.name
        except CompanyProfile.DoesNotExist:
            return None



class ApplicantSerializer(serializers.ModelSerializer):
    job_seeker = JobSeekerSerializer(source='user.jobseeker', read_only=True)
    status_name = serializers.CharField(source='get_status', read_only=True)

    class Meta:
        model = Applicant
        fields = ['id', 'user', 'job', 'created_at', 'comment', 'status', 'job_seeker', "status_name"]