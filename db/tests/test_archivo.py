import pytest

from db.models import Archivo


@pytest.mark.django_db
def test_create_archivo():
    archivo = Archivo.objects.create(ruta=1, peso="100 kg", nombre="felix el tigre",
                                     creado="2021-12-28", tipo="png")

    assert archivo.ruta == 1
    assert archivo.peso == "100 kg"
    assert archivo.nombre == "felix el tigre"
    assert archivo.creado == "2021-12-28"
    assert archivo.tipo == "png"
