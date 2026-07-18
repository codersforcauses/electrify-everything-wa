from rest_framework import viewsets


from .models import Event, EventInstance
from .serializers import EventSerializer, EventInstanceSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventInstanceViewSet(viewsets.ModelViewSet):
    queryset = EventInstance.objects.all()
    serializer_class = EventInstanceSerializer

    def get_queryset(self):
        queryset = EventInstance.objects.all()

        region = self.request.query_params.get("region")
        date = self.request.query_params.get("date")

        if region:
            queryset = queryset.filter(region=region)

        if date:
            queryset = queryset.filter(starts_at__date=date)

        return queryset
