from rest_framework import serializers
from LoginForm.models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('UserId', 'UserName', 'UserLastName', 
        'UserPassword', 'UserPosition'
        )