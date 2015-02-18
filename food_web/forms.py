from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.forms import ModelForm


__author__ = 'danielgin'

class ExtendedUserCreationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

class SimpleUserChangeForm(ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')