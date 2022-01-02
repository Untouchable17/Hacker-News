from rest_framework import viewsets
from rest_framework import permissions

from src.base.permissions import IsAuthor
from src.blog import serializers
from src.blog import models


class ArticleAPIView(viewsets.ModelViewSet):

    serializer_class = serializers.ArticleSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return models.Article.objects.filter(private=True)

    def perform_create(self, serializer):
        serializer.save()



