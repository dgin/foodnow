from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.
# class Foodie(AbstractUser):
#     phone = models.CharField(max_length=12, help_text="Format should be: 650-111-2222")
#     allergy = models.TextField(null=True, blank=True, help_text="Please list any allergies that you may have. This will allow us to filter out restaurants that do not meet your needs.")


class List(models.Model):
    name = models.CharField(max_length=40)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return u"{}".format(self.name)

#Places go in Lists, which belong to Users
class Place(models.Model):
    name = models.CharField(max_length = 60)
    list = models.ForeignKey(List, default='1')

    def __unicode__(self):
        return u"{}".format(self.name)

class Restaurant(models.Model):
    name = models.CharField(max_length = 60)
    patron = models.ManyToManyField(User, null=True, blank=True)
    score = models.SmallIntegerField(null=True, blank=True)
    genre = models.CharField(max_length = 100)
    # Put food types in text field separated by comma
    types_of_food = models.TextField(null=True, blank=True)
    allergy_flag = models.BooleanField(default=False)
    allergy_types = models.TextField(null=True, blank=True)

    def __unicode__(self):
        return u"{}".format(self.name)