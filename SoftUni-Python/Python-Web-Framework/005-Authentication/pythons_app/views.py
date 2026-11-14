from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from pythons_app.decorators import group_required
from pythons_app.forms import PythonCreateForm
from pythons_app.models import Python


def index(request):
    context = {
        'pythons': Python.objects.all(),
    }
    return render(request, 'index.html', context)


@group_required(['User'])
def create(request):
    if request.method == 'GET':
        context = {
            'form': PythonCreateForm(),
        }
        return render(request, 'create.html', context)

    form = PythonCreateForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
        return redirect('index')

    context = {
        'form': form,
    }
    return render(request, 'create.html', context)


def login_view(request):
    if request.method == 'GET':
        return render(request, 'login.html')

    user = authenticate(request, username=request.POST.get('username'), password=request.POST.get('password'))
    if user:
        login(request, user)
        return redirect('index')

    context = {
        'error': 'Invalid username or password',
    }
    return render(request, 'login.html', context)


@require_POST
def logout_view(request):
    logout(request)
    return redirect('index')
