from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'JobsPy.accounts'

    def ready(self):
        import JobsPy.accounts.signals
