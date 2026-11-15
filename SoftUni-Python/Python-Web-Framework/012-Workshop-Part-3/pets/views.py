from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.views import View
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from common.forms import CommentForm
from pets.forms import PetForm
from pets.mixins import OwnerRequiredMixin
from pets.models import Pet, Like


class PetListView(LoginRequiredMixin, ListView):
    model = Pet
    context_object_name = "pets"
    template_name = "pets/pet_list.html"


class PetDetailView(LoginRequiredMixin, DetailView):
    model = Pet
    template_name = "pets/pet_detail.html"

    def get_context_data(self, comment_form=None, **kwargs):
        context = super().get_context_data(**kwargs)
        profile = self.request.user.userprofile
        is_owner = self.object.user == profile
        context.update(
            {
                "comments": self.object.comment_set.all(),
                "comment_form": None if is_owner else comment_form or CommentForm(),
                "is_owner": is_owner,
                "is_liked": self.object.like_set.filter(user=profile).exists(),
            }
        )
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        if self.object.user == request.user.userprofile:
            raise PermissionDenied

        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.pet = self.object
            comment.user = request.user.userprofile
            comment.save()
            return redirect("pet details", self.object.pk)
        return self.render_to_response(self.get_context_data(comment_form=form))


class LikePetView(LoginRequiredMixin, View):
    def post(self, request, pk):
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


class CreatePetView(LoginRequiredMixin, CreateView):
    form_class = PetForm
    template_name = "pets/pet_create.html"
    success_url = reverse_lazy("list pets")

    def form_valid(self, form):
        form.instance.user = self.request.user.userprofile
        return super().form_valid(form)


class EditPetView(OwnerRequiredMixin, UpdateView):
    model = Pet
    form_class = PetForm
    template_name = "pets/pet_edit.html"

    def get_success_url(self):
        return reverse("pet details", args=[self.object.pk])


class DeletePetView(OwnerRequiredMixin, DeleteView):
    model = Pet
    template_name = "pets/pet_delete.html"
    success_url = reverse_lazy("list pets")
