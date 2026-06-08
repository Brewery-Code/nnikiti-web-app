from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('departments', '0011_alter_upload_to_slugify'),
    ]

    operations = [
        migrations.AddField(
            model_name='programsubject',
            name='control_form',
            field=models.CharField(
                blank=True,
                choices=[
                    ('exam', 'Exam'),
                    ('credit', 'Credit'),
                    ('diff_credit', 'Differentiated credit'),
                    ('coursework', 'Coursework'),
                    ('practice', 'Practice'),
                    ('thesis', 'Thesis / Qualification work'),
                ],
                default='',
                max_length=20,
                verbose_name='Control form',
            ),
        ),
    ]
