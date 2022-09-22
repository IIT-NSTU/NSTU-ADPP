from distutils.command import upload
from email.policy import default
from operator import mod

from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.translation import gettext_lazy as _
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework.authtoken.models import Token


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        print('hukka', extra_fields)
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=extra_fields['is_staff'],
                          is_active=extra_fields['is_active'],
                          is_superuser=extra_fields['is_superuser'],)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        print('hukka superuser')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    is_student = models.BooleanField(default=False)
    is_chairman = models.BooleanField(default=False)
    is_provost = models.BooleanField(default=False)
    is_librarian = models.BooleanField(default=False)
    is_examController = models.BooleanField(default=False)
    is_courier = models.BooleanField(default=False)
    email_validation = models.BooleanField(default=False)
    new_email = models.EmailField(null=True, blank=True, unique=True)
    new_email_validation = models.BooleanField(default=False)

    def __str__(self):
        return self.email


class Student(models.Model):
    user = models.OneToOneField(
        User, related_name="student_info", on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    email = models.CharField(
        max_length=50, unique=True)
    father_name = models.CharField(max_length=50)
    mother_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    department = models.CharField(max_length=50)
    roll = models.CharField(max_length=20, unique=True)
    hall = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    passing_year = models.CharField(max_length=20, null=True, blank=True)
    session = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.roll


class StudentResult(models.Model):
    student_details = models.OneToOneField(
        Student, related_name="student_result", on_delete=models.CASCADE)
    roll = models.CharField(max_length=20)
    first_semester = models.CharField(max_length=5)
    second_semester = models.CharField(max_length=5)
    third_semester = models.CharField(max_length=5)
    fourth_semester = models.CharField(max_length=5)
    fifth_semester = models.CharField(max_length=5)
    sixth_semester = models.CharField(max_length=5)
    seventh_semester = models.CharField(max_length=5)
    eighth_semester = models.CharField(max_length=5)
    total_credit_completed = models.CharField(max_length=5)
    cgpa = models.CharField(max_length=5)

    def __str__(self):
        return self.roll


def upload_path(instance, filename):
    return '/'.join(['ssc', filename])


class ProvisionalCertificate(models.Model):
    student_details = models.OneToOneField(
        Student, related_name="student_info_global", on_delete=models.CASCADE)
    result = models.OneToOneField(
        StudentResult, related_name="student_result_certificate", on_delete=models.CASCADE)
    is_applied = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    chairman_status = models.CharField(max_length=20, null=True, blank=True)
    chairman_action_date = models.DateField(null=True, blank=True)
    provost_status = models.CharField(max_length=20, null=True, blank=True)
    provost_action_date = models.DateField(null=True, blank=True)
    librarian_status = models.CharField(max_length=20, null=True, blank=True)
    librarian_action_date = models.DateField(null=True, blank=True)
    examController_status = models.CharField(
        max_length=20, null=True, blank=True)
    examController_action_date = models.DateField(null=True, blank=True)
    checkedBy = models.CharField(max_length=50, null=True, blank=True)
    serial_number = models.CharField(max_length=50, null=True, blank=True)
    issued_date = models.DateField(null=True, blank=True)
    takeBy = models.CharField(max_length=10, null=True, blank=True)
    courier_status = models.CharField(max_length=20, null=True, blank=True)
    courier_action_date = models.DateField(null=True, blank=True)
    courier_delivery_date = models.DateField(null=True, blank=True)
    courier_delivery_place = models.CharField(
        max_length=250, null=True, blank=True)
    ssc_certificate = models.ImageField(
        blank=True, null=True, upload_to=upload_path)
    provisional_certificate_url = models.CharField(
        max_length=250, null=True, blank=True)

    def __str__(self):
        return self.student_details.user.email


class Chairman(models.Model):
    user = models.OneToOneField(
        User, related_name="chairman", on_delete=models.CASCADE)
    chairman_id = models.CharField(max_length=50)

    def __str__(self):
        return self.user.email


class Provost(models.Model):
    user = models.OneToOneField(
        User, related_name="provost", on_delete=models.CASCADE)

    provost_id = models.CharField(max_length=50)

    def __str__(self):
        return self.user.email


class Librarian(models.Model):
    user = models.OneToOneField(
        User, related_name="librarian", on_delete=models.CASCADE)

    librarian_id = models.CharField(max_length=50)

    def __str__(self):
        return self.user.email


class Exam_Controller(models.Model):
    user = models.OneToOneField(
        User, related_name="exam_controller", on_delete=models.CASCADE)
    exam_controller_id = models.CharField(max_length=50)

    def __str__(self):
        return self.user.email


class Courier(models.Model):
    user = models.OneToOneField(
        User, related_name="courier", on_delete=models.CASCADE)
    Courier_id = models.CharField(max_length=50)

    def __str__(self):
        return self.user.email


class testTable(models.Model):
    name = models.CharField(max_length=20)
    roll = models.CharField(max_length=20)
    subject = models.CharField(max_length=20)
    arialfont = models.FileField(blank=True, null=True, upload_to="assets")
    italicFont = models.FileField(blank=True, null=True, upload_to="assets")
    scriptFont = models.FileField(blank=True, null=True, upload_to="assets")
    image = models.ImageField(blank=True, null=True, upload_to="assets")

    def __str__(self):
        return self.name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    password_reset_key = reset_password_token.key
    html_message = render_to_string(
        'password_reset_template.html', {'context': password_reset_key})
    plain_message = strip_tags(html_message)
    send_mail(
        "Password Reset for {title}".format(title="NSTU ODPP"),
        plain_message,
        "souravdebnath97@gmail.com",
        [reset_password_token.user.email],
        html_message=html_message
    )
