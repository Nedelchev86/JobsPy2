from rest_framework import serializers
from rest_framework.parsers import MultiPartParser, FormParser

from .models import CompanyProfile
from ..jobs.models import Skills


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

