from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse

from forms_demo.forms import UserForm

VALID_DATA = {
    'name': 'Doncho',
    'age': 18,
    'email': 'doncho@softuni.bg',
    'password': 'Password1',
    'text': 'Some text',
}


class UserFormTests(TestCase):
    def assertInvalid(self, field, value, message):
        form = UserForm(data={**VALID_DATA, field: value})

        self.assertFalse(form.is_valid())
        self.assertIn(message, form.errors[field])

    def test_userForm_whenValidData_shouldBeValid(self):
        self.assertTrue(UserForm(data=VALID_DATA).is_valid())

    def test_userForm_whenNameStartsWithLowercase_shouldBeInvalid(self):
        self.assertInvalid('name', 'doncho', 'The name must start with an uppercase letter.')

    def test_userForm_whenNameShorterThan6_shouldBeInvalid(self):
        form = UserForm(data={**VALID_DATA, 'name': 'Dimo'})

        self.assertFalse(form.is_valid())
        self.assertIn('name', form.errors)

    def test_userForm_whenNegativeAge_shouldBeInvalid(self):
        self.assertInvalid('age', -1, 'The age cannot be less than zero.')

    def test_userForm_whenEmailWithoutDot_shouldBeInvalid(self):
        self.assertInvalid('email', 'doncho@softuni', 'Enter a valid email.')

    def test_userForm_whenPasswordShorterThan8_shouldBeInvalid(self):
        self.assertInvalid('password', 'Pass1', 'Enter a valid password.')

    def test_userForm_whenPasswordHasSymbols_shouldBeInvalid(self):
        self.assertInvalid('password', 'Password1!', 'Enter a valid password.')

    def test_userForm_whenBotCatcherFilled_shouldBeInvalid(self):
        self.assertInvalid('bot_catcher', 'bot', 'This form was created by a bot')


class IndexViewTests(TestCase):
    def test_getIndex_shouldRenderEmptyForm(self):
        response = self.client.get(reverse('forms index'))

        self.assertTemplateUsed(response, 'forms_demo/index.html')
        self.assertIsInstance(response.context['form'], UserForm)

    def test_postIndex_whenValid_shouldPrintCleanedData(self):
        with patch('builtins.print') as printed:
            self.client.post(reverse('forms index'), data=VALID_DATA)

        printed.assert_called_once()
        self.assertEqual('Doncho', printed.call_args.args[0]['name'])

    def test_postIndex_whenInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse('forms index'), data={**VALID_DATA, 'age': -1})

        self.assertContains(response, 'The age cannot be less than zero.')
