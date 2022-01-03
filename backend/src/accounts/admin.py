from django.contrib import admin

from src.accounts import models


admin.site.register(models.UserAccount)
admin.site.register(models.UserProfile)