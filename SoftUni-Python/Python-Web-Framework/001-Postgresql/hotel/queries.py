from hotel.models import DogRoom, CatRoom, PetOwner, Cat, Dog


# 2. Select all the information from the dog_room table
def select_dog_rooms():
    return DogRoom.objects.values()


# 3. Select only the ids of the cats that are in rooms from the hotel with id=2
def cat_ids_in_hotel(hotel_id=2):
    return CatRoom.objects.filter(hotel_id=hotel_id).values_list('cat_id', flat=True)


# 4. Sort all the pet owners by age in descending
def owners_by_age_desc():
    return PetOwner.objects.order_by('-owner_age')


# 5. Get the count of all cats that are of age 3 or older
def count_cats_at_least(age=3):
    return Cat.objects.filter(cat_age__gte=age).count()


# 6. Delete all cats and dogs, that are of age 2 or less (their rooms cascade)
def delete_pets_up_to(age=2):
    Cat.objects.filter(cat_age__lte=age).delete()
    Dog.objects.filter(dog_age__lte=age).delete()
