from django.shortcuts import render

from forms_demo.forms import UserForm


def index(request):
    if request.method == 'GET':
        form = UserForm()
    else:
        form = UserForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)

    context = {
        'form': form,
    }
    return render(request, 'forms_demo/index.html', context)
