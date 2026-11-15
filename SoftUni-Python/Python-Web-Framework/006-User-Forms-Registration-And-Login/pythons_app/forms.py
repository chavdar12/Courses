from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm

from pythons_app.models import Python


class BootstrapFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs["class"] = (
                field.widget.attrs.get("class", "") + " form-control"
            ).strip()


class PythonCreateForm(forms.ModelForm):
    class Meta:
        model = Python
        fields = "__all__"
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "description": forms.Textarea(attrs={"class": "form-control", "rows": "3"}),
            "image": forms.FileInput(attrs={"class": "custom-file-input"}),
        }


class RegisterForm(BootstrapFormMixin, UserCreationForm):
    pass


class LoginForm(BootstrapFormMixin, forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user = None
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        self.user = authenticate(
            self.request,
            username=cleaned_data.get("username"),
            password=cleaned_data.get("password"),
        )
        if not self.user:
            raise forms.ValidationError("Invalid username or password")
        return cleaned_data
