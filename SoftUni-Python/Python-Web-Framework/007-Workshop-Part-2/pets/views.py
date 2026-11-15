from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from common.forms import CommentForm
from pets.forms import PetForm
from pets.models import Pet, Like


def get_own_pet(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    if pet.user.user != request.user:
        raise PermissionDenied
    return pet


@login_required
def pet_all(request):
    context = {
        "pets": Pet.objects.all(),
    }
    return render(request, "pets/pet_list.html", context)


@login_required
def pet_detail(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    profile = request.user.userprofile
    is_owner = pet.user == profile
    form = CommentForm(request.POST or None)
    if request.method == "POST":
        if is_owner:
            raise PermissionDenied
        if form.is_valid():
            comment = form.save(commit=False)
            comment.pet = pet
            comment.user = profile
            comment.save()
            return redirect("pet details", pk)

    context = {
        "pet": pet,
        "comments": pet.comment_set.all(),
        "comment_form": None if is_owner else form,
        "is_owner": is_owner,
        "is_liked": pet.like_set.filter(user=profile).exists(),
    }
    return render(request, "pets/pet_detail.html", context)


@login_required
@require_POST
def like_pet(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    profile = request.user.userprofile
    if pet.user == profile:
        raise PermissionDenied

    like = pet.like_set.filter(user=profile).first()
    if like:
        like.delete()
    else:
        Like.objects.create(pet=pet, user=profile)
    return redirect("pet details", pk)


@login_required
def create_pet(request):
    form = PetForm(request.POST or None, request.FILES or None)
    if request.method == "POST" and form.is_valid():
        pet = form.save(commit=False)
        pet.user = request.user.userprofile
        pet.save()
        return redirect("list pets")

    context = {
        "form": form,
    }
    return render(request, "pets/pet_create.html", context)


@login_required
def edit_pet(request, pk):
    pet = get_own_pet(request, pk)
    form = PetForm(request.POST or None, request.FILES or None, instance=pet)
    if request.method == "POST" and form.is_valid():
        form.save()
        return redirect("pet details", pk)

    context = {
        "form": form,
        "pet": pet,
    }
    return render(request, "pets/pet_edit.html", context)


@login_required
def delete_pet(request, pk):
    pet = get_own_pet(request, pk)
    if request.method == "POST":
        pet.delete()
        return redirect("list pets")

    context = {
        "pet": pet,
    }
    return render(request, "pets/pet_delete.html", context)
