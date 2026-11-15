from django.urls import path

from news import views

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("articles/create/", views.ArticleCreateView.as_view(), name="create article"),
    path("sources/", views.SourceListView.as_view(), name="sources"),
    path("sources/create/", views.SourceCreateView.as_view(), name="create source"),
    path("sources/<int:pk>/", views.SourceDetailView.as_view(), name="source details"),
]
