from django.shortcuts import render, redirect, get_object_or_404

from common.forms import CommentForm
from pets.forms import PetForm
from pets.models import Pet, Like


def pet_all(request):
    context = {
        'pets': Pet.objects.all(),
    }
    return render(request, 'pets/pet_list.html', context)


def pet_detail(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    form = CommentForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        comment = form.save(commit=False)
        comment.pet = pet
        comment.save()
        return redirect('pet details', pk)

    context = {
        'pet': pet,
        'comments': pet.comment_set.all(),
        'comment_form': form,
    }
    return render(request, 'pets/pet_detail.html', context)


def like_pet(request, pk):
    Like.objects.create(pet=get_object_or_404(Pet, pk=pk))
    return redirect('pet details', pk)


def create_pet(request):
    form = PetForm(request.POST or None, request.FILES or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('list pets')

    context = {
        'form': form,
    }
    return render(request, 'pets/pet_create.html', context)


def edit_pet(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    form = PetForm(request.POST or None, request.FILES or None, instance=pet)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('pet details', pk)

    context = {
        'form': form,
        'pet': pet,
    }
    return render(request, 'pets/pet_edit.html', context)


def delete_pet(request, pk):
    pet = get_object_or_404(Pet, pk=pk)
    if request.method == 'POST':
        pet.delete()
        return redirect('list pets')

    context = {
        'pet': pet,
    }
    return render(request, 'pets/pet_delete.html', context)
