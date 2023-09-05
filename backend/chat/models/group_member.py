from django.db import models

from account.models import Account
from account.models import BaseModel
from chat.models.conversation import Conversation


class GroupMember(BaseModel):
    nick_name = models.CharField(max_length=250)
    is_left = models.BooleanField(default=False)
    account = models.ForeignKey(Account, related_name='group_members', on_delete=models.CASCADE)
    conversation = models.ForeignKey(Conversation, related_name='group_members', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
