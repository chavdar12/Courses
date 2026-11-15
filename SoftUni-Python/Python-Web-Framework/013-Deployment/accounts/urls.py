from django.urls import path, include

from accounts.views import UserProfileView, SignUpView

urlpatterns = [
    path("", include("django.contrib.auth.urls")),
    path("profile/<int:pk>", UserProfileView.as_view(), name="user profile"),
    path("signup", SignUpView.as_view(), name="signup"),
]
