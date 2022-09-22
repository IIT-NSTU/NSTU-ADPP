from rest_framework.permissions import BasePermission


class isStudentUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_student)


class isChairmanUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_chairman)
