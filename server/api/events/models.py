from django.db import models
from django.core.exceptions import ValidationError
import uuid


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    cover_image = models.CharField(blank=True)

    def __str__(self):
        return self.name


class EventInstance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="instances",
    )
    name = models.CharField(max_length=255, blank=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    location = models.CharField(max_length=255)
    # region tag for location filtering
    region = models.CharField(max_length=255, blank=False, default="Perth")
    ticket_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.event.name} — {self.starts_at:%Y-%m-%d}"

    def clean(self):
        if self.ends_at and self.starts_at and self.ends_at <= self.starts_at:
            raise ValidationError(
                {"ends_at": "End time must be after start time."}
            )
