# Generated by Django 3.2.6 on 2021-09-14 15:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0003_auto_20210914_1449'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='record',
            name='audiofile',
        ),
        migrations.AddField(
            model_name='audiofile',
            name='record',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rlp_records.record'),
        ),
    ]
