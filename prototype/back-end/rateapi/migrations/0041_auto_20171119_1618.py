# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-11-19 14:18
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rateapi', '0040_auto_20171119_1615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dialog',
            name='timeStamp',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 19, 16, 18, 10, 131000)),
        ),
    ]
