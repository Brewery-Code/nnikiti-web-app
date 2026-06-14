from django.db import migrations, models
from unidecode import unidecode
import re


def slugify_uk(text: str) -> str:
    text = unidecode(text).lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text).strip("-")
    return text


def fill_slugs(apps, schema_editor):
    Department = apps.get_model("departments", "Department")
    seen = {}
    for dept in Department.objects.all():
        name = (
            dept.translations.filter(language_code="uk").values_list("name", flat=True).first()
            or dept.translations.values_list("name", flat=True).first()
            or f"department-{dept.pk}"
        )
        base = slugify_uk(name) or f"department-{dept.pk}"
        slug = base
        counter = 1
        while slug in seen:
            slug = f"{base}-{counter}"
            counter += 1
        seen[slug] = True
        dept.slug = slug
        dept.save(update_fields=["slug"])


class Migration(migrations.Migration):

    dependencies = [
        ("departments", "0022_remove_instituteleadership_title_en_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="department",
            name="slug",
            field=models.SlugField(blank=True, max_length=255, unique=False, verbose_name="Slug"),
        ),
        migrations.RunPython(fill_slugs, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="department",
            name="slug",
            field=models.SlugField(max_length=255, unique=True, verbose_name="Slug"),
        ),
    ]
