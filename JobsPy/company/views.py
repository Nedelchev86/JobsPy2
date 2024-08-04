from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import Http404
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import get_object_or_404, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from JobsPy.company.models import CompanyProfile
from JobsPy.company.serializers import CompanySerializer, CompanyProfileSerializer, JobWithApplicantsCountSerializer, \
    ApplicantSerializer
from JobsPy.core.permissions import IsCompanyUser

from JobsPy.jobs.models import Job, Applicant
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


# class CompanyProfileViewSet(viewsets.ModelViewSet):
#     queryset = CompanyProfile.objects.filter(activated=True)
#     serializer_class = CompanyProfileSerializer
#     pagination_class = None  # Disable pagination
#     permission_classes = permissions.AllowAny,
#
#     # New method to retrieve details of a specific company by ID
#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)
class CompanyProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard actions for CompanyProfile
    """
    queryset = CompanyProfile.objects.filter(activated=True)
    serializer_class = CompanyProfileSerializer
    pagination_class = None  # Disable pagination for simplicity
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated, IsCompanyUser])
    def delete(self, request, *args, **kwargs):
        """
        Custom action to delete the current user's profile
        """
        print("test")
        user = request.user
        print(request.user)

        # Delete the user's profile
        user.delete()

        return Response({"detail": "Profile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class ChangeStatusAPI( RetrieveUpdateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Override the get_object method to include permission checks."""
        obj = super().get_object()

        # Ensure the user has the correct role (simulating CompanyRoleRequiredMixin logic)
        # if not self.request.user.groups.filter(name='CompanyRole').exists():
        #     self.permission_denied(self.request, message='Permission denied.')

        # Simulate ApplicantCompanyMixin logic: Ensure the user is associated with the applicant's company
        if obj.job.user != self.request.user:
            self.permission_denied(self.request, message='Not authorized to update this applicant.')

        return obj

    def get(self, request, *args, **kwargs):
        """Handle GET requests to retrieve applicant details."""
        applicant = self.get_object()
        serializer = self.get_serializer(applicant)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        """Handle PUT requests to update applicant status."""
        applicant = self.get_object()
        serializer = self.get_serializer(applicant, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangeApplicantStatus(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Applicant.objects.get(pk=pk)
        except Applicant.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        applicant = self.get_object(pk)

        # Check if the requesting user is a company user and is the owner of the job
        if request.user.role != 'company' or request.user.pk != applicant.job.user.pk:
            raise PermissionDenied("You do not have permission to change the status of this applicant.")

        serializer = ApplicantSerializer(applicant, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CompanyCountView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        company_count = CompanyProfile.objects.count()
        return Response({"company_count": company_count}, status=status.HTTP_200_OK)


class CompanyDeleteAPIView(APIView):
    """
    API view to delete a company user's profile.
    """
    permission_classes = [IsAuthenticated, IsCompanyUser]

    def delete(self, request, *args, **kwargs):
        user = request.user

        # Perform the deletion
        user.delete()

        return Response({"detail": "Profile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)