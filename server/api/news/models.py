import uuid
from django.db import models

# Create your models here.


class News(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    summary = models.TextField(blank=True)
    body = models.TextField(blank=True)
    author = models.CharField(max_length=255, blank=True)
    published_at = models.DateField(blank=True)
    image = models.ImageField(upload_to='', blank=True, null=True)

    def __str__(self):
        return self.title
