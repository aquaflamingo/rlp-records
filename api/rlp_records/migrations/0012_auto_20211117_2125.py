# Generated by Django 3.2.6 on 2021-11-17 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0011_auto_20211117_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofile',
            name='fingerprint',
            field=models.CharField(max_length=1000000, null=True),
        ),
        migrations.AlterField(
            model_name='audiofile',
            name='hashstamp',
            field=models.IntegerField(null=True),
        ),
    ]
