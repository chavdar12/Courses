from django import forms

from pets.models import Pet


class CreatePetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ('type', 'name', 'age', 'description', 'image_url')
        widgets = {
            'type': forms.Select(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'age': forms.NumberInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control rounded-2'}),
            'image_url': forms.URLInput(attrs={'class': 'form-control'}),
        }
