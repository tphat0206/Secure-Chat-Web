from rest_framework import serializers

from chat.models import Message, Conversation, GroupMember


class MessageSerializer(serializers.ModelSerializer):
    is_owned = serializers.SerializerMethodField()
    from_member = serializers.CharField(source='from_member.nick_name')

    def get_is_owned(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return Message.objects.filter(from_member__account=user).exists()
        return False

    class Meta:
        model = Message
        fields = '__all__'


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
        return conversation

    def create(self, **kwargs):
        from_member = GroupMember.objects.filter(account=self.context.get('request').user)[0]
        message = Message.objects.create(content=self.validated_data['content'],
                                         conversation_id=self.validated_data['conversation'],
                                         from_member=from_member)

        return message

