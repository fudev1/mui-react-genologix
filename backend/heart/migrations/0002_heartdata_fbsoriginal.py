# Generated by Django 4.2.7 on 2023-12-03 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("heart", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="heartdata",
            name="fbsOriginal",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
