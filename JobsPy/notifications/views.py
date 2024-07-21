from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from JobsPy.notifications.models import Notification
from JobsPy.notifications.serializer import NotificationSerializer


# Create your views here.
class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = not notification.is_read
        notification.save()
        return Response({'status': 'notification read status updated'})