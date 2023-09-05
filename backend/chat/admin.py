from django.contrib import admin
from .models import Conversation, GroupMember


admin.site.register(Conversation)
admin.site.register(GroupMember)

