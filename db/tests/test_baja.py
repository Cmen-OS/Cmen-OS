import pytest

from db.models import Baja, Operador, Archivo, Animal


@pytest.mark.django_db
def test_create_baja():
    baja = Baja.objects.create(fecha="2021-12-28", fecha_deceso="2028-12-28", CCFS="ninguno",
                               modalidad_funcionamiento="zoo",
                               nombre_guarda_fauna="taqui", nombre_veterinario="joel", nombre_director="acho",
                               nro_MMAA=26,
                               motivo_salida="deceso", causa_deceso="intoxicacion",
                               lesiones="fractura",
                               diagnostico_deceso="muchas dolencias")

    assert baja.fecha == "2021-12-28"
    assert baja.fecha_deceso == "2028-12-28"
    assert baja.CCFS == "ninguno"
    assert baja.modalidad_funcionamiento == "zoo"
    assert baja.nombre_guarda_fauna == "taqui"
    assert baja.nombre_veterinario == "joel"
    assert baja.nombre_director == "acho"
    assert baja.nro_MMAA == 26
    assert baja.motivo_salida == "deceso"
    assert baja.causa_deceso == "intoxicacion"
    assert baja.lesiones == "fractura"
    assert baja.diagnostico_deceso == "muchas dolencias"
