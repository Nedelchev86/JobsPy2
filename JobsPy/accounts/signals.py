from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from JobsPy.company.models import CompanyProfile
from JobsPy.jobseekers.models import JobSeeker
from django.dispatch import receiver
# from allauth.account.signals import user_logged_in
from django.shortcuts import redirect

userModel = get_user_model()


@receiver(post_save, sender=userModel)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'jobseeker':
            JobSeeker.objects.create(user=instance)
        elif instance.role == 'company':
            CompanyProfile.objects.create(user=instance)


# @receiver(user_logged_in)
# def handle_user_logged_in(sender, request, user, **kwargs):
#     # Check if the user's role is already set
#
#     if not user.role:
#         # user.role = 'jobseeker'
#         # user.save()
#
#         # Redirect the user to select their role
#         return redirect('select_role')
