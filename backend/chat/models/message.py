from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator
from django.db import models

from account.models import Account
from account.models import BaseModel
from chat.models.conversation import Conversation
from chat.models.group_member import GroupMember


class Message(BaseModel):
    is_unsent = models.BooleanField(default=False)
    is_remove = models.BooleanField(default=False)
    content = models.TextField()
    from_member = models.ForeignKey(GroupMember, related_name='messages',on_delete=models.CASCADE)
    group_chat = models.ForeignKey(Conversation, related_name='messages',on_delete=models.CASCADE)

    def __str__(self):
        return self.name
