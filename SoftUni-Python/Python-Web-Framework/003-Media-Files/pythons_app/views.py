from django.shortcuts import render, redirect

from pythons_app.forms import PythonCreateForm
from pythons_app.models import Python


def index(request):
    context = {
        "pythons": Python.objects.all(),
    }
    return render(request, "index.html", context)


def create(request):
    if request.method == "GET":
        context = {
            "form": PythonCreateForm(),
        }
        return render(request, "create.html", context)

    form = PythonCreateForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return redirect("index")

    context = {
        "form": form,
    }
    return render(request, "create.html", context)
