from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from accounts.models import UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    # covers signup, createsuperuser and admin-created users alike
    if created:
        UserProfile.objects.create(user=instance)
