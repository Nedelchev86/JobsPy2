from rest_framework import serializers
from .models import BlogPost, Comment
from ..accounts.serializers import UserSerializer
from ..company.models import CompanyProfile
from ..company.serializers import CompanySerializer
from ..jobseekers.models import JobSeeker
from ..jobseekers.serializers import JobSeekerSerializer


class BlogPostSerializer(serializers.ModelSerializer):
    author= JobSeekerSerializer( read_only=True)
    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogPostCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogPost
        exclude = ['author']  # We exclude author as it will be set automatically


# class CommentSerializer(serializers.ModelSerializer):
#     author = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Comment
#         fields = '__all__'
#
#     def get_author(self, obj):
#         # Check if the author is a jobseeker
#         user = obj.author
#         if user.role == 'jobseeker':
#             jobseeker = user.jobseeker
#             return CommentJobSeekerSerializer(jobseeker).data
#         else:
#             company = user.company
#             return CommentCompanySerializer(company).data
#
#
#
# class CommentJobSeekerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = JobSeeker
#         fields = ['first_name', 'last_name', 'profile_picture', 'pk']
#
#         # read_only_fields = ['first_name', 'last_name', 'pk']
#
# class CommentCompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CompanyProfile
#         fields = ['name', 'image', 'pk']
#
#
# class CommentSerializerCreate(serializers.ModelSerializer):
#     author = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Comment
#         fields = ['content', 'author']
#
#     def get_author(self, obj):
#         # Check if the author is a jobseeker
#         user = obj.author
#         if user.role == 'jobseeker':
#             jobseeker = user.jobseeker
#             return CommentJobSeekerSerializer(jobseeker).data
#         else:
#             company = user.company
#             return CommentCompanySerializer(company).data


class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_author(self, obj):
        # Check if the author is a jobseeker
        user = obj.author
        if user.role == 'jobseeker':
            jobseeker = user.jobseeker
            return CommentJobSeekerSerializer(jobseeker).data
        else:
            company = user.company
            return CommentCompanySerializer(company).data



class CommentJobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = ['first_name', 'last_name', 'profile_picture', 'pk']

        # read_only_fields = ['first_name', 'last_name', 'pk']

class CommentCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ['name', 'image', 'pk']
