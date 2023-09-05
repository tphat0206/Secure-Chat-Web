from django.db import models


class Conversation(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name
