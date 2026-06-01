from django.db import migrations, models
import events.models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_cover_event_event_date_event_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to=events.models.events_upload_to, verbose_name='Cover image'),
        ),
        migrations.AlterField(
            model_name='eventimage',
            name='image',
            field=models.ImageField(upload_to=events.models.events_upload_to, verbose_name='Image'),
        ),
    ]
