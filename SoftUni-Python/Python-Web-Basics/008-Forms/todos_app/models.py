from django.db import models


class ToDo(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
