from django.test import TestCase
from django.urls import reverse

from expenses.models import Profile, Expense
from expenses.tests.test_forms import VALID_EXPENSE

VALID_PROFILE = {
    "first_name": "Jane",
    "last_name": "Doe",
    "budget": 100,
}


class HomeViewTests(TestCase):
    def test_getHome_whenNoProfile_shouldRenderProfileForm(self):
        response = self.client.get(reverse("home"))

        self.assertTemplateUsed(response, "home_no_profile.html")

    def test_postHome_whenNoProfileAndValid_shouldCreateProfile(self):
        response = self.client.post(reverse("home"), data=VALID_PROFILE)

        self.assertRedirects(response, reverse("home"))
        self.assertEqual(1, Profile.objects.count())

    def test_postHome_whenNoProfileAndInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse("home"), data={**VALID_PROFILE, "budget": ""})

        self.assertTemplateUsed(response, "home_no_profile.html")
        self.assertIn("budget", response.context["form"].errors)

    def test_getHome_whenProfileAndExpenses_shouldShowBudgetLeft(self):
        Profile.objects.create(**VALID_PROFILE)
        Expense.objects.create(**VALID_EXPENSE)
        Expense.objects.create(**{**VALID_EXPENSE, "price": 4.5})

        response = self.client.get(reverse("home"))

        self.assertTemplateUsed(response, "home_with_profile.html")
        self.assertEqual(50, response.context["budget_left"])
        self.assertEqual(2, len(response.context["expenses"]))

    def test_getHome_whenProfileAndNoExpenses_shouldShowFullBudget(self):
        Profile.objects.create(**VALID_PROFILE)

        response = self.client.get(reverse("home"))

        self.assertEqual(100, response.context["budget_left"])
        self.assertContains(response, "You have no expenses yet.")


class ExpenseViewsTests(TestCase):
    def setUp(self):
        Profile.objects.create(**VALID_PROFILE)
        self.expense = Expense.objects.create(**VALID_EXPENSE)

    def test_postCreate_whenValid_shouldCreateAndRedirectHome(self):
        response = self.client.post(reverse("create expense"), data=VALID_EXPENSE)

        self.assertRedirects(response, reverse("home"))
        self.assertEqual(2, Expense.objects.count())

    def test_postCreate_whenInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse("create expense"), data={**VALID_EXPENSE, "price": "x"})

        self.assertTemplateUsed(response, "form_page.html")
        self.assertIn("price", response.context["form"].errors)

    def test_getEdit_shouldPrefillForm(self):
        response = self.client.get(reverse("edit expense", args=[self.expense.pk]))

        self.assertContains(response, 'value="Groceries"')

    def test_postEdit_whenValid_shouldUpdateAndRedirectHome(self):
        response = self.client.post(
            reverse("edit expense", args=[self.expense.pk]), data={**VALID_EXPENSE, "price": 10}
        )

        self.assertRedirects(response, reverse("home"))
        self.expense.refresh_from_db()
        self.assertEqual(10, self.expense.price)

    def test_getDelete_shouldRenderDisabledForm(self):
        response = self.client.get(reverse("delete expense", args=[self.expense.pk]))

        self.assertContains(response, "disabled")
        self.assertTrue(Expense.objects.exists())

    def test_postDelete_shouldDeleteAndRedirectHome(self):
        response = self.client.post(reverse("delete expense", args=[self.expense.pk]))

        self.assertRedirects(response, reverse("home"))
        self.assertFalse(Expense.objects.exists())

    def test_getEdit_whenMissingExpense_shouldReturn404(self):
        self.assertEqual(
            404, self.client.get(reverse("edit expense", args=[self.expense.pk + 1])).status_code
        )


class ProfileViewsTests(TestCase):
    def test_getProfile_whenNoProfile_shouldRedirectHome(self):
        for name in ("profile", "edit profile", "delete profile"):
            with self.subTest(view=name):
                self.assertRedirects(self.client.get(reverse(name)), reverse("home"))

    def test_getProfile_shouldShowBudgetLeftAfterExpenses(self):
        Profile.objects.create(**VALID_PROFILE)
        Expense.objects.create(**VALID_EXPENSE)

        response = self.client.get(reverse("profile"))

        self.assertTemplateUsed(response, "profile.html")
        self.assertEqual(54.5, response.context["budget_left"])
        self.assertEqual(1, response.context["expenses_count"])

    def test_postEditProfile_whenValid_shouldUpdateAndRedirectToProfile(self):
        Profile.objects.create(**VALID_PROFILE)

        response = self.client.post(reverse("edit profile"), data={**VALID_PROFILE, "budget": 500})

        self.assertRedirects(response, reverse("profile"))
        self.assertEqual(500, Profile.objects.get().budget)

    def test_postDeleteProfile_shouldDeleteProfileAndAllExpenses(self):
        Profile.objects.create(**VALID_PROFILE)
        Expense.objects.create(**VALID_EXPENSE)

        response = self.client.post(reverse("delete profile"))

        self.assertRedirects(response, reverse("home"))
        self.assertFalse(Profile.objects.exists())
        self.assertFalse(Expense.objects.exists())
