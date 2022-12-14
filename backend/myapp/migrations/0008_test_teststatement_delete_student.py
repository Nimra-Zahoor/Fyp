# Generated by Django 4.0.4 on 2022-06-21 03:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_rename_working_hours_per_week_jobmodel_working_hours_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('test_Name', models.TextField(max_length=255)),
                ('description', models.TextField(max_length=255)),
                ('totalTimeForTest', models.TimeField()),
                ('deadline', models.DateField()),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='TestStatement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('statement', models.TextField(max_length=255)),
                ('testOption', models.BooleanField(default=True)),
                ('option1', models.TextField(max_length=255)),
                ('option2', models.TextField(max_length=255)),
                ('option3', models.TextField(max_length=255)),
                ('option4', models.TextField(max_length=255)),
                ('testId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.test')),
            ],
            options={
                'ordering': ['testId'],
            },
        ),
        migrations.DeleteModel(
            name='Student',
        ),
    ]
