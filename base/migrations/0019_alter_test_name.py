# Generated by Django 4.0.4 on 2022-05-27 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_test'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='name',
            field=models.TextField(),
        ),
    ]
