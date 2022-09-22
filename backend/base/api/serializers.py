import email

from base.models import (Chairman, ProvisionalCertificate, Student,
                         StudentResult, User, testTable)
from django.contrib.auth import authenticate
from pyexpat import model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "is_student",
                  "is_chairman", "email_validation", "new_email_validation", 'is_provost', 'is_librarian', 'is_courier', 'is_examController']


class emailChangeSerializer(serializers.ModelSerializer):
    newEmail = serializers.EmailField()

    class Meta:
        model = User
        fields = ["oldEmail", "newEmail"]

    def save(self, **kwargs):
        user = User.objects.get(email=self.validated_data['oldEmail'])
        print(user, "in user")
        user.new_email = self.validated_data["newEmail"]
        user.new_email_validation = False
        user.save()
        return user


class chairmanSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["fullname", "email", "password", "password2"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def save(self, **kwargs):
        user = User(
            fullname=self.validated_data["fullname"],
            email=self.validated_data["email"],
        )
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError(
                {"error": "Password do not match"})
        user.set_password(password)
        user.is_chairman = True
        user.save()

        Chairman.objects.create(user=user)
        return user


class studentSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["fullname", "email", "password", "password2"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def save(self, **kwargs):
        user = User(
            fullname=self.validated_data["fullname"],
            email=self.validated_data["email"],
        )
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        if password != password2:
            raise serializers.ValidationError(
                {"error": "Password do not match"})
        user.set_password(password)
        user.is_student = True
        user.save()
        Student.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


# <---- Provisional certifiate model serialize ---->

class ProvisionalCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProvisionalCertificate
        fields = "__all__"
        depth = 1


class testSerializer(serializers.ModelSerializer):
    class Meta:
        model = testTable
        fields = "__all__"
