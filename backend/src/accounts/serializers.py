from django.contrib.auth import get_user_model

from djoser.serializers import UserCreateSerializer

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


