from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_collection = db['todos']

class TodoListView(APIView):

    def get(self, request):
        try:
            todos = list(todos_collection.find())

            # Convert the MongoDB documents to a list of dictionaries
            todo_list = []
            for todo in todos:
                todo_list.append({
                    'id': str(todo['_id']),
                    'description': todo['description'],
                })
            return Response(todo_list, status=status.HTTP_200_OK)
        except Exception:
            return Response({"error":"An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            data = request.data
            description = data.get('description', False)

            if not description:
                return Response({"error":"Description can't be empty"}, status=status.HTTP_400_BAD_REQUEST)

            # Insert the todo item into the MongoDB collection
            todos_collection.insert_one({'description': description})
            return Response({"result":"ok"}, status=status.HTTP_201_CREATED)
        except Exception:
            return Response({"error":"An error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

