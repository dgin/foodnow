# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('food_web', '0005_restaurant_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='hate_count',
            field=models.SmallIntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='restaurant',
            name='love_count',
            field=models.SmallIntegerField(default=0),
            preserve_default=True,
        ),
    ]
