from django.urls import path
from rest_framework.routers import SimpleRouter

from chat.views.message import MessageAPIView

urlpatterns = [
    path('messages', MessageAPIView.as_view())
]
