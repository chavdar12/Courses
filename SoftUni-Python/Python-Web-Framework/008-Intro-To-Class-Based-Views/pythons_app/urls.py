from django.urls import path

from pythons_app import views

urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    path("create/", views.CreatePythonView.as_view(), name="create"),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
]
