from django.test import TestCase
from django.urls import reverse

from todos_app.forms import TodoForm
from todos_app.models import ToDo


class TodoFormTests(TestCase):
    def test_todoForm_whenTitleMissing_shouldBeInvalid(self):
        self.assertFalse(TodoForm(data={'description': 'd'}).is_valid())

    def test_todoForm_shouldAddFormControlClass(self):
        form = TodoForm()

        self.assertEqual('form-control', form.fields['title'].widget.attrs['class'])


class TodoViewsTests(TestCase):
    def setUp(self):
        self.todo = ToDo.objects.create(title='Learn', description='Learn forms')

    def test_getIndex_shouldRenderTodosAndForm(self):
        response = self.client.get(reverse('todo index'))

        self.assertTemplateUsed(response, 'todos_app/index.html')
        self.assertEqual([self.todo], list(response.context['todos']))
        self.assertIsInstance(response.context['todo_form'], TodoForm)

    def test_postCreate_whenValid_shouldCreateAndRedirect(self):
        response = self.client.post(reverse('create task'), data={'title': 'New', 'description': ''})

        self.assertRedirects(response, reverse('todo index'))
        self.assertTrue(ToDo.objects.filter(title='New', is_done=False).exists())

    def test_postCreate_whenInvalid_shouldRenderErrors(self):
        response = self.client.post(reverse('create task'), data={'title': ''})

        self.assertEqual(200, response.status_code)
        self.assertTrue(response.context['todo_form'].errors)
        self.assertEqual(1, ToDo.objects.count())

    def test_getEdit_shouldPrefillForm(self):
        response = self.client.get(reverse('edit todo', args=[self.todo.pk]))

        self.assertEqual(self.todo, response.context['todo_form'].instance)
        self.assertEqual(self.todo.pk, response.context['pk'])

    def test_postEdit_whenValid_shouldUpdateAndRedirect(self):
        response = self.client.post(reverse('edit todo', args=[self.todo.pk]), data={'title': 'Edited', 'description': 'x'})

        self.assertRedirects(response, reverse('todo index'))
        self.todo.refresh_from_db()
        self.assertEqual('Edited', self.todo.title)

    def test_postDoTask_shouldToggleIsDone(self):
        self.client.post(reverse('do task', args=[self.todo.pk]))
        self.todo.refresh_from_db()
        self.assertTrue(self.todo.is_done)

        self.client.post(reverse('do task', args=[self.todo.pk]))
        self.todo.refresh_from_db()
        self.assertFalse(self.todo.is_done)

    def test_postDelete_shouldDeleteAndRedirect(self):
        response = self.client.post(reverse('delete todo', args=[self.todo.pk]))

        self.assertRedirects(response, reverse('todo index'))
        self.assertFalse(ToDo.objects.exists())

    def test_getDelete_shouldNotBeAllowed(self):
        self.assertEqual(405, self.client.get(reverse('delete todo', args=[self.todo.pk])).status_code)
