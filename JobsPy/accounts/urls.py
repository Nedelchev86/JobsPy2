from django.urls import path

from JobsPy.accounts.views import UserRegistrationAPIView, UserProfileView

urlpatterns = [
    path('', UserProfileView.as_view(), name='user-profile'),
    # path('user/jobseeker/update/', JobSeekerUpdateAPIView.as_view(), name='jobseeker-update'),
    # path('user/jobseeker/favorites/', FavoriteJobsListAPIView.as_view(), name='favorite_jobs_list'),
]
