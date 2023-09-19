from rest_framework import serializers
from chat.pusher import pusher_client
from chat.models import Message, Conversation, GroupMember
from django.db.models import Q

class MessageSerializer(serializers.ModelSerializer):
    is_owned = serializers.SerializerMethodField()
    from_member = serializers.CharField(source='from_member.nick_name')

    def get_is_owned(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.from_member.account == user
        return False

    class Meta:
        model = Message
        exclude = ['to_member']


class SendMessageSerializer(serializers.Serializer):
    content = serializers.CharField()
    conversation = serializers.CharField()

    def validate_conversation(self, data):
        conversation = Conversation.objects.filter(uuid=data)
        user = self.context.get('request').user
        if not conversation.exists():
            raise serializers.ValidationError('conversation does not existed')
        if not conversation.filter(group_members__account=user).exists():
            raise serializers.ValidationError('Permission denied')
        return conversation[0]

    def create(self, **kwargs):
        from_member = GroupMember.objects.filter(account=self.context.get('request').user)[0]
        message = Message.objects.create(content=self.validated_data['content'],
                                         conversation=self.validated_data['conversation'],
                                         from_member=from_member)
        group_member = GroupMember.objects.filter(conversation=self.validated_data['conversation'])\
                                          .filter(~Q(account=self.context.get('request').user))

        for member in group_member:
            pusher_client.trigger('chat_app', str(member.account.uuid), {
                'is_unsent': message.is_unsent,
                'is_removed': message.is_removed,
                'is_system_message': message.is_system_message,
                'uuid': str(message.uuid),
                'content': message.content,
                'conversation': str(message.conversation.uuid),
                'created_at': str(message.created_at),
                'updated_at': str(message.updated_at),
                'is_owned': False,
                'conversation_name': message.conversation.name,
                'from_member': message.from_member.nick_name,
            })

        return message

