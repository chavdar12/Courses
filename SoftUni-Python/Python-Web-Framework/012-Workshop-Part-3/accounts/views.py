from django.contrib.auth import login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, UpdateView

from accounts.forms import SignUpForm, ProfilePictureForm
from accounts.models import UserProfile


class UserProfileView(LoginRequiredMixin, UpdateView):
    model = UserProfile
    form_class = ProfilePictureForm
    context_object_name = 'profile'
    template_name = 'accounts/user_profile.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['pets'] = self.object.pet_set.all()
        return context

    def post(self, request, *args, **kwargs):
        # anyone may view a profile, only the owner may change it
        if self.get_object().user != request.user:
            raise PermissionDenied
        return super().post(request, *args, **kwargs)

    def get_success_url(self):
        return reverse('user profile', args=[self.object.pk])


class SignUpView(CreateView):
    form_class = SignUpForm
    template_name = 'accounts/signup.html'
    success_url = reverse_lazy('list pets')

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        return response
