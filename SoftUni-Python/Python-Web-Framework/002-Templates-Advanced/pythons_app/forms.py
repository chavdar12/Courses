from django import forms

from pythons_app.models import Python


class PythonCreateForm(forms.ModelForm):
    class Meta:
        model = Python
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "description": forms.Textarea(attrs={"class": "form-control", "rows": "3"}),
            "image": forms.URLInput(attrs={"class": "form-control"}),
        }
