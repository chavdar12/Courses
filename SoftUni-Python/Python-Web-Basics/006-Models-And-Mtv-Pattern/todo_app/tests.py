from django.test import TestCase
from django.urls import reverse

from todo_app.models import Todo


class TodoModelTests(TestCase):
    def test_createTodo_whenNoIsDone_shouldDefaultToFalse(self):
        todo = Todo.objects.create(title='Learn', description='Learn Django')

        self.assertFalse(todo.is_done)
        self.assertEqual('Learn', str(todo))


class IndexViewTests(TestCase):
    def test_getIndex_whenNoTodos_shouldRenderNoTodos(self):
        response = self.client.get(reverse('index'))

        self.assertTemplateUsed(response, 'index.html')
        self.assertContains(response, 'No TODOS')

    def test_getIndex_whenTodos_shouldRenderThemWithStatus(self):
        Todo.objects.create(title='Open task', description='d1')
        Todo.objects.create(title='Done task', description='d2', is_done=True)

        response = self.client.get(reverse('index'))

        self.assertEqual(2, len(response.context['todos']))
        self.assertContains(response, 'Open task')
        self.assertContains(response, 'Not done')
        self.assertContains(response, '<div class="done">Done</div>', html=True)
        self.assertNotContains(response, 'No TODOS')
