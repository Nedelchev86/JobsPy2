from django.db.models.signals import post_save
from django.dispatch import receiver

from JobsPy.jobs.models import Applicant
from JobsPy.jobseekers.models import JobSeeker
from JobsPy.notifications.models import NotificationJobSeeker, Notification


@receiver(post_save, sender=Applicant)
def create_notification(sender, instance, created, **kwargs):

    if created:
        job_owner = instance.job.user
        message = f" has applied for the job: "
        job_seeker, created = JobSeeker.objects.get_or_create(user=instance.user)
        Notification.objects.create(
            user=job_owner,
            job=instance.job,
            job_seeker=job_seeker,
            message=message
        )
    else:

        job_seeker, created = JobSeeker.objects.get_or_create(user=instance.user)

        NotificationJobSeeker.objects.create(
            user=instance.user,
            job=instance.job,
            status=instance.status,
            comment=instance.comment,
        )