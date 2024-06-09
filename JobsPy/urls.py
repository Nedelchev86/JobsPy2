
from django.contrib import admin
from django.urls import path
from JobsPy.accounts.views import MyTokenObtainPairView, MyTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint to obtain JWT token
    path('token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
]
