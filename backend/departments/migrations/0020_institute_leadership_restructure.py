from django.db import migrations, models
import django.db.models.deletion

import core.utils


class Migration(migrations.Migration):

    dependencies = [
        ('departments', '0019_instituteleader_instituteleadertranslation'),
    ]

    operations = [
        # Drop old tables first to avoid FK/unique_together conflicts
        migrations.RunSQL(
            'DROP TABLE IF EXISTS "InstituteLeader_translation" CASCADE;',
            reverse_sql=migrations.RunSQL.noop,
        ),
        migrations.RunSQL(
            'DROP TABLE IF EXISTS "InstituteLeader" CASCADE;',
            reverse_sql=migrations.RunSQL.noop,
        ),
        # Remove Django's knowledge of old models (tables already dropped via RunSQL above)
        migrations.SeparateDatabaseAndState(
            database_operations=[],
            state_operations=[
                migrations.DeleteModel(name='InstituteLeaderTranslation'),
                migrations.DeleteModel(name='InstituteLeader'),
            ],
        ),
        # Create new models
        migrations.CreateModel(
            name='InstituteLeadership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_uk', models.CharField(default='', max_length=255, verbose_name='Title (UK)')),
                ('title_en', models.CharField(blank=True, default='', max_length=255, verbose_name='Title (EN)')),
                ('image', models.ImageField(blank=True, upload_to=core.utils.UploadTo('institute_leadership'), verbose_name='Group photo')),
            ],
            options={
                'verbose_name': 'Institute Leadership',
                'verbose_name_plural': 'Institute Leaderships',
                'db_table': 'InstituteLeadership',
            },
        ),
        migrations.CreateModel(
            name='InstituteLeaderMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name_uk', models.CharField(default='', max_length=255, verbose_name='Full name (UK)')),
                ('full_name_en', models.CharField(blank=True, default='', max_length=255, verbose_name='Full name (EN)')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='Email')),
                ('image', models.ImageField(blank=True, upload_to=core.utils.UploadTo('institute_leaders'), verbose_name='Photo')),
                ('url', models.URLField(blank=True, verbose_name='Wiki URL')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Order')),
                ('leadership', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='departments.instituteleadership', verbose_name='Leadership group')),
            ],
            options={
                'verbose_name': 'Institute Leader Member',
                'verbose_name_plural': 'Institute Leader Members',
                'db_table': 'InstituteLeaderMember',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='InstituteLeaderMemberTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('position', models.CharField(max_length=255, verbose_name='Position')),
                ('master', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='departments.instituteleadermember')),
            ],
            options={
                'verbose_name': 'Institute Leader Member Translation',
                'db_table': 'InstituteLeaderMember_translation',
                'db_tablespace': '',
                'managed': True,
                'default_permissions': (),
                'unique_together': {('language_code', 'master')},
            },
        ),
    ]
