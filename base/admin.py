from django.contrib import admin
from .models import Room
from .models import Topic
from .models import Message
from .models import Person
from .models import Test
from .models import Profile

# Register your models here.
admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
admin.site.register(Person)
admin.site.register(Profile)