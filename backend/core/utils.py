import os
import uuid
from unidecode import unidecode


def slugify_filename(filename):
    name, ext = os.path.splitext(filename)
    name = unidecode(name)
    name = "".join(c if c.isalnum() or c in "-_" else "_" for c in name)
    return f"{name}{ext.lower()}"


def make_upload_to(folder):
    def upload_to(instance, filename):
        return f"{folder}/{slugify_filename(filename)}"
    return upload_to
