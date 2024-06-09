from django.apps import AppConfig


class CompanyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'JobsPy.company'

    def ready(self):
        import JobsPy.company.signals
