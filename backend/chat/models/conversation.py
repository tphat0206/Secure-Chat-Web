from django.db import models

from account.models import BaseModel


class Conversation(BaseModel):
    name = models.CharField(max_length=250)
    invite_code = models.CharField(max_length=6)

    def __str__(self):
        return self.name

    # def save(self):
    #     pass
