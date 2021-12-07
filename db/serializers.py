from rest_framework import serializers
from db.models import Animal
from db.models import Operador
from db.models import Registro
from db.models import Archivo


class AnimalSerializer(serializers.ModelSerializer):
    ruta_archivo_id = serializers.RelatedField(source='archivo', read_only=True)
    cod_int_id = serializers.RelatedField(source='microchip', read_only=True)
    especie_id = serializers.RelatedField(source='taxonomia', read_only=True)

    class Meta:
        model = Animal
        fields = ('id',
                  'nombre_criollo',
                  'nombre_comun',
                  'nombre_propio',
                  'edad',
                  'procedencia',
                  'fecha_recepcion',
                  'sexo',
                  'estado_salud',
                  'detalles_salud',
                  'cod_int_id',
                  'especie_id',
                  'ruta_archivo_id'
                  )


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = ('ruta',
                  'peso',
                  'nombre',
                  'creado',
                  'tipo',
                  'file'
                  )


class OperadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operador
        fields = ('ci',
                  'razon_social',
                  'domicilio',
                  'telefono',
                  'email',
                  'nombre',
                  'root',
                  'autorizado',
                  'apellido',
                  'password'
                  )


class RegistroSerializer(serializers.ModelSerializer):
    id_animal_id = serializers.RelatedField(source='animal', read_only=True)
    ci_autorizado_por_id = serializers.RelatedField(source='operador', read_only=True)
    ci_recibido_por_id = serializers.RelatedField(source='operador', read_only=True)

    class Meta:
        model = Registro
        fields = ('id',
                  'nro_acta_decomiso',
                  'fecha_registro',
                  'CCFS',
                  'modalidad_funcionamiento',
                  'area',
                  'lugar_exposicion',
                  'motivo_recepcion',
                  'nro_acta_traslado',
                  'nro_MMAA',
                  'id_animal_id',
                  'ci_autorizado_por_id',
                  'ci_recibido_por_id'
                  )
