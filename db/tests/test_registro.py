import pytest

from db.models import Registro
from db.models import Operador
from db.models import Animal

@pytest.mark.django_db
def test_create_registro():
    registro = Registro.objects.create(nro_acta_decomiso=28, fecha_registro= "2021-12-28", CCFS= "nose", modalidad_funcionamiento= "null",
                                       area="silvestre", lugar_exposicion="fosa", motivo_recepcion= "rescate",
                                       nro_acta_traslado=10, nro_MMAA= 12)

    assert registro.nro_acta_decomiso == 28
    assert registro.fecha_registro == "2021-12-28"
    assert registro.CCFS == "nose"
    assert registro.modalidad_funcionamiento == "null"
    assert registro.area == "silvestre"
    assert registro.lugar_exposicion == "fosa"
    assert registro.motivo_recepcion == "rescate"
    assert registro.nro_acta_traslado == 10
    assert registro.nro_MMAA == 12




