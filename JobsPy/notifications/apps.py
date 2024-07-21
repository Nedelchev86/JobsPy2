from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'JobsPy.notifications'

    def ready(self):
        import JobsPy.notifications.signals


