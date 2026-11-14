from django import forms

from pets.models import Pet


class PetForm(forms.ModelForm):
    class Meta:
        model = Pet
        fields = ('type', 'name', 'age', 'description', 'image')
        widgets = {
            'type': forms.Select(attrs={'class': 'form-control'}),
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'age': forms.NumberInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control rounded-2'}),
            'image': forms.FileInput(attrs={'class': 'form-control-file'}),
        }
