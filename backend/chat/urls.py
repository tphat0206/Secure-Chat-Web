from django.urls import path
from chat.views.conversation import ConversationViewSet
from rest_framework.routers import SimpleRouter

from chat.views.message import MessageViewSet

router = SimpleRouter(trailing_slash=False)
router.register(r'^conversation', ConversationViewSet)
router.register(r'^message', MessageViewSet)

urlpatterns = router.urls
# urlpatterns += [
#     path('messages', MessageAPIView.as_view())
# ]
