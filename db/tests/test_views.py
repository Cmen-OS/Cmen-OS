import pytest

from django.contrib.auth.models import User

from django.urls import reverse


@pytest.mark.django_db
def test_user_create():
    User.objects.create_user('fabinsk', 'segurondoferrel@gamil.com', 'fabupassword')
    assert User.objects.count() == 1



