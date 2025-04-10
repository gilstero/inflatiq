from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializer import *


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

        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)


class register(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)





