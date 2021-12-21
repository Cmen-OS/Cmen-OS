import pytest

import pytest

from db.models import Operador


@pytest.mark.django_db
def test_create_operador():
    operador = Operador.objects.create(ci="897987", razon_social="mostrencvo", domicilio="senkata", telefono="1234567"
                                       , email="seguloco@gamil.com", nombre="pedrito", apellido="locus",
                                       password="123pass", root=0, autorizado=0)

    assert operador.ci == "897987"
    assert operador.razon_social == "mostrencvo"
    assert operador.domicilio == "senkata"
    assert operador.telefono == "1234567"
    assert operador.email == "seguloco@gamil.com"
    assert operador.nombre == "pedrito"
    assert operador.apellido == "locus"
    assert operador.password == "123pass"
    assert operador.root == 0
    assert operador.autorizado == 0

