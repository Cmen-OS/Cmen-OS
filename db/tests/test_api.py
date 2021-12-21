import pytest

from rest_framework.authtoken.models import Token


@pytest.fixture
def get_or_create_token(db, create_user):
    user = create_user()
    token, _ = Token.objects.get_or_create(user=user)
    return token


def test():
    assert 1 == 1
