# Cоциальный новостной сайт Hacker News

## Используемый инструментарий

<span>`Django`</span>
<span>`DjangoRestFramework`</span>
<span>`React`</span>
<span>`Redux`</span>

### Процесс установки

1. Создайте виртуальное окружение и активируйте его `python -m venv venv` и `source venv/bin/activate`
2. Скачайте репозиторий `https://github.com/Untouchable17/Hacker-News.git`
3. Установите все зависимости `pip install -r requirements.txt`
4. Создайте миграции в базе данных `python manage.py makemigrations`
5. Примените созданные миграции `python manage.py migrate`
6. Создайте суперпользователя `python manage.py createsuperuser`


### Запуск проекта

1. Запустите серверную часть `python manage.py runserver`
2. Запустите клиентскую часть `npx start`
