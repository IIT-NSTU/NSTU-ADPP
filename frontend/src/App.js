import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { check_continuous_auth } from './actions/auth';
import { CPrivateRoute, SPrivateRoute } from './private/PrivateRoute';

import Homepage from './components/Homepage';
import Login from "./components/Login/Login";
import Layout from './hoc/Layout/Layout';

import ChairmanRejectedDashboard from "./components/Dashboard/Chairman/Rejected/ChairmanRejectedDashboard";
import ChairmanRequestedDashboard from "./components/Dashboard/Chairman/Requested/ChairmanRequestedDashboard";
import ChairmanRegistration from "./components/Registration/ChairmanRegistration/ChairmanRegistration";

import StudentDashboard from "./components/Dashboard/Student/StudentDashboard";
import StudentRegistration from './components/Registration/StudentRegistration/StudentRegistration';
import StudentEmailChangeForm from "./components/StudentEmailChangeForm/StudentEmailChangeForm";

import CertificateType from "./components/CertificateType/CertificateType";
import ChairmanApprovedDashboard from "./components/Dashboard/Chairman/Approved/ChairmanApprovedDashboard";
import ProvisionalRejectChairman from "./components/Dashboard/Chairman/ProvisionalReject/ProvisionalRejectChairman";
import StudentDetailsforChairman from "./components/Dashboard/Chairman/StudentDetails/StudentDetailsforChairman";
import ExamControllerApprovedDashboard from "./components/Dashboard/ExamController/Approved/ExamControllerApprovedDashboard";

import CourierApprovedDashboard from "./components/Dashboard/Courier/Approved/CourierApprovedDashboard";

import ProvisionalFinalAcceptCourier from "./components/Dashboard/Courier/ProvisionalFinalAccept/ProvisionalFinalAcceptCourier";
import ProvisionalRejectCourier from "./components/Dashboard/Courier/ProvisionalReject/ProvisionalRejectCourier";
import CourierRejectedDashboard from "./components/Dashboard/Courier/Rejected/CourierRejectedDashboard";
import CourierRequestedDashboard from "./components/Dashboard/Courier/Requested/CourierRequestedDashboard";
import StudentDetailsforCourier from "./components/Dashboard/Courier/StudentDetails/StudentDetailsforCourier";
import ProvisionalFinalAcceptExamController from "./components/Dashboard/ExamController/ProvisionalFinalAccept/ProvisionalFinalAcceptExamController";
import ProvisionalRejectExamController from "./components/Dashboard/ExamController/ProvisionalReject/ProvisionalRejectExamController";
import ExamControllerRejectedDashboard from "./components/Dashboard/ExamController/Rejected/ExamControllerRejectedDashboard";
import ExamControllerRequestedDashboard from "./components/Dashboard/ExamController/Requested/ExamControllerRequestedDashboard";
import StudentDetailsforExamController from "./components/Dashboard/ExamController/StudentDetails/StudentDetailsforExamController";
import LibrarianApprovedDashboard from "./components/Dashboard/Librarian/Approved/LibrarianApprovedDashboard";
import ProvisionalRejectLibrarian from "./components/Dashboard/Librarian/ProvisionalReject/ProvisionalRejectLibrarian";
import LibrarianRejectedDashboard from "./components/Dashboard/Librarian/Rejected/LibrarianRejectedDashboard";
import LibrarianRequestedDashboard from "./components/Dashboard/Librarian/Requested/LibrarianRequestedDashboard";
import StudentDetailsforLibrarian from "./components/Dashboard/Librarian/StudentDetails/StudentDetailsforLibrarian";
import ProvostApprovedDashboard from "./components/Dashboard/Provost/Approved/ProvostApprovedDashboard";
import ProvisionalRejectProvost from "./components/Dashboard/Provost/ProvisionalReject/ProvisionalRejectProvost";
import ProvostRejectedDashboard from "./components/Dashboard/Provost/Rejected/ProvostRejectedDashboard";
import ProvostRequestedDashboard from "./components/Dashboard/Provost/Requested/ProvostRequestedDashboard";
import StudentDetailsforProvost from "./components/Dashboard/Provost/StudentDetails/StudentDetailsforProvost";
import StudentProvisionalDetails from "./components/Dashboard/Student/ApplyDetails/StudentProvisionalDetails";
import PayForProvisional from "./components/Dashboard/Student/PayForProvisional/PayForProvisional";
import ProvisionalWarning from "./components/Dashboard/Student/ProvisionalWarning/ProvisionalWarning";
import UploadImage from "./components/Dashboard/Student/UploadImage/UploadImage";
import ForgetPasswordConfirm from './components/ForgetPassword/ForgetPasswordConfirm/ForgetPasswordConfirm.js';
import ForgetPasswordStart from './components/ForgetPassword/ForgetPasswordStart/ForgetPasswordStart';
import Registration from "./components/Registration/Registration";
import UserEmailConfirm from "./components/UserEmailConfirm/UserEmailConfirm";


