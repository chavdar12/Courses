from django.contrib.auth.models import User
from django.db import models


class Python(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    image = models.ImageField(upload_to="images")

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    picture_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.user.username
