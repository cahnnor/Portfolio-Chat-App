# Generated by Django 4.0.4 on 2022-05-27 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_alter_test_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='body',
            field=models.TextField(default=' '),
            preserve_default=False,
        ),
    ]