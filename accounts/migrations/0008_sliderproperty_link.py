# Generated by Django 5.1.2 on 2024-11-17 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_remove_sliderproperty_link_sliderproperty_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='sliderproperty',
            name='link',
            field=models.URLField(blank=True, null=True),
        ),
    ]