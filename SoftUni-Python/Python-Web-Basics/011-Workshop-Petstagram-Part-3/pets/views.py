from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from common.forms import CommentForm
from common.models import Comment
from pets.forms import CreatePetForm
from pets.models import Pet, Like


def pet_all(request):
    context = {
        "pets": Pet.objects.all(),
    }
    return render(request, "pets/pet_list.html", context)


def pet_detail(request, pk):
    pet = get_object_or_404(Pet, pk=pk)

    if request.method == "GET":
        form = CommentForm()
    else:
        form = CommentForm(request.POST, instance=Comment(pet=pet))
        if form.is_valid():
            form.save()
            return redirect("pet-details", pk)

    context = {
        "pet": pet,
        "likes_count": pet.like_set.count(),
        "comments": pet.comment_set.all(),
        "comment_form": form,
    }
    return render(request, "pets/pet_detail.html", context)


@require_POST
def like_pet(request, pk):
    Like.objects.create(pet=get_object_or_404(Pet, pk=pk))
    return redirect("pet-details", pk)


def pet_create(request):
    if request.method == "GET":
        form = CreatePetForm()
    else:
        form = CreatePetForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("pet-list")

    context = {
        "form": form,
    }
    return render(request, "pets/pet_create.html", context)


def pet_edit(request, pk):
    pet = get_object_or_404(Pet, pk=pk)

    if request.method == "GET":
        form = CreatePetForm(instance=pet)
    else:
        form = CreatePetForm(request.POST, instance=pet)
        if form.is_valid():
            form.save()
            return redirect("pet-details", pk)

    context = {
        "form": form,
        "pet": pet,
    }
    return render(request, "pets/pet_edit.html", context)


def pet_delete(request, pk):
    pet = get_object_or_404(Pet, pk=pk)

    if request.method == "POST":
        pet.delete()
        return redirect("pet-list")

    context = {
        "pet": pet,
    }
    return render(request, "pets/pet_delete.html", context)
