# Generated by Django 4.0.5 on 2022-09-15 01:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_provisionalcertificate_chairman_approved_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='provisionalcertificate',
            name='chairman_approved_date',
        ),
        migrations.RemoveField(
            model_name='provisionalcertificate',
            name='examController_approved_date',
        ),
        migrations.RemoveField(
            model_name='provisionalcertificate',
            name='issued_date',
        ),
        migrations.RemoveField(
            model_name='provisionalcertificate',
            name='librarian_approved_date',
        ),
        migrations.RemoveField(
            model_name='provisionalcertificate',
            name='provost_approved_date',
        ),
    ]
