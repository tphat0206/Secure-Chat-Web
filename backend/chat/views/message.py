from rest_framework.response import Response
from rest_framework.views import APIView

from chat.pusher import pusher_client


class MessageAPIView(APIView):

    def post(self, request):
        print(request.data['username'])
        pusher_client.trigger('chat', 'message', {
            'username': request.data['username'],
            'message': request.data['message'],
        })

        return Response([])