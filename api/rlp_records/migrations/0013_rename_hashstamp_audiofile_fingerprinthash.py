# Generated by Django 3.2.6 on 2021-11-28 05:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0012_auto_20211117_2125'),
    ]

    operations = [
        migrations.RenameField(
            model_name='audiofile',
            old_name='hashstamp',
            new_name='fingerprinthash',
        ),
    ]
