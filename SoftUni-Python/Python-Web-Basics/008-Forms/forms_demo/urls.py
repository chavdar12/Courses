from django.urls import path

from forms_demo.views import index

urlpatterns = [
    path("", index, name="forms index"),
]
