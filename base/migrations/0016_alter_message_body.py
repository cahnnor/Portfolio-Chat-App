# Generated by Django 4.0.4 on 2022-05-27 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_alter_message_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='body',
            field=models.TextField(),
        ),
    ]
