from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response

from src.accounts import models
from src.accounts import serializers


class ProfileView(APIView):
    """ Просмотр профиля """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        profile = models.UserProfile.objects.get(id=pk)
        serializer = serializers.ProfileSerializer(profile)

        return Response(serializer.data)


class UserView(APIView):
    """ Редактирование профиля """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        profile = models.UserProfile.objects.get(id=pk)
        serializer = serializers.UserSerializer(profile)

        return Response(serializer.data)

    def post(self, request, pk):
        serializer = serializers.UserSerializer(
            data=request.data, instance=request.user.profile
        )
        if serializer.is_valid():
            serializer.save()
        return Response(status=201)