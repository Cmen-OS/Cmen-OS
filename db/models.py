from django.db import models


class Taxonomia(models.Model):
    especie = models.CharField(max_length=255, help_text="Especie del animal", primary_key=True)
    familia = models.CharField(max_length=255, help_text="Familia del animal")
    orden = models.CharField(max_length=255, help_text="Orden del animal")
    genero = models.CharField(max_length=255, help_text="Genero del animal")
    subespecie = models.CharField(max_length=255, help_text="Subespecie del animal")


class Archivo(models.Model):
    ruta = models.CharField(max_length=255, primary_key=True, help_text="Direccion del archivo")
    peso = models.CharField(max_length=255, help_text="Peso del archivo")
    nombre = models.CharField(max_length=255, help_text="Nombre del archivo")
    creado = models.DateField(help_text="Fecha de cracion del archivo")
    tipo = models.CharField(max_length=8, help_text="Extension del archivo para saber su tipo")


class Operador(models.Model):
    ci = models.CharField(max_length=15, help_text="Cedula de indentidad del trabajador", primary_key=True)
    razon_social = models.CharField(max_length=255, help_text="Razon social del trabajador")
    domicilio = models.CharField(max_length=255, help_text="Direccion de domicilio del trabajador")
    telefono = models.CharField(max_length=255, help_text="Numero de telefono del trabajador")
    email = models.CharField(max_length=255, help_text="Direccion de correo electronico del trabajador")
    nombre = models.CharField(max_length=255, help_text="Nombre del trabajador")
    apellido = models.CharField(max_length=255, help_text="Apellido del trabajador")
    password = models.CharField(max_length=255)
    root = models.BooleanField(help_text="0 si es un trabajador normal, 1 si es super usuario")
    autorizado = models.BooleanField(help_text="0 si no esta autorizado, 1 si esta autorizado")


class Microchip(models.Model):
    nro = models.IntegerField(help_text="Numero unico del microchip.", primary_key=True)
    fecha = models.DateField(help_text="Fecha de registro del microchip")
    peso = models.IntegerField()
    tamano = models.IntegerField()
    caracteristicas_fenotipicas = models.TextField()
    datos_vacunacion = models.TextField()
    observaciones = models.TextField()
    ci = models.ForeignKey(Operador, on_delete=models.SET_NULL, null=True, blank=True)


class Animal(models.Model):
    nombre_criollo = models.CharField(max_length=255)
    nombre_comun = models.CharField(max_length=255)
    nombre_propio = models.CharField(max_length=255)
    ruta_archivo = models.ForeignKey(Archivo, on_delete=models.CASCADE)
    edad = models.CharField(max_length=255)
    procedencia = models.CharField(max_length=255)
    especie = models.ForeignKey(Taxonomia, on_delete=models.SET_NULL, null=True, blank=True)
    cod_int = models.ForeignKey(Microchip, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_recepcion = models.DateField()
    sexo = models.CharField(max_length=20)
    estado_salud = models.CharField(max_length=255)
    detalles_salud = models.TextField()


class Registro(models.Model):
    nro_acta_decomiso = models.IntegerField()
    fecha_registro = models.DateField()
    CCFS = models.CharField(max_length=255)
    modalidad_funcionamiento = models.CharField(max_length=255)
    area = models.CharField(max_length=255)
    lugar_exposicion = models.CharField(max_length=255)
    motivo_recepcion = models.CharField(max_length=255)
    ci_recibido_por = models.ForeignKey(Operador, on_delete=models.SET_NULL, null=True, blank=True, related_name="recibidor")
    ci_autorizado_por = models.ForeignKey(Operador, on_delete=models.SET_NULL, null=True, blank=True, related_name="autorizador")
    nro_acta_traslado = models.IntegerField()
    nro_MMAA = models.IntegerField()
    id_animal = models.ForeignKey(Animal, on_delete=models.SET_NULL, null=True, blank=True)


class Baja(models.Model):
    fecha = models.DateField()
    fecha_deceso = models.DateField()
    CCFS = models.CharField(max_length=255)
    modalidad_funcionamiento = models.CharField(max_length=255)
    ci = models.ForeignKey(Operador, on_delete=models.SET_NULL, null=True, blank=True)
    direccion_archivo = models.ForeignKey(Archivo, on_delete=models.SET_NULL, null=True, blank=True)
    nombre_guarda_fauna = models.CharField(max_length=255)
    nombre_veterinario = models.CharField(max_length=255)
    nombre_director = models.CharField(max_length=255)
    nro_MMAA = models.IntegerField()
    id_animal = models.ForeignKey(Animal, on_delete=models.SET_NULL, null=True, blank=True)
    motivo_salida = models.TextField()
    causa_deceso = models.TextField()
    lesiones = models.TextField()
    diagnostico_deceso = models.TextField()
