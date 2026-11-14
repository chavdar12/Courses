from django.urls import path, include

from accounts.views import user_profile, signup

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('profile/<int:pk>', user_profile, name='user profile'),
    path('signup', signup, name='signup'),
]
