from account.models import BaseModel, Account
from django.db import models


class UserKey(BaseModel):
    secret = models.CharField()
    public = models.CharField()
    account = models.ForeignKey(Account, related_name='user_keys', on_delete=models.CASCADE)
