
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from JobsPy.accounts.views import MyTokenObtainPairView, MyTokenRefreshView, UserRegistrationAPIView, UserProfileView, \
    ChangePasswordView
from JobsPy.blog.views import BlogPostListView, BlogPostDetailView, BlogPostCreateView, BlogPostUpdateView, \
    CommentViewSet, CommentListView, LatestBlogPostsView

from JobsPy.company.views import CompanyUpdateAPIView, CreatedJobsAPIView, CompanyProfileViewSet, CompanyApplicantAPI, \
    ChangeStatusAPI, ChangeApplicantStatus, CompanyCountView
from JobsPy.jobs.views import JobsDetailsAPIView, apply_for_job, AddToFavoritesAPIView, RemoveFromFavoritesAPIView, \
    DeleteJobView, JobCreateAPIView, JobUpdateAPIView, ApplicantListAPIView, AllJobsViewApi, ChangeStatusAPIView, \
    JobsByCategoryView, CategoryListView, JobCountView
from JobsPy.jobseekers.views import JobSeekerUpdateAPIView, FavoriteJobsListAPIView, check_favorite_status, \
    JobSeekerViewSet, job_applicants, ApplyedJobsAPIView, UserEducationListAPI, CreateEducationAPI, EditEducationAPI, \
    DeleteEducationAPI, JobseekerCountView, JobseekerDeleteAPIView
from JobsPy.main.views import SkillsListAPIView, SeniorityListView, ContactCreateView
from JobsPy.notifications.views import NotificationViewSet, NotificationJobSeekerViewSet

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint to obtain JWT token
#     path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
#     path('api/user/', include('JobsPy.accounts.urls')),
#     path('api/company/', include('JobsPy.company.urls')),
#     path('api/jobs/', include('JobsPy.jobs.urls')),
#     path('api/jobseeker/', include('JobsPy.jobseekers.urls')),
# ]


router = DefaultRouter()
router.register(r'api/company', CompanyProfileViewSet)
router.register(r'api/jobseekers', JobSeekerViewSet)
router.register(r'api/notifications', NotificationViewSet)
router.register(r'api/notificationjobseekers', NotificationJobSeekerViewSet)
router.register(r'api/blogs/comments', CommentViewSet)
# router.register(r'blogposts', BlogPostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint to obtain JWT token
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationAPIView.as_view(), name='user-registration'),
    # path('blog/', BlogPostListCreateAPIView.as_view(), name='blog-list'),
    path('api/user/', UserProfileView.as_view(), name='user-profile'),
    path('api/jobseekers/update/', JobSeekerUpdateAPIView.as_view(), name='jobseeker-update'),
    path('api/jobseekers/favorites/', FavoriteJobsListAPIView.as_view(), name='favorite_jobs_list'),
    path('api/jobs/', AllJobsViewApi.as_view(), name='all_jobs'),
    path('api/jobs/<int:pk>/', JobsDetailsAPIView.as_view(), name='jobs-details'),
    path('api/jobs/<int:pk>/apply/', apply_for_job, name="apply-job"),
    path('jobs/<int:pk>/applicants/', job_applicants, name='job_applicants'),
    path('api/jobs/<int:pk>/favorite/add/', AddToFavoritesAPIView.as_view(), name='add_to_favorites'),
    path('api/jobs/<int:pk>/favorite/remove/', RemoveFromFavoritesAPIView.as_view(), name='remove_from_favorites'),
    path('api/jobs/<int:pk>/favorite/check/', check_favorite_status, name='check_favorite_status'),
    path('api/jobs/<int:pk>/delete/', DeleteJobView.as_view(), name='delete-job'),
    path('api/jobs/category/<int:id>/', JobsByCategoryView.as_view(), name='jobs-by-category'),
    path('api/jobs/categories/', CategoryListView.as_view(), name='category-list'),
    path('api/skills/', SkillsListAPIView.as_view(), name='skills-list'),
    path('api/seniorities/', SeniorityListView.as_view(), name='seniority-list'),
    path('api/company/update/', CompanyUpdateAPIView.as_view(), name='company-update'),
    path('api/jobs/create/', JobCreateAPIView.as_view(), name='job-create'),
    path('api/jobs/update/<int:pk>', JobUpdateAPIView.as_view(), name='job-create'),
    path('api/jobs/<int:pk>/applicants/', ApplicantListAPIView.as_view(), name='applicant-list-api'),
    path('api/jobs/count/', JobCountView.as_view(), name='job-count'),
    path('api/company/applicants/', CompanyApplicantAPI.as_view(), name='company-applicants-api'),
    path('api/company/applicants/<int:pk>/change-status/', ChangeApplicantStatus.as_view(), name='change_applicant_status'),
    path('api/company/change-status/<int:pk>/', ChangeStatusAPI.as_view(), name='change-status'),
    path('api/company/count/', CompanyCountView.as_view(), name='company-count'),
    path('api/jobseekers/count/', JobseekerCountView.as_view(), name='jobseekers-count'),
    path('api/company/created-jobs/', CreatedJobsAPIView.as_view(), name='created-jobs-api'),
    path('api/user/change-password/', ChangePasswordView.as_view(), name='change-password-api'),
    # path('', include(router.urls)),
    path('', include(router.urls)),
    path('api/jobs/<int:pk>/applicants/', ApplicantListAPIView.as_view(), name='job_applicant_list'),
    path('applicants/<int:pk>/change_status/', ChangeStatusAPIView.as_view(), name='change_status'),
    path('api/jobseekers/applyed/jobs/', ApplyedJobsAPIView.as_view(), name='apply_jobs'),
    path('api/jobseekers/educations/<int:user_id>/', UserEducationListAPI.as_view(), name='user-education-list'),
    path('api/jobseekers/educations/create/', CreateEducationAPI.as_view(), name='create-education'),
    path('api/jobseekers/educations/edit/<int:pk>/', EditEducationAPI.as_view(), name='edit-education'),
    path('api/jobseekers/educations/delete/<int:pk>/', DeleteEducationAPI.as_view(), name='delete-education'),
    path('api/jobseekers/prifile/delete/', JobseekerDeleteAPIView.as_view(), name='delete-profile'),
    path('api/blogs/', BlogPostListView.as_view(), name='blogpost-list'),
    path('api/blogs/<int:pk>/', BlogPostDetailView.as_view(), name='blogpost-detail'),
    path('api/blogs/create/', BlogPostCreateView.as_view(), name='blogpost-create'),
    path('api/blogs/<int:pk>/edit/', BlogPostUpdateView.as_view(), name='blogpost-edit'),
    path('api/blogs/<int:post_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('api/blogs/latest-blog-posts/', LatestBlogPostsView.as_view(), name='latest-blog-posts'),
    path('api/contacts/', ContactCreateView.as_view(), name='contact-create'),

]

