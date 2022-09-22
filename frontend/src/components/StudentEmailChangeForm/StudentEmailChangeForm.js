import PropTypes from 'prop-types'
import { useState } from 'react'
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { email_change } from '../../actions/auth'
import '../../assets/css/NeumorphismForm.css'

const StudentEmailChangeForm = ({ email_change, isAuthenticated, isLoading, token, emailChangeRequest, user }) => {

    const [userFormDetails, setUserFormDetails] = useState({
        newEmail: ""
    })
    const { newEmail } = userFormDetails
    const oldEmail = user.email
    const loginChange = (e) => {
        setUserFormDetails({
            ...userFormDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        email_change({ oldEmail, newEmail })
    }
    if (isAuthenticated && user.is_student && (emailChangeRequest === "email change requested")) {
        return <Navigate to="/user/email-confirm" />
    }
    return (
        <div className="form-container" style={{ height: '600px', marginTop: '20px', marginBottom: '20px' }}>
            <div className="avatar"></div>
            <div className="title">NSTU ADPP</div>
            <div className="sub-title">CR3W</div>
            <form onSubmit={(e) => handleLoginSubmit(e)}>
                <div className="username">
                    <i className="fa fa-envelope"></i>
                    <input type="text"
                        className="name-input"
                        placeholder={oldEmail}
                        name="email"
                        // value={oldEmail}
                        disabled
                    />
                </div>
                <div className="username">
                    <i className="fa fa-envelope"></i>
                    <input type="text"
                        className="name-input"
                        onChange={e => loginChange(e)}
                        placeholder="Enter your new email"
                        name="newEmail"
                        value={newEmail}
                    />
                </div>
                <input type="submit" value="Change email" className="submit-input" />

            </form>
        </div>
    )
}
StudentEmailChangeForm.propTypes = {
    email_change: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    emailChangeRequest: PropTypes.string,
    user: PropTypes.object
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    token: state.auth.token,
    emailChangeRequest: state.auth.emailChangeRequest,
    user: state.auth.user
})

export default connect(mapStateToProps, { email_change })(StudentEmailChangeForm)