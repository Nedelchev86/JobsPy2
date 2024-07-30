from django.shortcuts import render
from rest_framework import generics, status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from JobsPy.jobs.models import FavoriteJob, Applicant
from JobsPy.jobs.serializers import FavoriteJobSerializer, ApplicantSerializer
from JobsPy.jobseekers.models import JobSeeker, Education
from JobsPy.jobseekers.serializers import JobSeekerSerializer, EducationSerializer
from JobsPy.main.models import Skills


# Create your views here.

class JobSeekerUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the JobSeeker instance of the current user
        return JobSeeker.objects.get(user=self.request.user)


class FavoriteJobsListAPIView(APIView):
    def get(self, request):
        # Retrieve all favorite jobs for the current user
        favorite_jobs = FavoriteJob.objects.filter(user=request.user)
        serializer = FavoriteJobSerializer(favorite_jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def check_favorite_status(request, pk):
    if not request.user.is_authenticated:
        return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    is_favorite = FavoriteJob.objects.filter(user=request.user, job_id=pk).exists()

    return Response({'is_favorite': is_favorite}, status=status.HTTP_200_OK)


class JobSeekerViewSet(viewsets.ModelViewSet):
    queryset = JobSeeker.objects.filter(activated=True)
    serializer_class = JobSeekerSerializer
    permission_classes = permissions.AllowAny,
    pagination_class = None  # Disable pagination

    def get_queryset(self, location__icontains=None):
        queryset = JobSeeker.objects.filter(activated=True)
        city = self.request.GET.get('city', None)
        seniority_filter = self.request.GET.get('seniority')
        skills_filter = self.request.GET.get('skill')

        if city:
            queryset = queryset.filter(city__icontains=city)
        if seniority_filter:
            queryset = queryset.filter(seniority=seniority_filter)

        if skills_filter:
            skill = get_object_or_404(Skills, name=skills_filter)

            queryset = queryset.filter(skills=skill)
        return queryset


@api_view(['GET'])
def job_applicants(request, pk):
    # Check if the current user is authenticated
    if request.user.is_authenticated:
        # Filter applicants for the specified job and current user
        try:
            applicant = Applicant.objects.get(job_id=pk, user=request.user)
            serializer = ApplicantSerializer(applicant)
            return Response(serializer.data)
        except Applicant.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class ApplyedJobsAPIView(generics.ListAPIView):
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Applicant.objects.filter(user_id=self.request.user.pk)

class UserEducationListAPI(generics.ListAPIView):
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        job_seeker = get_object_or_404(JobSeeker, user_id=user_id)

        return Education.objects.filter(job_seeker=job_seeker)

class CreateEducationAPI(generics.CreateAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can create records

    def perform_create(self, serializer):
        user = self.request.user
        # Ensure the user is a job seeker
        job_seeker = get_object_or_404(JobSeeker, user=user)
        serializer.save(job_seeker=job_seeker)

# View for editing an existing education record
class EditEducationAPI(generics.UpdateAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can edit records

    def get_queryset(self):
        return Education.objects.all()

    def perform_update(self, serializer):
        education = self.get_object()
        if education.job_seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this education record.")
        serializer.save()

class DeleteEducationAPI(generics.DestroyAPIView):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can delete records

    def get_queryset(self):
        return Education.objects.all()

    def perform_destroy(self, instance):
        # Check if the user trying to delete is the owner of the education record
        if instance.job_seeker.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this education record.")
        instance.delete()

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PermissionDenied as e:
            return Response({'detail': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'detail': 'Something went wrong.'}, status=status.HTTP_400_BAD_REQUEST)