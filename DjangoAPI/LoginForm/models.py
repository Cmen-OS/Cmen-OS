from django.db import models

# Create your models here.

class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    UserName = models.CharField(max_length=100)
    UserLastName = models.CharField(max_length=100)
    UserPassword = models.CharField(max_length=100)
    UserPosition = models.CharField(max_length=100)