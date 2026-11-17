from django import forms

from todos_app.models import ToDo


class TodoForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for _, field in self.fields.items():
            field.widget.attrs["class"] = "form-control"

    class Meta:
        model = ToDo
        fields = ("title", "description")
