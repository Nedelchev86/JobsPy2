from rest_framework import serializers

from JobsPy.accounts.serializers import UserSerializer
from JobsPy.company.serializers import CompanySerializer
from JobsPy.jobs.models import Job
from JobsPy.jobseekers.models import JobSeeker
from JobsPy.notifications.models import Notification, NotificationJobSeeker


class NotificationSerializerJob(serializers.ModelSerializer):
    # category = serializers.SerializerMethodField()
    # seniority = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['title', "pk", "job_image"]


class NotificationSerializerJobSeeker(serializers.ModelSerializer):

    class Meta:
        model = JobSeeker
        fields = ["first_name", "last_name", "profile_picture", "pk"]

class NotificationSerializer(serializers.ModelSerializer):
    job = NotificationSerializerJob(read_only=True)
    job_seeker = NotificationSerializerJobSeeker(read_only=True)
    user = UserSerializer(read_only=True)
    # company = CompanySerializer(read_only=True)
    class Meta:
        model = Notification
        fields = '__all__'

class NotificationJobSeekerSerializer(serializers.ModelSerializer):
    job = NotificationSerializerJob(read_only=True)

    class Meta:
        model = NotificationJobSeeker
        fields = '__all__'