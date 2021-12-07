# from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from db.models import Animal
from db.models import Operador
from db.models import Archivo
from db.models import Registro
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
        nro_acta_decomiso = request.data['nro_acta_decomiso']
        fecha_registro = request.data['fecha_registro']
        CCFS = request.data['CCFS']
        modalidad_funcionamiento = request.data['modalidad_funcionamiento']
        area = request.data['area']
        lugar_exposicion = request.data['lugar_exposicion']
        motivo_recepcion = request.data['motivo_recepcion']
        nro_acta_traslado = request.data['nro_acta_traslado']
        nro_MMAA = request.data['nro_MMAA']
        id_animal_id = request.data['id_animal_id']
        ci_autorizado_por_id = request.data['ci_autorizado_por_id']
        ci_recibido_por_id = request.data['ci_recibido_por_id']

        nombre_criollo = request.data['nombre_criollo']
        nombre_comun = request.data['nombre_comun']
        nombre_propio = request.data['nombre_propio']
        edad = request.data['edad']
        procedencia = request.data['procedencia']
        fecha_recepcion = request.data['fecha_recepcion']
        sexo = request.data['sexo']
        estado_salud = request.data['estado_salud']
        detalles_salud = request.data['detalles_salud']
        cod_int_id = request.data['cod_int_id']
        especie_id = request.data['especie_id']
        ruta_archivo_id = request.data['ruta_archivo_id']

        aux = Archivo.objects.get(ruta=ruta_archivo_id)

        b = Animal.objects.create(nombre_criollo=nombre_criollo, nombre_comun=nombre_comun,
                                  nombre_propio=nombre_propio,
                                  edad=edad, procedencia=procedencia, fecha_recepcion=fecha_recepcion, sexo=sexo,
                                  estado_salud=estado_salud, detalles_salud=detalles_salud, cod_int_id=None,
                                  especie_id=None,
                                  ruta_archivo=aux)

        aux2 = Operador.objects.get(email__icontains=ci_recibido_por_id)
        aux3 = Operador.objects.get(nombre=ci_autorizado_por_id)

        c = Registro.objects.create(nro_acta_decomiso=nro_acta_decomiso, fecha_registro=fecha_registro, CCFS=CCFS,
                                    modalidad_funcionamiento=modalidad_funcionamiento, area=area,
                                    lugar_exposicion=lugar_exposicion, motivo_recepcion=motivo_recepcion,
                                    ci_recibido_por=aux2, ci_autorizado_por=aux3, nro_acta_traslado=nro_acta_traslado,
                                    nro_MMAA=nro_MMAA, id_animal=b)
        return JsonResponse(data=c, status=status.HTTP_201_CREATED)


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
        nombre_criollo = request.data['nombre_criollo']
        nombre_comun = request.data['nombre_comun']
        nombre_propio = request.data['nombre_propio']
        edad = request.data['edad']
        procedencia = request.data['procedencia']
        fecha_recepcion = request.data['fecha_recepcion']
        sexo = request.data['sexo']
        estado_salud = request.data['estado_salud']
        detalles_salud = request.data['detalles_salud']
        cod_int_id = request.data['cod_int_id']
        especie_id = request.data['especie_id']
        ruta_archivo_id = request.data['ruta_archivo_id']

        aux = Archivo.objects.get(ruta=ruta_archivo_id)

        b = Animal.objects.create(nombre_criollo=nombre_criollo, nombre_comun=nombre_comun,
                                  nombre_propio=nombre_propio,
                                  edad=edad, procedencia=procedencia, fecha_recepcion=fecha_recepcion, sexo=sexo,
                                  estado_salud=estado_salud, detalles_salud=detalles_salud, cod_int_id=None,
                                  especie_id=None,
                                  ruta_archivo=aux)
        return JsonResponse(data=b, status=status.HTTP_201_CREATED)


@api_view(['POST', 'PUT'])
def operador(request):
    if request.method == 'POST':
        operador_data = JSONParser().parse(request)
        operador_serializer = OperadorSerializer(data=operador_data)
        if operador_serializer.is_valid():
            operador_serializer.save()
            return JsonResponse(operador_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(operador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        operator = Operador.objects.all()
        operador_data = JSONParser().parse(request)
        ci = request.GET.get('ci', None)
        if ci is not None:
            operator = operator.filter(ci__icontains=ci)
        operador_serializer = OperadorSerializer(operator, data=operador_data)
        if operador_serializer.is_valid():
            operador_serializer.save()
            return JsonResponse(operador_serializer.data)
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
        if request.data['ruta'] is not None:
            ruta = request.data['ruta']
            peso = request.data['peso']
            nombre = request.data['nombre']
            creado = request.data['creado']
            tipo = ruta[-4:]
            file = request.data['file']

            a = Archivo.objects.create(ruta=ruta, peso=peso, nombre=nombre, creado=creado, tipo=tipo, file=file)
            return JsonResponse(data=a, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def operador_detail(request, pk):
    try:
        operador = Operador.objects.get(pk=pk)
    except Operador.DoesNotExist:
        return JsonResponse({'message': 'El operador no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        operador_serializer = OperadorSerializer(operador)
        return JsonResponse(operador_serializer.data)
    elif request.method == 'PUT':
        operador_data = JSONParser().parse(request)
        operador_serializer = OperadorSerializer(operador, data=operador_data)
        if operador_serializer.is_valid():
            operador_serializer.save()
            return JsonResponse(operador_serializer.data)
        return JsonResponse(operador_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        operador.delete()
        return JsonResponse({'message': 'El operador fue eliminado correctamente!'}, status=status.HTTP_204_NO_CONTENT)
