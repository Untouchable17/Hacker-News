from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    """ Кастомный менеджер создания нового пользователя """

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """ Модель пользователя """

    email = models.EmailField(unique=True, max_length=255, verbose_name="Почта пользователя")
    name = models.CharField(max_length=75, verbose_name="Имя пользователя")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        """ Получение полного имени юзера """
        return f"{self.name}"

    def get_short_name(self):
        """ Получение имени юзера """
        return f"{self.name}"

    def __str__(self):
        return f"{self.email}"

