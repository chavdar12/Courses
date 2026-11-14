from django.core.exceptions import ValidationError


def starts_with_upper_letter(value):
    if not value[:1].isupper():
        raise ValidationError('The name must start with an uppercase letter.')


def only_letters_and_digits(value):
    if not value.isalnum():
        raise ValidationError('Enter a valid password.')
