# Generated by Django 5.0.6 on 2024-06-09 11:20

import JobsPy.core.validators
import cloudinary.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobSeeker',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('first_name', models.CharField(max_length=50, validators=[JobsPy.core.validators.validate_start_with_upper], verbose_name='First Name')),
                ('last_name', models.CharField(max_length=50, validators=[JobsPy.core.validators.validate_start_with_upper])),
                ('city', models.CharField(max_length=50)),
                ('nationality', models.CharField(max_length=50)),
                ('occupation', models.CharField(max_length=50)),
                ('website', models.URLField(blank=True, max_length=70, null=True)),
                ('linkedin', models.URLField(blank=True, max_length=50, null=True)),
                ('facebook', models.URLField(blank=True, max_length=50, null=True)),
                ('github', models.URLField(blank=True, max_length=50, null=True)),
                ('about', models.TextField()),
                ('phone_number', models.CharField(blank=True, max_length=50, null=True, validators=[JobsPy.core.validators.validate_phone_number])),
                ('profile_picture', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image')),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=6)),
                ('activated', models.BooleanField(default=False)),
                ('seniority', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='main.seniority')),
                ('skills', models.ManyToManyField(related_name='skills', to='main.skills')),
            ],
            options={
                'ordering': ['-pk'],
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image')),
                ('company', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('job_seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experience', to='jobseekers.jobseeker')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image')),
                ('institution', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('job_seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='jobseekers.jobseeker')),
            ],
        ),
    ]
