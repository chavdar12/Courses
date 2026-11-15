from django.db import models


class Python(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()
    image = models.ImageField(upload_to="images")

    def __str__(self):
        return self.name
