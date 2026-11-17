from django.urls import path

from posts.views import index, create, edit, delete, found

urlpatterns = [
    path("", index, name="index"),
    path("create/", create, name="create post"),
    path("edit/<int:pk>/", edit, name="edit post"),
    path("delete/<int:pk>/", delete, name="delete post"),
    path("found/<int:pk>/", found, name="found post"),
]
