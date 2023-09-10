from rest_framework import serializers

from chat.models import GroupMember


class GroupMemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username')

    class Meta:
        model = GroupMember
        fields = ['uuid', 'nick_name', 'username', 'is_lead']


