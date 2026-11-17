from django.test import TestCase

from expenses.forms import ProfileForm, ExpenseForm, DeleteExpenseForm
from expenses.models import Expense

VALID_EXPENSE = {
    "title": "Groceries",
    "description": "Weekly shopping",
    "image_url": "https://example.com/food.jpg",
    "price": 45.5,
}


class FormsTests(TestCase):
    def test_profileForm_whenFirstNameLongerThan15_shouldBeInvalid(self):
        form = ProfileForm(data={"first_name": "a" * 16, "last_name": "Doe", "budget": 100})

        self.assertFalse(form.is_valid())
        self.assertIn("first_name", form.errors)

    def test_expenseForm_whenInvalidImageUrl_shouldBeInvalid(self):
        self.assertFalse(ExpenseForm(data={**VALID_EXPENSE, "image_url": "food"}).is_valid())

    def test_deleteExpenseForm_shouldDisableEveryFieldAndKeepData(self):
        expense = Expense.objects.create(**VALID_EXPENSE)
        form = DeleteExpenseForm(instance=expense)

        self.assertTrue(all(field.disabled for field in form.fields.values()))
        self.assertEqual("Groceries", form["title"].value())
