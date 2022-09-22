from django.contrib import admin

from .models import (Chairman, Courier, Exam_Controller, Librarian,
                     ProvisionalCertificate, Provost, Student, StudentResult,
                     User, testTable)

# Register your models here.
admin.site.register(User)
admin.site.register(Student)
admin.site.register(StudentResult)
admin.site.register(ProvisionalCertificate)
admin.site.register(testTable)
admin.site.register(Chairman)
admin.site.register(Exam_Controller)
admin.site.register(Librarian)
admin.site.register(Provost)
admin.site.register(Courier)
