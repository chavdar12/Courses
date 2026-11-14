from django import forms

from news.models import Source, Article


class BootstrapFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs['class'] = 'form-control'


class SourceForm(BootstrapFormMixin, forms.ModelForm):
    class Meta:
        model = Source
        fields = '__all__'


class ArticleForm(BootstrapFormMixin, forms.ModelForm):
    class Meta:
        model = Article
        fields = '__all__'
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4}),
        }
