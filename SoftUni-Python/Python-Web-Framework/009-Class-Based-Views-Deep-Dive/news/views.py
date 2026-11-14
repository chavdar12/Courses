from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView
from django.views.generic.detail import SingleObjectMixin

from news.forms import SourceForm, ArticleForm
from news.models import Article, Source


class HomeView(ListView):
    model = Article
    context_object_name = 'articles'
    template_name = 'news/home.html'


class ArticleCreateView(CreateView):
    form_class = ArticleForm
    template_name = 'news/article_create.html'
    success_url = reverse_lazy('home')


class SourceCreateView(CreateView):
    form_class = SourceForm
    template_name = 'news/source_create.html'
    success_url = reverse_lazy('sources')


class SourceListView(ListView):
    model = Source
    context_object_name = 'sources'
    template_name = 'news/source_list.html'


class SourceDetailView(SingleObjectMixin, ListView):
    template_name = 'news/source_detail.html'

    def get(self, request, *args, **kwargs):
        self.object = self.get_object(queryset=Source.objects.all())
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return self.object.article_set.all()
