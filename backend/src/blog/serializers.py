from rest_framework import serializers

from src.blog import models


class ArticleSerializer(serializers.ModelSerializer):
    """ Сериализация модели блога """

    class Meta:
        model = models.Article
        fields = (
            'id',
            'title',
            'body',
            'private'
        )


