from django.contrib import admin

from common.models import Comment
from pets.models import Pet, Like


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'age', 'user', 'likes_count')
    list_filter = ('type',)
    search_fields = ('name', 'description', 'user__user__username')
    inlines = (CommentInline,)

    @admin.display(description='Likes')
    def likes_count(self, obj):
        return obj.like_set.count()


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('pet', 'user')
