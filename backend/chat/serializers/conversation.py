import secrets
import string

from django.db.models import F, Case, When, Value
from rest_framework import serializers

from chat.models import Conversation, GroupMember, Message
from chat.serializers.group_member import GroupMemberSerializer
from chat.serializers.message import MessageSerializer


class ConversationSerializer(serializers.ModelSerializer):
    group_members = GroupMemberSerializer(many=True)
    messages = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['uuid', 'name', 'invite_code', 'group_members', 'messages']


class BaseConversationSerializer(serializers.Serializer):
    conversation_uuid = serializers.CharField()
    from_member_name = serializers.CharField()
    name = serializers.CharField()
    created_at = serializers.DateTimeField()
    is_message_owner = serializers.BooleanField()


class CreateConversationSerializer(serializers.Serializer):
    name = serializers.CharField()

    def generate_random_code(self, length):
        # Generate random digits and number
        alphabet = string.ascii_uppercase + string.digits
        return ''.join(secrets.choice(alphabet) for i in range(length))

    def create(self):
        user = self.context.get('request').user
        list_invite_code = Conversation.objects.all().values_list('invite_code', flat=True)
        random_code = self.generate_random_code(6)
        while random_code in list_invite_code:
            random_code = self.generate_random_code(6)

        conversation = Conversation.objects.create(name=self.validated_data['name'],
                                                   invite_code=random_code, )
        leader = GroupMember.objects.create(nick_name=user.username, account=user,
                                            is_lead=True, conversation=conversation)
        return conversation


class JoinConversationSerializer(serializers.Serializer):
    invite_code = serializers.CharField()

    def validate_invite_code(self, invite_code):
        user = self.context.get('request').user
        conversation = Conversation.objects.filter(invite_code__exact=invite_code)
        if not conversation.exists():
            raise serializers.ValidationError('Invalid code')
        if conversation.filter(group_members__account=user).exists():
            raise serializers.ValidationError('You are already in conversation')

        return invite_code

    def create(self, **kwargs):
        user = self.context.get('request').user
        conversation = Conversation.objects.filter(invite_code__exact=self.validated_data['invite_code'])[0]

        member = GroupMember.objects.create(nick_name=user.username, account=user, conversation=conversation)
        return conversation
