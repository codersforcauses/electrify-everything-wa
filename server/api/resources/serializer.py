from rest_framework import serializers
from .models import Resource, ResourceType

# Serializer for our resources model to api view


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = "__all__"

    def validate(self, attrs):
        resource_type = attrs.get("type", getattr(self.instance, "type", None))  # third is default arg
        body = attrs.get("body", getattr(self.instance, "body", None))
        file_name = attrs.get("file_name", getattr(self.instance, "body", None))
        file_url = attrs.get("file_url", getattr(self.instance, "file_url", None))
        if resource_type == ResourceType.PAGE and not body:  # body returned none
            raise serializers.ValidationError({"Body is required for page resources"})
        if resource_type == ResourceType.FILE:
            errors = {}
            if not file_url:
                errors["file_url"] = "file url required"
            if not file_name:
                errors["file_name"] = "file name required"
