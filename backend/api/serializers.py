from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('first_name', 'last_name', 'sex', 'birth_date', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
    
        try:
            validate_password(password, user)
        except exceptions.ValidationError as error:
            serializer_error = serializers.as_serializer_error(error)
            raise serializers.ValidationError({'password': serializer_error['non_field_errors']})

        return data
    

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            sex = validated_data['sex'],
            birth_date = validated_data['birth_date'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'sex', 'birth_date', 'email')