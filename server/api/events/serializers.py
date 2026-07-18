from rest_framework import serializers
from .models import Event, EventInstance


class EventInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventInstance
        fields = [
            "id",
            "event",
            "name",
            "starts_at",
            "ends_at",
            "location",
            "region",
            "ticket_url"
        ]
        read_only_fields = ["id"]

    def validate(self, data):

        if data['starts_at'] >= data['ends_at']:
            raise serializers.ValidationError("Finish time must occur after start time")
        return data


class EventSerializer(serializers.ModelSerializer):
    instances = EventInstanceSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "cover_image",
            "instances",
        ]
