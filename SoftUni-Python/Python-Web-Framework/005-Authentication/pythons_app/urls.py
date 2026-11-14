from django.urls import path

from pythons_app.views import index, create, login_view, logout_view

urlpatterns = [
    path('', index, name='index'),
    path('create/', create, name='create'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]
