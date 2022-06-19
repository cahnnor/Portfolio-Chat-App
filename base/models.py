from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager

class PersonManager(models.Manager):
    def get_by_natural_key(self, username):
        return self.get(username=username)

class Person(models.Model):
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    birthdate = models.DateField(null=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100, unique=True)
    last_login = models.DateTimeField(auto_now=True)
    #is_anonymous = models.BooleanField()
    #is_authenticated = models.BooleanField()
    #USERNAME_FIELD = models.CharField(max_length=100)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    objects = PersonManager()

    class Meta:
        unique_together = [['first_name', 'last_name', 'username']]

    def natural_key(self):
        return (self.username)

class Topic(models.Model):
    name = models.CharField(max_length=200, unique=True)   

    def __str__(self):
        return self.name

# Create your models here.
class Room(models.Model):
    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True) # Allow table to exist if empty, allow saving when empty.
    # participants = 
    updated = models.DateTimeField(auto_now=True) # timestamp every time edited.
    created = models.DateTimeField(auto_now_add=True) # timestamp first time created.

    def __str__(self):
        return str([self.name, self.topic, self.description, self.host])

#1 to many
class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now=True) # timestamp every time edited.
    created = models.DateTimeField(auto_now_add=True) # timestamp first time created.

    def __str__(self):
        return str([self.body, self.user])

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=200)
    # These will both have to be switched to the static files but for now I am directing it like this.
    pfp = models.ImageField(null=True, upload_to="pfp", default="add.svg")
    banner = models.ImageField(null=True, upload_to="banners", default="default_banner.png")

    def __str__(self):
        return str([self.user, self.bio])

class Test(models.Model):
    name = models.TextField()
    def __str__(self):
        return self.name