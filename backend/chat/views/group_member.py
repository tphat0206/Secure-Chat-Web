from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from chat.models import Message
from chat.pusher import pusher_client
from chat.serializers.message import MessageSerializer, SendMessageSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        match self.action:
            case 'create':
                return SendMessageSerializer
            case _:
                return MessageSerializer


    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.create()
        pusher_client.trigger(request.data['conversation'], 'message', {
            'username': message.from_member.nick_name,
            'time': str(message.created_at),
            'message': message.content,
            'is_removed': message.is_removed,
        })

        return Response([])