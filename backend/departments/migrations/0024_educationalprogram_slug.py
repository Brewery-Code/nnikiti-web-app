import re
from django.db import migrations, models
from unidecode import unidecode


def slugify_uk(text: str) -> str:
    text = unidecode(text).lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text).strip("-")
    return text


def fill_ep_slugs(apps, schema_editor):
    EducationalProgram = apps.get_model("departments", "EducationalProgram")

    from django.db import connection
    with connection.cursor() as cursor:
        cursor.execute(
            'SELECT master_id, name FROM "EducationalProgram_translation" WHERE language_code = %s',
            ["uk"],
        )
        uk_names = {row[0]: row[1] for row in cursor.fetchall()}

        cursor.execute('SELECT master_id, name FROM "EducationalProgram_translation"')
        all_names = {row[0]: row[1] for row in cursor.fetchall()}

    seen = set()
    for ep in EducationalProgram.objects.all():
        name = uk_names.get(ep.pk) or all_names.get(ep.pk) or ""
        base = slugify_uk(name) or f"program-{ep.pk}"
        slug = base
        counter = 1
        while slug in seen:
            slug = f"{base}-{counter}"
            counter += 1
        seen.add(slug)
        ep.slug = slug
        ep.save(update_fields=["slug"])


def create_unique_index(apps, schema_editor):
    from django.db import connection
    with connection.cursor() as cursor:
        cursor.execute("""
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_indexes
                    WHERE indexname = 'EducationalProgram_slug_e816d28c_like'
                ) THEN
                    CREATE INDEX "EducationalProgram_slug_e816d28c_like"
                    ON "EducationalProgram" ("slug" varchar_pattern_ops);
                END IF;
            END$$;
        """)
        cursor.execute("""
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint
                    WHERE conname = 'EducationalProgram_slug_key'
                ) THEN
                    ALTER TABLE "EducationalProgram"
                    ADD CONSTRAINT "EducationalProgram_slug_key" UNIQUE ("slug");
                END IF;
            END$$;
        """)


class Migration(migrations.Migration):

    dependencies = [
        ("departments", "0023_department_slug"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunSQL(
                    sql="""
                        ALTER TABLE "EducationalProgram"
                        ADD COLUMN IF NOT EXISTS "slug" varchar(255) NOT NULL DEFAULT '';
                    """,
                    reverse_sql='ALTER TABLE "EducationalProgram" DROP COLUMN IF EXISTS "slug";',
                ),
            ],
            state_operations=[
                migrations.AddField(
                    model_name="educationalprogram",
                    name="slug",
                    field=models.SlugField(blank=True, max_length=255, verbose_name="Slug"),
                ),
            ],
        ),
        migrations.RunPython(fill_ep_slugs, migrations.RunPython.noop),
        migrations.RunPython(create_unique_index, migrations.RunPython.noop),
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.AlterField(
                    model_name="educationalprogram",
                    name="slug",
                    field=models.SlugField(max_length=255, unique=True, verbose_name="Slug"),
                ),
            ],
        ),
    ]
