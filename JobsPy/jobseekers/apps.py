from django.apps import AppConfig


class JobseekersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'JobsPy.jobseekers'

    def ready(self):
        import JobsPy.jobseekers.signals
