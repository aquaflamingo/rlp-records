# Generated by Django 3.2.6 on 2021-09-16 15:28

from django.db import migrations, models
import rlp_records.models


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0005_rename_value_audiofile_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofile',
            name='file',
            field=models.FileField(null=True, upload_to=rlp_records.models.record_upload_path),
        ),
    ]
