from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed

from account.models import Account, UserKey


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ['password']


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate_username(self, username):
        if Account.objects.filter(username=username).exists():
            raise serializers.ValidationError('username existed')
        return username

    def save(self, **kwargs):
        account = Account.objects.create_user(
            self.validated_data.get('username'),
            None,
            self.validated_data.get('password')
        )
        keyPair = RSA.generate(2048)

        pubKey = keyPair.publickey()
        pubKeyPEM = pubKey.exportKey('PEM', pkcs=8)

        privKeyPEM = keyPair.exportKey('PEM', pkcs=8)
        userkey = UserKey.objects.create(account=account, public=pubKeyPEM.decode('utf-8'), secret=privKeyPEM.decode('utf-8'))
        return privKeyPEM.decode('utf-8')


class SignInSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    token = serializers.CharField(read_only=True)

    def sign_in(self):
        username = self.validated_data.get('username')
        password = self.validated_data.get('password')

        user = authenticate(request=self.context.get('request'),
                            username=username, password=password)
        if not user:
            raise AuthenticationFailed

        token, created = Token.objects.get_or_create(user=user)
        # public = UserKey.objects.filter(account=user)[0].public
        # print(bytes(public, 'ascii'))
        # encryptor = PKCS1_OAEP.new(RSA.importKey(public))
        # token_encrypted = encryptor.encrypt(bytes(token.key, 'ascii'))

        return user, token.key
        # return user, binascii.hexlify(token_encrypted).decode('utf-8'), public
