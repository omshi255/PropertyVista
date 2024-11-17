from django.contrib import admin
from .models import Property
from .models import SliderProperty
from .models import PropertyAgent
admin.site.register(Property)
admin.site.register(SliderProperty)
admin.site.register(PropertyAgent)