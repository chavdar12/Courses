from django.contrib.auth import login, logout
from django.contrib.auth.models import Group
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from pythons_app.decorators import group_required
from pythons_app.forms import PythonCreateForm, RegisterForm, LoginForm
from pythons_app.models import Python, Profile


def index(request):
    context = {
        'pythons': Python.objects.all(),
    }
    return render(request, 'index.html', context)


@group_required(['User'])
def create(request):
    form = PythonCreateForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('index')

    context = {
        'form': form,
    }
    return render(request, 'create.html', context)


def register_view(request):
    form = RegisterForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.save()
        user.groups.add(Group.objects.get(name='User'))
        Profile.objects.create(user=user)
        login(request, user)
        return redirect('index')

    context = {
        'form': form,
    }
    return render(request, 'register.html', context)


def login_view(request):
    form = LoginForm(request, request.POST or None)
    if request.method == 'POST' and form.is_valid():
        login(request, form.user)
        return redirect('index')

    context = {
        'form': form,
    }
    return render(request, 'login.html', context)


@require_POST
def logout_view(request):
    logout(request)
    return redirect('index')
