from django.urls import path

from expenses.views import home, create_expense, edit_expense, delete_expense, profile_details, profile_edit, \
    profile_delete

urlpatterns = [
    path('', home, name='home'),
    path('create/', create_expense, name='create expense'),
    path('edit/<int:pk>/', edit_expense, name='edit expense'),
    path('delete/<int:pk>/', delete_expense, name='delete expense'),
    path('profile/', profile_details, name='profile'),
    path('profile/edit/', profile_edit, name='edit profile'),
    path('profile/delete/', profile_delete, name='delete profile'),
]
