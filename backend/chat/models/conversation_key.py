from account.models import BaseModel, Account
from django.db import models

from chat.models import Conversation


class ConversationKey(BaseModel):
    key = models.CharField()
    conversation = models.ForeignKey(Conversation, related_name='conversation_keys', on_delete=models.CASCADE)
