# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-11-19 13:34
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rateapi', '0017_auto_20171119_1533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dialog',
            name='timeStamp',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 19, 15, 34, 52, 744000)),
        ),
    ]
