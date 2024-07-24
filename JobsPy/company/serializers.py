from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser

from .models import CompanyProfile
from ..jobs.models import Skills, Job, Applicant


class CompanyProfileSerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(many=True, slug_field='name', queryset=Skills.objects.all())
    class Meta:
        model = CompanyProfile
        fields = '__all__'  # or specify fields explicitly


class CompanySerializer(serializers.ModelSerializer):
    skills = serializers.SlugRelatedField(
        queryset=Skills.objects.all(),
        many=True,  # Allow multiple skills
        slug_field='name'  # Use the 'name' field of the Skills model
    )
    class Meta:
        model = CompanyProfile
        exclude = ["user", 'activated']
        parser_classes = (MultiPartParser, FormParser)

        def perform_create(self, serializer):
            serializer.save(image=self.request.data.get('image'))

class JobWithApplicantsCountSerializer(serializers.ModelSerializer):
    num_applicants = serializers.IntegerField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'location', 'created_at', 'num_applicants', "job_type", "job_image", "category"]

    def get_category(self, obj):
        return obj.category.name if obj.category else None


class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = ['id', 'user', 'job', 'created_at', 'comment', 'status']
        read_only_fields = ['id', 'user', 'job', 'created_at']