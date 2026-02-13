from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


def home(request):
    return render(request, 'temp.html')

def about(request):
    return render(request, 'temp.html')

