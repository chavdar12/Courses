from django.contrib.auth import login, logout
from django.contrib.auth.models import Group
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.decorators.http import require_POST
from django.views.generic import ListView
from django.views.generic.edit import FormView, CreateView

from pythons_app.forms import PythonCreateForm, RegisterForm, LoginForm
from pythons_app.mixins import GroupRequiredMixin
from pythons_app.models import Python, Profile


class IndexView(ListView):
    context_object_name = 'pythons'
    model = Python
    template_name = 'index.html'


class CreatePythonView(GroupRequiredMixin, FormView):
    template_name = 'create.html'
    form_class = PythonCreateForm
    success_url = reverse_lazy('index')
    group_required = ['User']

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


class RegisterView(CreateView):
    form_class = RegisterForm
    success_url = reverse_lazy('index')
    template_name = 'register.html'

    def form_valid(self, form):
        response = super().form_valid(form)
        self.object.groups.add(Group.objects.get(name='User'))
        Profile.objects.create(user=self.object)
        login(self.request, self.object)
        return response


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
