from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from chat.models import Message
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

        return Response({'uuid': message.uuid},status=status.HTTP_201_CREATED)