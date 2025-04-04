from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

class TodoViewSet(viewsets.ViewSet):
    def list(self, request):
        # Return static or mock data
        todos = [
            {"id": 1, "title": "Sample Task 1", "completed": False},
            {"id": 2, "title": "Sample Task 2", "completed": True},
        ]
        return Response(todos)

    def create(self, request):
        # Handle creating a new todo (mock response)
        new_todo = request.data
        new_todo["id"] = 3  # Mock ID
        return Response(new_todo, status=status.HTTP_201_CREATED)
