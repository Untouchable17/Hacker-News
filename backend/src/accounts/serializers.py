from django.contrib.auth import get_user_model

from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from src.accounts.models import UserProfile


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    """ Сериализация модели создания нового пользователя """

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'name',
            'email',
            'password'
        )


class ProfileSerializer(serializers.ModelSerializer):
    """ Сериализация модели профиля пользователя """

    class Meta:
        model = UserProfile
        fields = (
            "id",
            "avatar",
            "first_name",
            "last_name",
            "city",
            "quote",
        )


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = (
            "avatar",
            "first_name",
            "last_name",
            "city",
            "quote",
        )
