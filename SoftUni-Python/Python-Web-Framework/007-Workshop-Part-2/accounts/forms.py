from django import forms
from django.contrib.auth.forms import UserCreationForm

from accounts.models import UserProfile


class SignUpForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs["class"] = "form-control"


class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ("profile_picture",)
        widgets = {
            "profile_picture": forms.FileInput(attrs={"class": "form-control-file"}),
        }
