# from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from db.models import Animal, Baja
from db.models import Operador
from db.models import Archivo
from db.models import Registro
from db.models import Taxonomia
from db.serializers import TaxonomiaSerializer
from db.serializers import AnimalSerializer
from db.serializers import OperadorSerializer
from db.serializers import ArchivoSerializer
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

        esp = Taxonomia.objects.get(especie=especie_id)

        b = Animal.objects.create(nombre_criollo=nombre_criollo, nombre_comun=nombre_comun,
                                  nombre_propio=nombre_propio,
                                  edad=edad, procedencia=procedencia, fecha_recepcion=fecha_recepcion, sexo=sexo,
                                  estado_salud=estado_salud, detalles_salud=detalles_salud, cod_int_id=None,
                                  especie=esp, ruta_archivo=aux, vivo=True)

        aux2 = Operador.objects.get(email__icontains=ci_recibido_por_id)
        aux3 = Operador.objects.get(email__icontains=ci_autorizado_por_id)

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

        nombre = request.GET.get('nombre_comun', None)
        if nombre is not None:
            animals = animals.filter(nombre_comun__icontains=nombre)
        else:
            nombre = request.GET.get('id', None)
            if nombre is not None:
                animals = animals.filter(id=nombre)
            else:
                nombre = request.GET.get('especie', None)
                if nombre is not None:
                    animals = animals.filter(especie=nombre)
                else:
                    nombre = request.GET.get('edad', None)
                    if nombre is not None:
                        animals = animals.filter(edad__icontains=nombre)
                    else:
                        nombre = request.GET.get('sexo', None)
                        if nombre is not None:
                            animals = animals.filter(sexo__icontains=nombre)

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
                                  especie_id=None, ruta_archivo=aux, vivo=True)
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


@api_view(['POST'])
def baja(request):
    if request.method == 'POST':
        CCFS = request.data['CCFS']
        fecha = request.data['fecha']
        fecha_deceso = request.data['fecha_deceso']
        modalidad_funcionamiento = request.data['modalidad_funcionamiento']
        nombre_guarda_fauna = request.data['nombre_guarda_fauna']
        nombre_veterinario = request.data['nombre_veterinario']
        nombre_director = request.data['nombre_director']
        nro_MMAA = request.data['nro_MMAA']
        motivo_salida = request.data['motivo_salida']
        causa_deceso = request.data['causa_deceso']
        lesiones = request.data['lesiones']
        diagnostico_deceso = request.data['diagnostico_deceso']

        ci = request.data['ci']
        direccion_archivo = request.data['direccion_archivo']
        direccion_archivo_laboratorio = request.data['direccion_archivo_laboratorio']
        id_animal_id = request.data['id_animal_id']

        aux = Archivo.objects.get(ruta=direccion_archivo)
        aux2 = Archivo.objects.get(ruta=direccion_archivo_laboratorio)
        Animal.objects.filter(id=id_animal_id).update(vivo=False)
        aux4 = Operador.objects.get(ci=ci)

        aux3 = Animal.objects.get(id=id_animal_id)

        c = Baja.objects.create(CCFS=CCFS, fecha=fecha, fecha_deceso=fecha_deceso,
                                modalidad_funcionamiento=modalidad_funcionamiento,
                                nombre_guarda_fauna=nombre_guarda_fauna, nombre_veterinario=nombre_veterinario,
                                nombre_director=nombre_director, nro_MMAA=nro_MMAA, motivo_salida=motivo_salida,
                                causa_deceso=causa_deceso, lesiones=lesiones, diagnostico_deceso=diagnostico_deceso,
                                ci=aux4, direccion_archivo=aux, direccion_archivo_laboratorio=aux2,
                                id_animal=aux3)

        return JsonResponse(data=c, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def taxonomia(request):
    if request.method == 'POST':
        taxonomia_data = JSONParser().parse(request)
        taxonomia_serializer = TaxonomiaSerializer(data=taxonomia_data)
        if taxonomia_serializer.is_valid():
            taxonomia_serializer.save()
            return JsonResponse(taxonomia_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(taxonomia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def taxonomia_detail(request, pk):
    try:
        taxonomi = Taxonomia.objects.get(pk=pk)
    except Taxonomia.DoesNotExist:
        return JsonResponse({'message': 'La taxonomia no existe'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        taxonomia_serializer = TaxonomiaSerializer(taxonomi)
        return JsonResponse(taxonomia_serializer.data)
    elif request.method == 'PUT':
        taxonomia_data = JSONParser().parse(request)
        taxonomia_serializer = TaxonomiaSerializer(taxonomi, data=taxonomia_data)
        if taxonomia_serializer.is_valid():
            taxonomia_serializer.save()
            return JsonResponse(taxonomia_serializer.data)
        return JsonResponse(taxonomia_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        taxonomi.delete()
        return JsonResponse({'message': 'La taxonomia fue eliminado correctamente!'}, status=status.HTTP_204_NO_CONTENT)
