# from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from db.models import Animal
from db.models import Operador
from db.models import Archivo
# from db.models import Registro
from db.serializers import AnimalSerializer
from db.serializers import OperadorSerializer
from db.serializers import ArchivoSerializer
from db.serializers import RegistroSerializer
from rest_framework.decorators import api_view


@api_view(['GET'])
def login(request):
    if request.method == 'GET':
        operator = Operador.objects.all()

        nombre = request.GET.get('email', None)
        if nombre is not None:
            operator = operator.filter(email__icontains=nombre)

        operador_serializer = OperadorSerializer(operator, many=True)
        return JsonResponse(operador_serializer.data, safe=False)


@api_view(['POST'])
def admin(request):
    if request.method == 'POST':
        operador_data = JSONParser().parse(request)
        operador_serializer = OperadorSerializer(data=operador_data)
        if operador_serializer.is_valid():
            operador_serializer.save()
            return JsonResponse(operador_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(operador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registro(request):
    if request.method == 'POST':
        registro_data = JSONParser().parse(request)
        registro_serializer = RegistroSerializer(data=registro_data)
        if registro_serializer.is_valid():
            registro_serializer.save()
            return JsonResponse(registro_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(registro_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def animal(request):
    if request.method == 'GET':
        animals = Animal.objects.all()

        nombre = request.GET.get('nombre_propio', None)
        if nombre is not None:
            animals = animals.filter(nombre_propio__icontains=nombre)

        animal_serializer = AnimalSerializer(animals, many=True)
        return JsonResponse(animal_serializer.data, safe=False)
    elif request.method == 'POST':
        animal_data = JSONParser().parse(request)
        animal_serializer = AnimalSerializer(data=animal_data)
        if animal_serializer.is_valid():
            animal_serializer.save()
            return JsonResponse(animal_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(animal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def operador(request):
    """try:
        operator = Operador.objects.get(pk=pk)
    except Operador.DoesNotExist:
        return JsonResponse({'message': 'The operator does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        operador_serializer = OperadorSerializer(operator)
        return JsonResponse(operador_serializer)"""
    if request.method == 'GET':
        operator = Operador.objects.all()

        nombre = request.GET.get('ci', None)
        if nombre is not None:
            operator = operator.filter(ci__icontains=nombre)

        operador_serializer = OperadorSerializer(operator, many=True)
        return JsonResponse(operador_serializer.data, safe=False)
    elif request.method == 'POST':
        operador_data = JSONParser().parse(request)
        operador_serializer = OperadorSerializer(data=operador_data)
        if operador_serializer.is_valid():
            operador_serializer.save()
            return JsonResponse(operador_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(operador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def archivo(request):
    """try:
        file = Archivo.objects.get(pk=pk)
    except Operador.DoesNotExist:
        return JsonResponse({'message': 'The file does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        archivo_serializer = ArchivoSerializer(file)
        return JsonResponse(archivo_serializer)"""
    if request.method == 'GET':
        file = Archivo.objects.all()

        nombre = request.GET.get('ruta', None)
        if nombre is not None:
            file = file.filter(ruta__icontains=nombre)

        archivo_serializer = ArchivoSerializer(file, many=True)
        return JsonResponse(archivo_serializer.data, safe=False)
    elif request.method == 'POST':
        archivo_data = JSONParser().parse(request)
        archivo_serializer = ArchivoSerializer(data=archivo_data)
        if archivo_serializer.is_valid():
            archivo_serializer.save()
            return JsonResponse(archivo_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(archivo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
