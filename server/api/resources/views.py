from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Resource
from .serializer import ResourceSerializer

# Create your views here.


@api_view(["GET", "POST"])
def resource_list(request):
    if request.method == "GET":
        slug = request.query_params.get("slug", None)
        if slug:
            resources = Resource.objects.filter(slug=slug)
        else:
            resources = Resource.objects.all()
        serializer = ResourceSerializer(
            resources,
            many=True,
            context={"request": request},
        )
        return Response(serializer.data)
    serializer = ResourceSerializer(
        data=request.data,
        context={"request": request},
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
