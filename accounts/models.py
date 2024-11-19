from django.db import models

class Property(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)  
    image = models.ImageField(upload_to='properties/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


#slider property


class SliderProperty(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    description = models.TextField(blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255)  
    rating = models.FloatField(default=0.0)  # Rating field

    def __str__(self):
        return self.title


#contact agents
from django.db import models

class PropertyAgent(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    property_location = models.CharField(max_length=100)
    property_description = models.TextField()
    property_image = models.ImageField(upload_to='agents_images/', blank=True)

    def __str__(self):
        return f"{self.name} - {self.property_location}"
#notifications
