from django.db.models import Prefetch, F, Case, When, Value
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from chat.models import Conversation, GroupMember, Message
from chat.serializers.conversation import ConversationSerializer, BaseConversationSerializer, \
    CreateConversationSerializer, JoinConversationSerializer


class ConversationViewSet(ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = BaseConversationSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        match self.action:
            case 'retrieve':
                return ConversationSerializer
            case 'list':
                return BaseConversationSerializer
            case 'create':
                return CreateConversationSerializer
            case 'join_conversation':
                return JoinConversationSerializer


    def get_queryset(self):
        user = self.request.user
        match self.action:
            case 'retrieve':
                return self.queryset.filter(group_members__account=user, group_members__is_left=False).prefetch_related(
                    Prefetch('group_members', queryset=GroupMember.objects.filter(is_left=False))).prefetch_related(
                    'messages')
            case 'list':
                return Message.objects.all(). \
                    annotate(name=F('conversation__name'),
                             from_member_name=F('from_member__nick_name'),
                             is_message_owner=Case(When(from_member__account=user, then=Value(True)),
                                                   default=Value(False))). \
                    values('name', 'invite_code', 'content', 'from_member_name', 'created_at', 'is_message_owner'). \
                    distinct('invite_code').order_by('invite_code', '-created_at')
            case _:
                return self.queryset

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create()
        return Response([])

    @action(methods=['POST'], detail=False)
    def join_conversation(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        conversation = serializer.create()
        print(conversation)
        serializer = BaseConversationSerializer(data=conversation)
        serializer.is_valid()
        print(serializer.data)

        return Response({
            'uuid': conversation.uuid,
            'name': conversation.name,
        })
