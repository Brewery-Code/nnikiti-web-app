from django.contrib import admin
from parler.admin import TranslatableAdmin
from unfold.admin import ModelAdmin, TabularInline

from .models import Album, AlbumPhoto


class UnfoldTranslatableAdmin(ModelAdmin, TranslatableAdmin):
    change_form_template = "admin/parler/change_form.html"


class AlbumPhotoInline(TabularInline):
    model = AlbumPhoto
    extra = 0
    fields = ("image", "published_at", "order")


@admin.register(Album)
class AlbumAdmin(UnfoldTranslatableAdmin):
    list_display = ("id", "title", "date", "status")
    list_filter = ("status",)
    search_fields = ("translations__title",)
    ordering = ("-date",)
    inlines = [AlbumPhotoInline]


@admin.register(AlbumPhoto)
class AlbumPhotoAdmin(ModelAdmin):
    list_display = ("id", "album", "published_at", "order")
    list_filter = ("album",)
    ordering = ("album", "order")
