from rest_framework import serializers

from .models import Album, AlbumPhoto


class AlbumPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumPhoto
        fields = ["id", "image", "published_at", "order"]


class AlbumListSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    photos_count = serializers.IntegerField(source="photos.count", read_only=True)

    class Meta:
        model = Album
        fields = ["id", "title", "cover", "date", "photos_count"]

    def get_title(self, obj):
        return obj.safe_translation_getter("title", any_language=True)


class AlbumDetailSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    photos = AlbumPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ["id", "title", "description", "cover", "date", "photos"]

    def get_title(self, obj):
        return obj.safe_translation_getter("title", any_language=True)

    def get_description(self, obj):
        return obj.safe_translation_getter("description", any_language=True)
