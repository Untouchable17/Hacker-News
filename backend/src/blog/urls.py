from django.urls import path

from src.blog import views

urlpatterns = [
    path('', views.ArticleAPIView.as_view(
        {'get': 'list', 'post': 'create'}
    )),
    path('<int:pk>/', views.ArticleAPIView.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}
    )),
]