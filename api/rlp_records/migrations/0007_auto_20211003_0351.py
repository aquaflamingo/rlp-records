# Generated by Django 3.2.6 on 2021-10-03 03:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0006_alter_audiofile_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='record',
            name='token',
        ),
        migrations.AddField(
            model_name='erc721',
            name='record',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rlp_records.record'),
        ),
    ]
