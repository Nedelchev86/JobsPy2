
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from JobsPy.accounts.views import MyTokenObtainPairView, MyTokenRefreshView, UserRegistrationAPIView, UserProfileView
from JobsPy.company.views import CompanyUpdateAPIView, CreatedJobsAPIView
from JobsPy.jobs.views import JobsDetailsAPIView, apply_for_job, AddToFavoritesAPIView, RemoveFromFavoritesAPIView, \
    DeleteJobView, JobCreateAPIView, JobUpdateAPIView, ApplicantListAPIView
from JobsPy.jobseekers.views import JobSeekerUpdateAPIView, FavoriteJobsListAPIView, check_favorite_status
from JobsPy.main.views import SkillsListAPIView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint to obtain JWT token
#     path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
#     path('api/user/', include('JobsPy.accounts.urls')),
#     path('api/company/', include('JobsPy.company.urls')),
#     path('api/jobs/', include('JobsPy.jobs.urls')),
#     path('api/jobseeker/', include('JobsPy.jobseekers.urls')),
# ]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint to obtain JWT token
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    # path('blog/', BlogPostListCreateAPIView.as_view(), name='blog-list'),
    path('api/user/', UserProfileView.as_view(), name='user-profile'),
    path('user/jobseeker/update/', JobSeekerUpdateAPIView.as_view(), name='jobseeker-update'),
    path('user/jobseeker/favorites/', FavoriteJobsListAPIView.as_view(), name='favorite_jobs_list'),
    path('jobs/<int:pk>/', JobsDetailsAPIView.as_view(), name='jobs-details'),
    path('jobs/<int:pk>/apply/', apply_for_job, name="apply-job"),
    # path('jobs/<int:pk>/applicants/', job_applicants, name='job_applicants'),
    path('jobs/<int:pk>/favorite/add/', AddToFavoritesAPIView.as_view(), name='add_to_favorites'),
    path('jobs/<int:pk>/favorite/remove/', RemoveFromFavoritesAPIView.as_view(), name='remove_from_favorites'),
    path('jobs/<int:pk>/favorite/check/', check_favorite_status, name='check_favorite_status'),
    path('jobs/<int:pk>/delete/', DeleteJobView.as_view(), name='delete-job'),
    path('skills/', SkillsListAPIView.as_view(), name='skills-list'),
    path('user/company/update/', CompanyUpdateAPIView.as_view(), name='company-update'),
    path('jobs/create/', JobCreateAPIView.as_view(), name='job-create'),
    path('jobs/update/<int:pk>', JobUpdateAPIView.as_view(), name='job-create'),
    path('jobs/<int:pk>/applicants/', ApplicantListAPIView.as_view(), name='applicant-list-api'),
    # path('company/applicants/', CompanyApplicantAPI.as_view(), name='company-applicants-api'),
    path('created-jobs/', CreatedJobsAPIView.as_view(), name='created-jobs-api'),
    # path('change-password/', ChangePasswordView.as_view(), name='change-password-api'),
    # path('', include(router.urls)),
    path('jobs/<int:pk>/applicants/', ApplicantListAPIView.as_view(), name='job_applicant_list'),
]