import pytest

from db.models import Microchip
from db.models import Operador
from db.models import Animal

@pytest.mark.django_db
def test_create_microchip():
    microchip  = Microchip.objects.create(nro= 23, fecha= "2021-12-28", peso= 120, tamano= 150,
                                          caracteristicas_fenotipicas="altura y macizo", datos_vacunacion= "vacuna covid19",
                                          observaciones="ninguna")

    assert microchip.nro == 23
    assert microchip.fecha == "2021-12-28"
    assert microchip.peso == 120
    assert microchip.tamano == 150
    assert microchip.caracteristicas_fenotipicas == "altura y macizo"
    assert microchip.datos_vacunacion == "vacuna covid19"
    assert microchip.observaciones == "ninguna"




