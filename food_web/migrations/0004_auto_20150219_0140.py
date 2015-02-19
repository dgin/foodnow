# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('food_web', '0003_auto_20150219_0118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='genre',
            field=models.CharField(max_length=100, blank=True),
            preserve_default=True,
        ),
    ]
