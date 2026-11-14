from django.urls import path

from pets.views import pet_all, pet_detail, like_pet, pet_create, pet_edit, pet_delete

urlpatterns = [
    path('', pet_all, name='pet-list'),
    path('details/<int:pk>/', pet_detail, name='pet-details'),
    path('like/<int:pk>/', like_pet, name='pet-like'),
    path('create/', pet_create, name='pet-create'),
    path('edit/<int:pk>/', pet_edit, name='pet-edit'),
    path('delete/<int:pk>/', pet_delete, name='pet-delete'),
]
