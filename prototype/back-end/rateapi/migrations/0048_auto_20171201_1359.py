# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-12-01 11:59
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rateapi', '0047_auto_20171123_2349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dialog',
            name='timeStamp',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 1, 13, 59, 41, 447000)),
        ),
    ]
