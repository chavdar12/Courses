from django.contrib import admin

from hotel.models import PetOwner, Dog, Cat, Hotel, DogRoom, CatRoom

admin.site.register([PetOwner, Dog, Cat, Hotel, DogRoom, CatRoom])
