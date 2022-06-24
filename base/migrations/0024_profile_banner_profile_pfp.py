# Generated by Django 4.0.4 on 2022-06-10 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='banner',
            field=models.ImageField(default='.frontend/src/assets/default_banner.png', null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='profile',
            name='pfp',
            field=models.ImageField(default='.frontend/src/assets/add.svg', null=True, upload_to=''),
        ),
    ]