from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect, get_object_or_404

from accounts.forms import SignUpForm, ProfilePictureForm
from accounts.models import UserProfile


@login_required
def user_profile(request, pk):
    profile = get_object_or_404(UserProfile, pk=pk)
    form = ProfilePictureForm(request.POST or None, request.FILES or None, instance=profile)
    if request.method == 'POST':
        if profile.user != request.user:
            raise PermissionDenied
        if form.is_valid():
            form.save()
            return redirect('user profile', pk)

    context = {
        'profile': profile,
        'pets': profile.pet_set.all(),
        'form': form,
    }
    return render(request, 'accounts/user_profile.html', context)


def signup(request):
    form = SignUpForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = form.save()
        login(request, user)
        return redirect('list pets')

    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)
