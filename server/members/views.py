from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny


class userview(APIView):
    """
    userview \n
    This view provides the caller with the relavent information to populate the profile page
    """
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        pass


class login(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):

        pass


class register(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        pass




