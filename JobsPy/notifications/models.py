from django.contrib.auth import get_user_model
from django.db import models

from JobsPy.jobs.models import Job
from JobsPy.jobseekers.models import JobSeeker

UserModel = get_user_model()


class Notification(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, related_name='job_seeker')
    message = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)


class NotificationJobSeeker(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    status = models.CharField(max_length=20)
    comment = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]