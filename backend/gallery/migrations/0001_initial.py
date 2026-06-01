from django.db import migrations, models
import django.db.models.deletion
import core.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cover', models.ImageField(blank=True, upload_to=core.utils.make_upload_to('gallery/covers'), verbose_name='Cover')),
                ('date', models.DateField(verbose_name='Date')),
                ('status', models.CharField(choices=[('DF', 'Draft'), ('PB', 'Published')], default='DF', max_length=2, verbose_name='Status')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Album',
                'verbose_name_plural': 'Albums',
                'db_table': 'Album',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='AlbumTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('title', models.CharField(max_length=255, verbose_name='Title')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('master', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='gallery.album')),
            ],
            options={
                'verbose_name': 'Album Translation',
                'db_table': 'AlbumTranslation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='AlbumPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=core.utils.make_upload_to('gallery/photos'), verbose_name='Photo')),
                ('published_at', models.DateField(verbose_name='Published at')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Order')),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='gallery.album', verbose_name='Album')),
            ],
            options={
                'verbose_name': 'Photo',
                'verbose_name_plural': 'Photos',
                'db_table': 'AlbumPhoto',
                'ordering': ['order', 'published_at'],
            },
        ),
        migrations.AlterUniqueTogether(
            name='albumtranslation',
            unique_together={('language_code', 'master')},
        ),
    ]
