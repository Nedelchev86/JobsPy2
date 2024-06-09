from cloudinary.models import CloudinaryField
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models
from JobsPy.core.validators import validate_phone_number, validate_start_with_upper

from JobsPy.main.models import Seniority, Skills

UserModel = get_user_model()

GENDER_TYPE = (
    ('Male', "Male"),
    ('Female', "Female"),
)



class JobSeeker(models.Model):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=50, blank=False, null=False, validators=[validate_start_with_upper], verbose_name="First Name")
    last_name = models.CharField(max_length=50, blank=False, null=False, validators=[validate_start_with_upper])
    city = models.CharField(max_length=50, blank=False, null=False)
    nationality = models.CharField(max_length=50, blank=False, null=False)
    occupation = models.CharField(max_length=50, blank=False, null=False)
    seniority = models.ForeignKey(Seniority, on_delete=models.DO_NOTHING, blank=True, null=True)
    website = models.URLField(max_length=70, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True, max_length=50)
    facebook = models.URLField(blank=True, null=True, max_length=50)
    github = models.URLField(blank=True, null=True, max_length=50)
    about = models.TextField(blank=False, null=False)
    phone_number = models.CharField(max_length=50, blank=True, null=True, validators=[validate_phone_number])
    # profile_picture = models.ImageField(
    #     blank=True, null=True, upload_to='images/profile')
    profile_picture = CloudinaryField('image', blank=True, null=True)
    gender = models.CharField(blank=False, null=False,
                              choices=GENDER_TYPE, max_length=6)
    skills = models.ManyToManyField(Skills, related_name="skills")
    activated = models.BooleanField(default=False)

    # @property
    # def get_user_all_applicant(self):
    #     return Applicant.objects.filter(user=self.user).count()
    #
    # def __str__(self):
    #     if self.first_name and self.last_name:
    #         return f"{self.first_name} {self.last_name}"
    #     else:
    #         return str(self.user)

    class Meta:
        ordering = ['-pk']


class Education(models.Model):

    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, related_name='educations')
    image = CloudinaryField('image', blank=True, null=True)
    institution = models.CharField(max_length=100)
    description = models.TextField(blank=False, null=False)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)

    def clean(self):
        super().clean()
        if self.start_date and self.end_date and self.start_date > self.end_date:
            raise ValidationError({'start_date': 'Start date cannot be after end date.'})

    def __str__(self):
        return self.institution


class Experience(models.Model):
    job_seeker = models.ForeignKey(JobSeeker, on_delete=models.CASCADE, related_name='experience')
    image = CloudinaryField('image', blank=True, null=True)
    company = models.CharField(max_length=100)
    description = models.TextField(blank=False, null=False)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)

    def clean(self):

        super().clean()
        if self.start_date and self.end_date and self.start_date > self.end_date:
            raise ValidationError({'start_date': 'Start date cannot be after end date.'})

    def __str__(self):
        return self.company
