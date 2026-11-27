import uuid
from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

# Create your models here.


class ResourceType(models.TextChoices):
    PAGE = "page", "Page"
    FILE = "file", "File"


class Resource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date_made = models.DateField(default=timezone.now)
    author = models.CharField(blank=True, default="", max_length=50)
    image = models.ImageField(null=True, blank=True, upload_to="Resource", max_length=None, default=None)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    summary = models.TextField(default="", blank=True)
    type = models.CharField(max_length=10, choices=ResourceType.choices)
    body = models.TextField(default="", blank=True)
    # Used when type = file
    file_url = models.URLField(default="", blank=True)
    file_name = models.CharField(default="", max_length=255, blank=True)

    def __str__(self):
        return self.name

    def clean(self):
        if self.type == ResourceType.PAGE:
            if not self.body:
                raise ValidationError(
                    {"body": "Body is required for page resources."}
                )

        if self.type == ResourceType.FILE:
            errors = {}

            if not self.file_url:
                errors["file_url"] = "File URL is required for file resources."

            if not self.file_name:
                errors["file_name"] = "File name is required for file resources."

            if errors:
                raise ValidationError(errors)
