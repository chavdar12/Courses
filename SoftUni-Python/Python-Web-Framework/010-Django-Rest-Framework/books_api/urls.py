from django.urls import path

from books_api import views

urlpatterns = [
    path('books/', views.ListBooksView.as_view(), name='list books'),
    path('books/<int:id>', views.DetailBookView.as_view(), name='detail book'),
]
