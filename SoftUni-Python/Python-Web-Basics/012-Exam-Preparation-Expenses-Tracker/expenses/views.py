from django.db.models import Sum
from django.shortcuts import render, redirect, get_object_or_404

from expenses.forms import ProfileForm, ExpenseForm, DeleteExpenseForm
from expenses.models import Profile, Expense


def get_profile():
    # the app has a single profile by design
    return Profile.objects.first()


def get_budget_left(profile):
    spent = Expense.objects.aggregate(total=Sum('price'))['total'] or 0
    return profile.budget - spent


def render_form(request, form, title, button, **extra):
    context = {
        'form': form,
        'title': title,
        'button': button,
        **extra,
    }
    return render(request, 'form_page.html', context)


def home(request):
    profile = get_profile()
    if profile:
        context = {
            'profile': profile,
            'budget_left': get_budget_left(profile),
            'expenses': Expense.objects.all(),
        }
        return render(request, 'home_with_profile.html', context)

    form = ProfileForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('home')

    context = {
        'form': form,
    }
    return render(request, 'home_no_profile.html', context)


def create_expense(request):
    form = ExpenseForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('home')
    return render_form(request, form, 'Create expense', 'Create')


def edit_expense(request, pk):
    expense = get_object_or_404(Expense, pk=pk)
    form = ExpenseForm(request.POST or None, instance=expense)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('home')
    return render_form(request, form, 'Edit expense', 'Save')


def delete_expense(request, pk):
    expense = get_object_or_404(Expense, pk=pk)
    if request.method == 'POST':
        expense.delete()
        return redirect('home')
    return render_form(request, DeleteExpenseForm(instance=expense), 'Delete expense', 'Delete', danger=True)


def profile_details(request):
    profile = get_profile()
    if not profile:
        return redirect('home')

    context = {
        'profile': profile,
        'budget_left': get_budget_left(profile),
        'expenses_count': Expense.objects.count(),
    }
    return render(request, 'profile.html', context)


def profile_edit(request):
    profile = get_profile()
    if not profile:
        return redirect('home')

    form = ProfileForm(request.POST or None, instance=profile)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('profile')
    return render_form(request, form, 'Edit profile', 'Save')


def profile_delete(request):
    profile = get_profile()
    if not profile:
        return redirect('home')

    if request.method == 'POST':
        Expense.objects.all().delete()
        profile.delete()
        return redirect('home')

    context = {
        'profile': profile,
    }
    return render(request, 'profile_delete.html', context)
