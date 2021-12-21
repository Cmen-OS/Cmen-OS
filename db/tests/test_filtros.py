import pytest

from db.models import Operador


@pytest.mark.django_db
def test_filter_operador(db):
    Operador.objects.create(nombre="user22", root=0, autorizado=0)
    assert Operador.objects.filter(nombre="user22", root=0, autorizado=0).exists()

