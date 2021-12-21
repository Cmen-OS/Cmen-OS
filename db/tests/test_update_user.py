import pytest

from db.models import Operador


@pytest.mark.django_db
def test_update_operador(db):
    operador = Operador.objects.create(ci="897987", razon_social="mostrencvo", domicilio="senkata", telefono="1234567"
                                       , email="seguloco@gamil.com", nombre="pedrito", apellido="locus",
                                       password="123pass", root=0, autorizado=0)
    operador.nombre = "fabito"
    operador.apellido = "segurondo"
    operador.email = "fabian@gmail.com"
    operador.save()
    operador_from_db = Operador.objects.get(nombre="fabito", apellido= "segurondo" , email= "fabian@gmail.com")
    assert operador_from_db.nombre == "fabito"
    assert operador_from_db.apellido == "segurondo"
    assert operador_from_db.email == "fabian@gmail.com"


