from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(models.Model):
    id = models.BigAutoField(primary_key=True, unique=True)
    email = models.EmailField(blank=False, unique=True)
    password = models.CharField(blank=False, max_length=30)
    profilename = models.CharField(blank=True, max_length=30, null=True)
    admin = models.BooleanField(default=False, blank=False)
    creation = models.DateTimeField(blank=False)

    def __str__(self):
        return self.profilename
    

class Basket(models.Model):
    basketid = models.ForeignKey(User, on_delete=models.CASCADE)
    grocery = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(1)], blank=True)
    house = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(1)], blank=True)
    auto = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(1)], blank=True)
    # add more baskets

    def __str__(self):
        return (f"Basket of goods for user {id}: {self.grocery}, {self.house}, {self.auto}")
