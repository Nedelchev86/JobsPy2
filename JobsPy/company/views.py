from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from JobsPy.company.models import CompanyProfile
from JobsPy.company.serializers import CompanySerializer
from JobsPy.jobs.models import Job
from JobsPy.jobs.serializers import JobSerializer


# Create your views here.
class CompanyUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retrieve the JobSeeker instance of the current user

        return CompanyProfile.objects.get(user=self.request.user)


class CreatedJobsAPIView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Job.objects.filter(user=self.request.user).order_by('-id')

class CompanyApplicantAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        jobs = Job.objects.filter(user=user, is_published=True).annotate(num_applicants=Count('applicants')).filter(num_applicants__gt=0)
        serializer = JobWithApplicantsCountSerializer(jobs, many=True)
        return Response(serializer.data)
