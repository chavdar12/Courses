from django.db import models


class Pet(models.Model):
    TYPE_CHOICES = (
        ('dog', 'dog'),
        ('cat', 'cat'),
        ('parrot', 'parrot'),
    )

    type = models.CharField(max_length=6, choices=TYPE_CHOICES)
    name = models.CharField(max_length=6)
    age = models.PositiveIntegerField()
    description = models.TextField()
    image = models.ImageField(upload_to='pets')

    def __str__(self):
        return f'{self.name} ({self.type})'


class Like(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
