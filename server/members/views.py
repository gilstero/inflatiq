from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class userview(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):

        pass

