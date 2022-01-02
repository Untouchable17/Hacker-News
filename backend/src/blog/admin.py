from django.contrib import admin

from src.blog import models


@admin.register(models.Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "private")
    list_editable = ("private", )