from django.core.validators import FileExtensionValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.urls import reverse
from django.db.models.signals import post_save
from django.dispatch import receiver

from src.base.services import get_path_upload_avatar, validate_size_image


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

    def create_superuser(self, email, name, password):
        """
        Creates and saves a superuser with the given email, name
        and password.
        """
        user = self.create_user(email,
                                name=name,
                                password=password,
                                )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """ Модель пользователя """

    email = models.EmailField(unique=True, max_length=255, verbose_name="Почта пользователя")
    name = models.CharField(max_length=75, verbose_name="Имя пользователя")
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
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


class UserProfile(models.Model):
    """ Модель профиля пользователя """

    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name="profile", verbose_name="Профиль пользователя")
    first_name = models.CharField(max_length=75, blank=True, null=True, verbose_name="Имя пользователя")
    last_name = models.CharField(max_length=75, blank=True, null=True, verbose_name="Фамилия пользователя")
    city = models.CharField(max_length=75, blank=True, null=True, verbose_name="Город пользователя")
    quote = models.CharField(max_length=255, blank=True, null=True, verbose_name="Цитата пользователя")
    avatar = models.ImageField(
        upload_to=get_path_upload_avatar,
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg']), validate_size_image],
        verbose_name="Аватар пользователя"
    )

    def __str__(self):
        return f"{self.user}"

    def get_absolute_url(self):
        return reverse('profile:profile-view', kwargs={'id': self.pk})

    @property
    def is_authenticated(self):
        """ Возвращает True. Способ, чтобы узнать, был ли пользоваетль аутентифицирован """
        return True


@receiver(post_save, sender=UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=UserAccount)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


