from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from JobsPy.jobs.models import FavoriteJob
from JobsPy.jobs.serializers import FavoriteJobSerializer
from JobsPy.jobseekers.models import JobSeeker
from JobsPy.jobseekers.serializers import JobSeekerSerializer


# Create your views here.


class JobSeekerUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the JobSeeker instance of the current user
        return JobSeeker.objects.get(user=self.request.user)



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