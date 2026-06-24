import uuid
from django.db import models

# Create your models here.

class News(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    summary = models.TextField(blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    published_at = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.title