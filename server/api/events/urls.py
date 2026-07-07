from rest_framework.routers import DefaultRouter
from .views import EventViewSet, EventInstanceViewSet

router = DefaultRouter()
router.register("event-instances", EventInstanceViewSet, basename="event-instance")
router.register("", EventViewSet, basename="event")

urlpatterns = router.urls
