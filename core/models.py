from django.db import models


# Create your models here.
class Weights(models.Model):
    id = models.AutoField(primary_key=True)
    UserID = models.IntegerField()
    weight_val = models.IntegerField()
    time = models.DateField()
    unit = models.TextField(default="lb")

    def __str__(self):
        return "ID " + str(self.UserID) + " with " + str(self.weight_val)


class Sleeping(models.Model):
    id = models.AutoField(primary_key=True)
    UserID = models.IntegerField()
    sleep_dur = models.FloatField()
    start = models.TimeField()
    end = models.TimeField()
    unit = models.TextField(default="H")

    def __str__(self):
        return str(self.UserID) + "with " + str(self.sleep_dur)


class Walking(models.Model):
    id = models.AutoField(primary_key=True)
    UserID = models.IntegerField()
    Walking_val = models.FloatField()
    time = models.TextField()
    time_created = models.DateField(auto_now=True)
    Steps = models.IntegerField()
    unit = models.TextField(default="km")

    def __str__(self):
        return str(self.UserID) + "with " + str(self.Walking_val)



class Calorie(models.Model):
    id = models.AutoField(primary_key=True)
    UserID = models.IntegerField()
    in_val = models.IntegerField()
    out_val = models.IntegerField()
    in_unit = models.TextField(default="cal")
    out_unit = models.TextField(default="cal")
    time = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.UserID) + "Cal stats " + str(self.time)


class Myuser(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.TextField()
    Password = models.TextField()
    Email = models.TextField(default="")
    created = models.DateField(auto_now=True)

    def __str__(self):
        return str(self.UserID) + " " + str(self.Username)
