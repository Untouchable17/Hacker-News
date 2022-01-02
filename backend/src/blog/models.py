from django.db import models


class Article(models.Model):

    title = models.CharField(max_length=255, verbose_name="Заголовок блога")
    body = models.TextField(verbose_name="Тело блога")
    private = models.BooleanField(default=True, verbose_name="Виден всем")

    def __str__(self):
        return f"{self.title}"