from django import forms
from django.core import validators

from forms_demo.validators import starts_with_upper_letter, only_letters_and_digits


class UserForm(forms.Form):
    name = forms.CharField(
        validators=[
            starts_with_upper_letter,
            validators.MinLengthValidator(6),
        ],
    )
    age = forms.IntegerField(
        widget=forms.NumberInput,
        validators=[
            validators.MinValueValidator(0, "The age cannot be less than zero."),
        ],
    )
    email = forms.EmailField(
        widget=forms.EmailInput,
        error_messages={"invalid": "Enter a valid email."},
    )
    password = forms.CharField(
        widget=forms.PasswordInput,
        validators=[
            validators.MinLengthValidator(8, "Enter a valid password."),
            only_letters_and_digits,
        ],
    )
    text = forms.CharField(widget=forms.Textarea)
    bot_catcher = forms.CharField(
        required=False,
        widget=forms.HiddenInput,
        validators=[
            validators.MaxLengthValidator(0, "This form was created by a bot"),
        ],
    )
