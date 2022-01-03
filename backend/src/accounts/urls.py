from django.urls import path


from src.accounts import views

urlpatterns = [
    path('<int:pk>/', views.ProfileView.as_view()),
    path('<int:pk>/update/', views.UserView.as_view()),

]