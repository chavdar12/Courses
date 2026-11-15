from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from pets.models import Pet, Like


def pet_all(request):
    context = {
        "pets": Pet.objects.all(),
    }
    return render(request, "pets/pet_list.html", context)


def pet_detail(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    context = {
        "pet": pet,
        "likes_count": pet.like_set.count(),
    }
    return render(request, "pets/pet_detail.html", context)


@require_POST
def like_pet(request, pk):
    Like.objects.create(pet=get_object_or_404(Pet, pk=pk))
    return redirect("pet-details", pk)
