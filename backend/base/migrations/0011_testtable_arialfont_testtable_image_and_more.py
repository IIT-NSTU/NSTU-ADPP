# Generated by Django 4.0.5 on 2022-09-17 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_provisionalcertificate_ssc_certificate'),
    ]

    operations = [
        migrations.AddField(
            model_name='testtable',
            name='arialfont',
            field=models.FileField(blank=True, null=True, upload_to='assets'),
        ),
        migrations.AddField(
            model_name='testtable',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='assets'),
        ),
        migrations.AddField(
            model_name='testtable',
            name='italicFont',
            field=models.FileField(blank=True, null=True, upload_to='assets'),
        ),
        migrations.AddField(
            model_name='testtable',
            name='scriptFont',
            field=models.FileField(blank=True, null=True, upload_to='assets'),
        ),
    ]
