import PropTypes from 'prop-types'
import { useState } from 'react'
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

import { forget_password_confirm } from '../../../actions/auth'
import '../../../assets/css/NeumorphismForm.css'

const ForgetPasswordConfirm = ({ forget_password_confirm, isAuthenticated, isLoading, user, passwordResetRequest }) => {
    const [userFormDetails, setUserFormDetails] = useState({
        token: "",
        password: ""
    })
    const { token, password } = userFormDetails
    const re = /^(?=.*[!@#$%^&*]).{8,}$/;
    const loginChange = (e) => {
        setUserFormDetails({
            ...userFormDetails,
            [e.target.name]: e.target.value
        })
    }
    const handlePasswordResetSubmit = (e) => {
        e.preventDefault();
        console.log('hello')
        forget_password_confirm({ token, password })
    }
    if (isAuthenticated && user.is_chairman && user.email_validation) {
        return <Navigate to="/chairman/dashboard" />
    } else if (isAuthenticated && user.is_student && user.email_validation) {
        return <Navigate to="/student/dashboard" />
    }
    else if (isAuthenticated && (user.is_student || user.is_chairman) && !user.email_validation) {
        return <p>please confirm your email</p>
    }
    else if (!isAuthenticated && passwordResetRequest === "reset done") {
        return <Navigate to="/login" />
    }
    else {

        return (
            <>
                <p style={{ height: '15px' }}></p>
                <div className="form-container" style={{ height: '640px' }}>
                    <div className="avatar"></div>
                    <div className="title">NSTU ADPP</div>
                    <div className="sub-title">CR3W</div>
                    <form onSubmit={(e) => handlePasswordResetSubmit(e)}>
                        <div className="username">
                            <i className="fa fa-envelope"></i>
                            <input type="text"
                                className="name-input"
                                onChange={e => loginChange(e)}
                                placeholder="enter the token"
                                name="token"
                                value={token}
                            />
                        </div>
                        <div className="password">
                            <i className="fa fa-key"></i>
                            <input
                                className="password-input"
                                type="password"
                                onChange={e => loginChange(e)}
                                placeholder="Password"
                                name="password" value={password}
                            />
                        </div>
                        <ul style={{ 'textAlign': 'left', 'marginTop': '1px', fontSize: '2px', textDecoration: 'none', marginLeft: '20px', marginBottom: '15px' }}>
                            <li>
                                password must be at least 8 characters
                            </li>
                            <li>contain at least one special ( ?=.*[!@#$%^&*] ) symbol</li>
                        </ul>
                        <input type="submit" value="submit" disabled={!re.test(password)} className="submit-input" />

                    </form>

                </div>
            </>
        )
    }
}
ForgetPasswordConfirm.propTypes = {
    forget_password_confirm: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    passwordResetRequest: PropTypes.string,
    user: PropTypes.object
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    passwordResetRequest: state.auth.passwordResetRequest,
    isLoading: state.auth.isLoading,
    user: state.auth.user
})

export default connect(mapStateToProps, { forget_password_confirm })(ForgetPasswordConfirm)