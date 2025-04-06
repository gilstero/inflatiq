from rest_framework import serializers
from .models import *
from django.utils import timezone

class UserSerializer(serializers.Serializer):
    pass


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=30, write_only=True)
    profilename = serializers.CharField(max_length=30, required=False, allow_blank=True, allow_null=True)


    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def create(self, validated_data):
        # Create new user
        user = User.objects.create(
            email=validated_data['email'],
            password=validated_data['password'], 
            profilename=validated_data.get('profilename', None),
            creation=timezone.now()
        )
        return user
        
    def to_representation(self, instance):
        return {
            'message': 'registered',
            'id': instance.id,
            'email': instance.email,
            'profilename': instance.profilename,
            'creation': instance.creation
        }