# Generated by Django 4.0.4 on 2022-06-17 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0024_profile_banner_profile_pfp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='banner',
            field=models.ImageField(default='default_banner.png', null=True, upload_to='banners'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='pfp',
            field=models.ImageField(default='add.svg', null=True, upload_to='pfp'),
        ),
    ]
