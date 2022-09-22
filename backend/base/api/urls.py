from django.urls import include, path, re_path
from wkhtmltopdf.views import PDFTemplateView

from .views import (GeneratePdf, LogoutView, VerifyEmail, applyProvisional,
                    chairmanAcceptProvisional, chairmanOnlyView,
                    chairmanRejectProvisional, chairmanSignupView,
                    continuousVerificationView, courierAcceptProvisional,
                    courierRejectProvisional, customAuthToken,
                    emailChangeVerifyView, emailChangeView,
                    examControllerAcceptProvisional,
                    examControllerRejectProvisional,
                    getProvisionalAcceptedListbyChairman,
                    getProvisionalAcceptedListbyCourier,
                    getProvisionalAcceptedListbyExamController,
                    getProvisionalAcceptedListbyLibrarian,
                    getProvisionalAcceptedListbyProvost,
                    getProvisionalAppliedListforChairman,
                    getProvisionalAppliedListforCourier,
                    getProvisionalAppliedListforExamController,
                    getProvisionalAppliedListforLibrarian,
                    getProvisionalAppliedListforProvost,
                    getProvisionalCertificateAppliedDetails,
                    getProvisionalCertificateAppliedList,
                    getProvisionalRejectedListbyChairman,
                    getProvisionalRejectedListbyCourier,
                    getProvisionalRejectedListbyExamController,
                    getProvisionalRejectedListbyLibrarian,
                    getProvisionalRejectedListbyProvost, getStudentDetails,
                    isEmailChanged, librarianAcceptProvisional,
                    librarianRejectProvisional, payProvisional,
                    provostAcceptProvisional, provostRejectProvisional,
                    studentOnlyView, studentSignupView, testApi, testpdfApi,
                    uploadSscCertificate)

urlpatterns = [
    path("signup/chairman/", chairmanSignupView.as_view(), name="chairman"),
    path("signup/student/", studentSignupView.as_view(), name="student"),

    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path("emailchange/", emailChangeView.as_view(), name="email-change"),
    path("emailchange-verify/", emailChangeVerifyView.as_view(),
         name="emailchange-verify"),

    path("login/", customAuthToken.as_view(), name="auth-token"),
    path("logout/", LogoutView.as_view(), name="logout"),

    path("student/dashboard/", studentOnlyView.as_view(), name="student-only"),
    path("chairman/dashboard/", chairmanOnlyView.as_view(), name="chairman-only"),

    path("checkauth/", continuousVerificationView.as_view(),
         name="continuous-verification"),

    path('password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    # <---- provisional certificate url ---->
    path('student-provisional-applied-list/',
         getProvisionalCertificateAppliedList, name="student_applied_list"),
    path('student-details/',
         getStudentDetails, name="student_details"),
    path('student-provisional-applied-details/<slug:roll>/',
         getProvisionalCertificateAppliedDetails, name="student_each_details"),
    # <---- Student actions for provisional certificate ---->
    path('student-provisional-apply/', applyProvisional,
         name='student_apply_provisional'),
    path('student-provisional-pay/', payProvisional,
         name='student_apply_provisional'),
    path('student-provisional-sscCertificate/', uploadSscCertificate,
         name='student_upload_ssscCertificate'),
    path('is-email-chanaged/', isEmailChanged, name="isEmailChanged"),
    # <---- Chairman actions for provisional certificate ---->
    path("provisional-applied-list-for-chairman/", getProvisionalAppliedListforChairman,
         name="provisional_applied_list_for_chairman"),

    path("provisional-accepted-list-by-chairman/", getProvisionalAcceptedListbyChairman,
         name="provisional_accepted_list_by_chairman"),

    path("provisional-rejected-list-by-chairman/", getProvisionalRejectedListbyChairman,
         name="provisional_rejected_list_by_chairman"),

    path("chairman-accept-provisional/", chairmanAcceptProvisional,
         name="chairman_accept_provisional"),

    path("chairman-reject-provisional/", chairmanRejectProvisional,
         name="chairman_reject_provisional"),

    # <---- provost actions for provisional certificate ---->

    path("provisional-applied-list-for-provost/", getProvisionalAppliedListforProvost,
         name="provisional_applied_list_for_provost"),

    path("provisional-accepted-list-by-provost/", getProvisionalAcceptedListbyProvost,
         name="provisional_accepted_list_by_provost"),

    path("provisional-rejected-list-by-provost/", getProvisionalRejectedListbyProvost,
         name="provisional_rejected_list_by_provost"),

    path("provost-accept-provisional/", provostAcceptProvisional,
         name="provost_accept_provisional"),

    path("provost-reject-provisional/", provostRejectProvisional,
         name="provost_reject_provisional"),

    # <---- Librarian actions for provisional certificate ---->

    path("provisional-applied-list-for-librarian/", getProvisionalAppliedListforLibrarian,
         name="provisional_applied_list_for_librarian"),

    path("provisional-accepted-list-by-librarian/", getProvisionalAcceptedListbyLibrarian,
         name="provisional_accepted_list_by_librarian"),

    path("provisional-rejected-list-by-librarian/", getProvisionalRejectedListbyLibrarian,
         name="provisional_rejected_list_by_librarian"),

    path("librarian-accept-provisional/", librarianAcceptProvisional,
         name="librarian_accept_provisional"),

    path("librarian-reject-provisional/", librarianRejectProvisional,
         name="librarian_reject_provisional"),

    # <---- ExamController actions for provisional certificate ---->

    path("provisional-applied-list-for-examController/", getProvisionalAppliedListforExamController,
         name="provisional_applied_list_for_examController"),

    path("provisional-accepted-list-by-examController/", getProvisionalAcceptedListbyExamController,
         name="provisional_accepted_list_by_examController"),

    path("provisional-rejected-list-by-examController/", getProvisionalRejectedListbyExamController,
         name="provisional_rejected_list_by_examController"),

    path("examController-accept-provisional/", examControllerAcceptProvisional,
         name="examController_accept_provisional"),

    path("examController-reject-provisional/", examControllerRejectProvisional,
         name="examController_reject_provisional"),

    # <---- Courier actions for provisional certificate ---->
    path("provisional-applied-list-for-courier/", getProvisionalAppliedListforCourier,
         name="provisional_applied_list_for_courier"),

    path("provisional-accepted-list-by-courier/", getProvisionalAcceptedListbyCourier,
         name="provisional_accepted_list_by_courier"),

    path("provisional-rejected-list-by-courier/", getProvisionalRejectedListbyCourier,
         name="provisional_rejected_list_by_courier"),

    path("courier-accept-provisional/", courierAcceptProvisional,
         name="examController_accept_provisional"),

    path("courier-reject-provisional/", courierRejectProvisional,
         name="courier_reject_provisional"),

    # <---- test api ---->
    path("pdf/", GeneratePdf.as_view(), name='pdf'),
    path("testPdf/<slug:roll>", testpdfApi, name='pdf2'),

    path('test/<int:pk>/', testApi, name='test')
]