const App = ({ check_continuous_auth, isAuthenticated, token, isLoading }) => {
  useEffect(() => {
    check_continuous_auth();
  }, [check_continuous_auth])


  return (
    <Layout>
      <div className="App">
        <Routes>
          {/* student url start  */}
          <Route exact path='/student/dashboard' element={
            <SPrivateRoute>
              <StudentDashboard />
            </SPrivateRoute>
          } />

          <Route exact path='/student/certificate-type' element={
            <SPrivateRoute>
              <CertificateType />
            </SPrivateRoute>
          } />

          <Route exact path='/student/email-change' element={
            <SPrivateRoute>
              <StudentEmailChangeForm />
            </SPrivateRoute>
          } />
          <Route exact path='/student/provisional/upload' element={<UploadImage />} />
          <Route exact path='/student/provisional/pay' element={<PayForProvisional />} />
          <Route exact path='/student/provisional/details' element={<StudentProvisionalDetails />} />
          <Route exact path='/provisional/manipulate-warning/:roll' element={<ProvisionalWarning />} />
          {/* student url end  */}

          {/* chairman url start */}
          <Route exact path='/chairman/requested/dashboard' element={
            <CPrivateRoute>
              <ChairmanRequestedDashboard />
            </CPrivateRoute>
          } />
          <Route exact path='/chairman/rejected/dashboard' element={
            <CPrivateRoute>
              <ChairmanRejectedDashboard />
            </CPrivateRoute>
          } />
          <Route exact path='/chairman/approved/dashboard' element={
            <CPrivateRoute>
              <ChairmanApprovedDashboard />
            </CPrivateRoute>
          } />
          <Route exact path='/chairman/student-details/:roll' element={<StudentDetailsforChairman />} />
          <Route exact path='/chairman/:roll/reject' element={<ProvisionalRejectChairman />} />
          {/* chairman url end */}


          {/* provost url start */}
          <Route exact path='/provost/requested/dashboard' element={<ProvostRequestedDashboard />} />
          <Route exact path='/provost/approved/dashboard' element={<ProvostApprovedDashboard />} />
          <Route exact path='/provost/rejected/dashboard' element={<ProvostRejectedDashboard />} />
          <Route exact path='/provost/student-details/:roll' element={<StudentDetailsforProvost />} />
          <Route exact path='/provost/:roll/reject' element={<ProvisionalRejectProvost />} />
          {/* provost url end */}


          {/* librarian url start */}
          <Route exact path='/librarian/requested/dashboard' element={<LibrarianRequestedDashboard />} />
          <Route exact path='/librarian/approved/dashboard' element={<LibrarianApprovedDashboard />} />
          <Route exact path='/librarian/rejected/dashboard' element={<LibrarianRejectedDashboard />} />
          <Route exact path='/librarian/student-details/:roll' element={<StudentDetailsforLibrarian />} />
          <Route exact path='/librarian/:roll/reject' element={<ProvisionalRejectLibrarian />} />
          {/* librarian url end */}

          {/* exam-controller url start */}
          <Route exact path='/exam-controller/requested/dashboard' element={<ExamControllerRequestedDashboard />} />
          <Route exact path='/exam-controller/approved/dashboard' element={<ExamControllerApprovedDashboard />} />
          <Route exact path='/exam-controller/rejected/dashboard' element={<ExamControllerRejectedDashboard />} />
          <Route exact path='/exam-controller/student-details/:roll' element={<StudentDetailsforExamController />} />
          <Route exact path='/exam-controller/:roll/reject' element={<ProvisionalRejectExamController />} />
          <Route exact path='/exam-controller/:roll/final-accept' element={<ProvisionalFinalAcceptExamController />} />
          {/* exam-controller url end */}

          {/* courier url start */}
          <Route exact path='/courier/requested/dashboard' element={<CourierRequestedDashboard />} />
          <Route exact path='/courier/approved/dashboard' element={<CourierApprovedDashboard />} />
          <Route exact path='/courier/rejected/dashboard' element={<CourierRejectedDashboard />} />
          <Route exact path='/courier/student-details/:roll' element={<StudentDetailsforCourier />} />
          <Route exact path='/courier/:roll/reject' element={<ProvisionalRejectCourier />} />
          <Route exact path='/courier/:roll/final-accept' element={<ProvisionalFinalAcceptCourier />} />
          {/* courier url end */}


          <Route exact path='/chairman/signup' element={<ChairmanRegistration />} />
          <Route exact path='/student/signup' element={<StudentRegistration />} />
          <Route exact path='/user/email-confirm' element={<UserEmailConfirm />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/forget-password/confirm' element={<ForgetPasswordConfirm />} />
          <Route exact path='/forget-password' element={<ForgetPasswordStart />} />
          <Route exact path='/registration' element={<Registration />} />
          <Route exact path='/' element={<Homepage />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

    </Layout>
  );

}
App.propTypes = {
  check_continuous_auth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  token: state.auth.token,
  user: state.auth.user
})
export default connect(mapStateToProps, { check_continuous_auth })(App);
