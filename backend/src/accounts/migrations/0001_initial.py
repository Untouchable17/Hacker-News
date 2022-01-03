# Generated by Django 4.0 on 2022-01-03 17:25

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import src.base.services


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='Почта пользователя')),
                ('name', models.CharField(max_length=75, verbose_name='Имя пользователя')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=75, null=True, verbose_name='Имя пользователя')),
                ('last_name', models.CharField(blank=True, max_length=75, null=True, verbose_name='Фамилия пользователя')),
                ('city', models.CharField(blank=True, max_length=75, null=True, verbose_name='Город пользователя')),
                ('quote', models.CharField(blank=True, max_length=255, null=True, verbose_name='Цитата пользователя')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to=src.base.services.get_path_upload_avatar, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg']), src.base.services.validate_size_image], verbose_name='Аватар пользователя')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='accounts.useraccount', verbose_name='Профиль пользователя')),
            ],
        ),
    ]
