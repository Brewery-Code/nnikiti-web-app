from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('departments', '0015_alter_programsubject_semester'),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        # Remove TaggableManager fields from EducationalProgram
        migrations.RemoveField(
            model_name='educationalprogram',
            name='subject',
        ),
        migrations.RemoveField(
            model_name='educationalprogram',
            name='education_forms',
        ),
        migrations.RemoveField(
            model_name='educationalprogram',
            name='education_levels',
        ),
        # Drop tag junction tables
        migrations.DeleteModel(
            name='SubjectTaggedItem',
        ),
        migrations.DeleteModel(
            name='FormTaggedItem',
        ),
        migrations.DeleteModel(
            name='LevelTaggedItem',
        ),
        # Drop CategorizedTag (translation table is dropped automatically by parler cascade)
        migrations.DeleteModel(
            name='CategorizedTagTranslation',
        ),
        migrations.DeleteModel(
            name='CategorizedTag',
        ),
        # Make EducationalProgram.description optional
        migrations.AlterField(
            model_name='educationalprogramtranslation',
            name='description',
            field=models.TextField(blank=True, default='', verbose_name='Educational program description'),
        ),
        # Remove specialty fields from FacultyMember
        migrations.RemoveField(
            model_name='facultymember',
            name='specialty_uk',
        ),
        migrations.RemoveField(
            model_name='facultymember',
            name='specialty_en',
        ),
        # Remove audience fields
        migrations.RemoveField(
            model_name='facultymember',
            name='audience',
        ),
        migrations.RemoveField(
            model_name='headofdepartment',
            name='audience',
        ),
    ]
