# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('food_web', '0002_remove_restaurant_patron'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurant',
            name='patrons_hated',
            field=models.ManyToManyField(related_name='hated', null=True, to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='restaurant',
            name='patrons_loved',
            field=models.ManyToManyField(related_name='loved', null=True, to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
    ]
