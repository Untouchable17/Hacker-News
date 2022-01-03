from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response


from src.accounts import models
from src.accounts import serializers


class ProfileView(APIView):

    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        profile = models.UserProfile.objects.get(id=pk)
        serializer = serializers.ProfileSerializer(profile)

        return Response(serializer.data)
