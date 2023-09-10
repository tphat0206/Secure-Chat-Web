from django.contrib import admin
from .models import Conversation, GroupMember, Message

admin.site.register(Conversation)
admin.site.register(GroupMember)
admin.site.register(Message)

