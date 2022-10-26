# Generated by Django 4.0.4 on 2022-06-08 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('company_name', models.CharField(max_length=255)),
                ('working_hours', models.IntegerField()),
                ('salary', models.IntegerField()),
                ('salarytype', models.CharField(choices=[('per year', 'Per year'), ('per month', 'Per month')], default='per year', max_length=255)),
                ('currency', models.CharField(choices=[('per year', 'Per year'), ('per month', 'Per month')], default='ruppee', max_length=255)),
                ('jobtype', models.CharField(choices=[('full-time', 'Full-Time'), ('internship', 'Internship'), ('part-time', 'Part-Time')], default='full-time', max_length=255)),
            ],
        ),
    ]