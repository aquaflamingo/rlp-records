# Generated by Django 3.2.6 on 2021-10-03 04:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rlp_records', '0007_auto_20211003_0351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='erc721',
            name='record',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rlp_records.record'),
            preserve_default=False,
        ),
    ]
