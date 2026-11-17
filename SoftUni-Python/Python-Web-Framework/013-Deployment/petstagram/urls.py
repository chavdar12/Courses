from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("common.urls")),
    path("pets/", include("pets.urls")),
    path("accounts/", include("accounts.urls")),
]

# shortcut: Django serves uploads only while DEBUG=True and Heroku's disk is ephemeral, use S3/Cloudinary for real media
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
