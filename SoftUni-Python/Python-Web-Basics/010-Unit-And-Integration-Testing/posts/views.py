from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST

from posts.forms import PostForm
from posts.models import Post


def index(request):
    context = {
        "posts": Post.objects.all(),
    }
    return render(request, "posts/index.html", context)


def create(request):
    return persist(request, Post(), "create")


def edit(request, pk):
    return persist(request, get_object_or_404(Post, pk=pk), "edit")


def persist(request, post, template_name):
    if request.method == "GET":
        form = PostForm(instance=post)
    else:
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect("index")

    context = {
        "form": form,
    }
    return render(request, f"posts/{template_name}.html", context)


@require_POST
def delete(request, pk):
    get_object_or_404(Post, pk=pk).delete()
    return redirect("index")


@require_POST
def found(request, pk):
    Post.objects.filter(pk=pk).update(is_found=True)
    return redirect("index")
