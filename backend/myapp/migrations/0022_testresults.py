# Generated by Django 4.0.4 on 2022-08-26 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0021_remove_jobmodel_test_jobmodel_tests'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestResults',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.IntegerField()),
                ('time_started', models.DateField()),
                ('time_ended', models.DateField()),
                ('Job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.jobmodel')),
                ('Test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.test')),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.user')),
            ],
        ),
    ]