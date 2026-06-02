import os
from unidecode import unidecode


def slugify_filename(filename):
    name, ext = os.path.splitext(filename)
    name = unidecode(name)
    name = "".join(c if c.isalnum() or c in "-_" else "_" for c in name)
    return f"{name}{ext.lower()}"


class UploadTo:
    def __init__(self, folder):
        self.folder = folder

    def __call__(self, instance, filename):
        return f"{self.folder}/{slugify_filename(filename)}"

    def deconstruct(self):
        return (
            "core.utils.UploadTo",
            [self.folder],
            {},
        )


def make_upload_to(folder):
    return UploadTo(folder)
