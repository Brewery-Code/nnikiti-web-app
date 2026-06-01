from django.db import migrations, models
import core.utils


class Migration(migrations.Migration):

    dependencies = [
        ('departments', '0010_remove_departmenthistory_year_en_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facultymember',
            name='image',
            field=models.ImageField(blank=True, upload_to=core.utils.make_upload_to('faculty'), verbose_name='Photo'),
        ),
        migrations.AlterField(
            model_name='department',
            name='image',
            field=models.ImageField(blank=True, upload_to=core.utils.make_upload_to('departments'), verbose_name='Department photo'),
        ),
        migrations.AlterField(
            model_name='department',
            name='history_image',
            field=models.ImageField(blank=True, upload_to=core.utils.make_upload_to('departments/history'), verbose_name='History photo'),
        ),
        migrations.AlterField(
            model_name='headofdepartment',
            name='image',
            field=models.ImageField(blank=True, upload_to=core.utils.make_upload_to('head_of_department'), verbose_name='Photo'),
        ),
    ]
