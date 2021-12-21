import pytest

from db.models import Taxonomia


@pytest.mark.django_db
def test_create_Taxonomia():
    taxonomia = Taxonomia.objects.create(especie= "mamiferos", familia= "atigrado", orden= "felino",
                                         genero= "macho", subespecie= "carnivoros")

    assert taxonomia.especie == "mamiferos"
    assert taxonomia.familia == "atigrado"
    assert taxonomia.orden == "felino"
    assert taxonomia.genero == "macho"
    assert taxonomia.subespecie == "carnivoros"




