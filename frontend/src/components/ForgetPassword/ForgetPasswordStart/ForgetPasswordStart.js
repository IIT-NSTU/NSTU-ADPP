import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"



import { forget_password } from '../../../actions/auth'
import '../../../assets/css/NeumorphismForm.css'
const ForgetPasswordStart = ({ forget_password, isAuthenticated, isLoading, token, user, passwordResetRequest }) => {
    const [userFormDetails, setUserFormDetails] = useState({
        email: "",
    })
    const { email } = userFormDetails

    const loginChange = (e) => {
        setUserFormDetails({
            ...userFormDetails,
            [e.target.name]: e.target.value
        })
    }
    const handlePasswordResetSubmit = (e) => {
        e.preventDefault();
        forget_password({ email })
    }
    if (isAuthenticated && user.is_chairman && user.email_validation) {
        return <Navigate to="/chairman/dashboard" />
    } else if (isAuthenticated && user.is_student && user.email_validation) {
        return <Navigate to="/student/dashboard" />
    }
    else if (isAuthenticated && (user.is_student || user.is_chairman) && !user.email_validation) {
        return <p>please confirm your email</p>
    }
    else if (!isAuthenticated && passwordResetRequest === "email found") {
        return <Navigate to="/forget-password/confirm" />
    }
    else {

        return (
            <React.Fragment>
                <p style={{ height: '50px' }}></p>
                <div className="form-container" style={{ height: '500px' }}>
                    <div className="avatar"></div>
                    <div className="title">NSTU ADPP</div>
                    <div className="sub-title">CR3W</div>
                    <form onSubmit={(e) => handlePasswordResetSubmit(e)}>
                        <div className="username">
                            <i className="fa fa-envelope"></i>
                            <input type="text"
                                className="name-input"
                                onChange={e => loginChange(e)}
                                placeholder="E-mail"
                                name="email"
                                value={email}
                            />
                        </div>
                        <input type="submit" value="submit" className="submit-input" />

                    </form>


                    {/* {!isAuthenticated && passwordResetRequest === "email not found" ?  : null} */}
                </div>
            </React.Fragment>
        )
    }
}
ForgetPasswordStart.propTypes = {
    forget_password: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    passwordResetRequest: PropTypes.string,
    token: PropTypes.string,
    user: PropTypes.object
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    passwordResetRequest: state.auth.passwordResetRequest,
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps, { forget_password })(ForgetPasswordStart)