# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-11-10 02:03
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rateapi', '0002_auto_20171108_2142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dialog',
            name='timeStamp',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 10, 4, 2, 59, 39000)),
        ),
    ]
