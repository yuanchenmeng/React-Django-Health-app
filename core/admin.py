from django.contrib import admin

from django.contrib import admin

# Register your models here.
from .models import Weights
from .models import Sleeping
from .models import Walking
from .models import Calorie
from .models import Myuser


admin.site.register(Weights)
admin.site.register(Sleeping)
admin.site.register(Walking)
admin.site.register(Calorie)
admin.site.register(Myuser)

