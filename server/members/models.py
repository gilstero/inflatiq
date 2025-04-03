from django.db import models


class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(blank=False)
    password = models.CharField(blank=False, max_length=30)
    profilename = models.CharField(blank=True, max_length=30, null=True)
    admin = models.BooleanField(default=False, blank=False)
    creation = models.DateTimeField(blank=False)

    def __str__(self):
        return self.profilename