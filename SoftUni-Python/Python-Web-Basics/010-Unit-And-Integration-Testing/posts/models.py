from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    location = models.CharField(max_length=50)
    is_found = models.BooleanField(default=False)

    def __str__(self):
        return self.title
