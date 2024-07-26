from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse_lazy
from rest_framework.views import APIView

from JobsPy.core.decorators import job_seeker_activated_required
from JobsPy.core.permissions import IsCompanyUser
from JobsPy.jobs.models import Job, Applicant, FavoriteJob
from JobsPy.jobs.serializers import JobsDetailSerializer, FavoriteJobSerializer, JobSerializer, ApplicantSerializer, \
    ChangeStatusSerializer
from JobsPy.main.models import Skills


# Create your views here.

class AllJobsViewApi(ListAPIView):
    serializer_class = JobSerializer
    pagination_class = None  # Disable pagination
    permission_classes = permissions.AllowAny,

    def get_queryset(self):
        queryset = Job.objects.filter(is_published=True)
        title = self.request.GET.get('title')
        seniority_filter = self.request.GET.get('seniority')
        location_filter = self.request.GET.get('location')
        job_type_filter = self.request.GET.get('job_type')
        job_category = self.request.GET.get('category')
        needed_skills_filter = self.request.GET.getlist('needed_skills')

        if title:
            queryset = queryset.filter(title__icontains=title)

        if seniority_filter:
            queryset = queryset.filter(seniority=seniority_filter)

        if location_filter:
            queryset = queryset.filter(location__icontains=location_filter)

        if job_type_filter:
            queryset = queryset.filter(job_type=job_type_filter)

        if job_category:
            queryset = queryset.filter(category_id=job_category)

        if needed_skills_filter:
            # Convert skill names to skill IDs
            skill_ids = Skills.objects.filter(name__in=needed_skills_filter).values_list('id', flat=True)
            print(skill_ids)

            # Filter jobs that have all the specified skills
            queryset = queryset.filter(needed_skills__id__in=skill_ids).distinct()

        return queryset

class JobsDetailsAPIView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = JobsDetailSerializer
    # permission_classes = (permissions.AllowAny)




@api_view(['POST'])
# @job_seeker_activated_required
def apply_for_job(request, pk):
    print("test2")
    if request.user.is_authenticated and request.user.role == 'jobseeker':
        print("test")
        try:
            job = Job.objects.get(id=pk)
        except Job.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)

        if not Applicant.objects.filter(user=request.user, job=job).exists():
            # Create an Applicant instance and save it to the database
            applicant = Applicant.objects.create(user=request.user, job=job)
            serializer = ApplicantSerializer(applicant)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'User has already applied for this job'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)


class AddToFavoritesAPIView(APIView):
    def post(self, request, pk):
        # Get the job object
        job = get_object_or_404(Job, pk=pk)

        # Check if the job is not already in favorites
        if not FavoriteJob.objects.filter(user=request.user, job=job).exists():
            # Create a new FavoriteJob instance
            favorite_job = FavoriteJob.objects.create(user=request.user, job=job)
            serializer = FavoriteJobSerializer(favorite_job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({'message': 'Job is already in favorites'}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromFavoritesAPIView(APIView):
    def post(self, request, pk):
        # Get the job object
        job = get_object_or_404(Job, pk=pk)

        # Check if the job is in favorites for the current user
        favorite_job = FavoriteJob.objects.filter(user=request.user, job=job).first()

        if favorite_job:
            # Job is in favorites, remove it
            favorite_job.delete()
            return Response({'message': 'Job removed from favorites'}, status=status.HTTP_204_NO_CONTENT)

        return Response({'message': 'Job is not in favorites'}, status=status.HTTP_400_BAD_REQUEST)



class DeleteJobView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"detail": "You do not have permission to delete this job."}, status=status.HTTP_403_FORBIDDEN)
        return self.destroy(request, *args, **kwargs)



class JobCreateAPIView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyUser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)




class JobUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Optionally, restrict the queryset to jobs owned by the requesting user
        user = self.request.user
        return Job.objects.filter(user=user)


class ApplicantListAPIView(generics.ListAPIView):
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        job_pk = self.kwargs['pk']
        print("test")
        print(job_pk)
        job = get_object_or_404(Job, pk=job_pk)
        return job.applicants.all()


class ChangeStatusAPIView(generics.UpdateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ChangeStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_success_url(self):
        return reverse_lazy("applicant_list", kwargs={"pk": self.object.job_id})