import os

from celery import current_app
from django import forms
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views import View

from thumbnailer.tasks import make_thumbnails


class FileUploadForm(forms.Form):
    image_file = forms.ImageField(required=True)


class HomeView(View):
    def get(self, request):
        context = {
            'form': FileUploadForm(),
        }
        return render(request, 'thumbnailer/home.html', context)

    def post(self, request):
        form = FileUploadForm(request.POST, request.FILES)
        if not form.is_valid():
            return render(request, 'thumbnailer/home.html', {'form': form})

        os.makedirs(settings.IMAGES_DIR, exist_ok=True)
        # basename() keeps a crafted upload name from escaping IMAGES_DIR
        file_path = os.path.join(settings.IMAGES_DIR, os.path.basename(form.cleaned_data['image_file'].name))
        with open(file_path, 'wb+') as fp:
            for chunk in form.cleaned_data['image_file'].chunks():
                fp.write(chunk)

        task = make_thumbnails.delay(file_path, thumbnails=[(128, 128)])
        context = {
            'task_id': task.id,
            'task_status': task.status,
        }
        return render(request, 'thumbnailer/home.html', context)


class TaskView(View):
    def get(self, request, task_id):
        task = current_app.AsyncResult(task_id)
        response_data = {
            'task_status': task.status,
            'task_id': task.id,
        }
        if task.status == 'SUCCESS':
            response_data['results'] = task.get()
        return JsonResponse(response_data)
