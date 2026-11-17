from django.db import models


class Pet(models.Model):
    TYPE_CHOICES = (
        ("cat", "cat"),
        ("dog", "dog"),
        ("parrot", "parrot"),
    )

    type = models.CharField(max_length=6, choices=TYPE_CHOICES)
    name = models.CharField(max_length=6)
    age = models.PositiveIntegerField()
    description = models.TextField()
    image_url = models.URLField()

    def __str__(self):
        return f"{self.name} ({self.type})"


class Like(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
