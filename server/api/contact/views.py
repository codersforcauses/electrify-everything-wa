from django.shortcuts import render
from rest_framework import viewsets
from .serializers import Contact
from .models import Contact

# Create your views here.
class ContactView(viewsets.ModelViewSet):
    serializer_class = Contact
    queryset = Contact.objects.all()
    
    