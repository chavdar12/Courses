from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from todos_app.forms import TodoForm
from todos_app.models import ToDo


def index(request, form=None, pk=None):
    context = {
        "todos": ToDo.objects.all().order_by("title"),
        "todo_form": form or TodoForm(),
        "pk": pk,
    }
    return render(request, "todos_app/index.html", context)


@require_POST
def create_task(request):
    form = TodoForm(request.POST)
    if form.is_valid():
        form.save()
        return redirect("todo index")
    return index(request, form)


def edit_task(request, pk):
    todo = ToDo.objects.get(pk=pk)
    if request.method == "GET":
        return index(request, TodoForm(instance=todo), pk)

    form = TodoForm(request.POST, instance=todo)
    if form.is_valid():
        form.save()
        return redirect("todo index")
    return index(request, form, pk)


@require_POST
def do_task(request, pk):
    todo = ToDo.objects.get(pk=pk)
    todo.is_done = not todo.is_done
    todo.save()
    return redirect("todo index")


@require_POST
def delete_task(request, pk):
    ToDo.objects.filter(pk=pk).delete()
    return redirect("todo index")
