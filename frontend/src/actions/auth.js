import axios from "axios";
import { toast } from 'react-toastify';
import * as actionTypes from './types';

export const create_chairman_user = ({ fullname, email, password, password2 }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ fullname, email, password, password2 })

    axios.post('http://localhost:8000/api/signup/chairman/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.REGISTER_CHAIRMAN_USER_SUCCESS,
                payload: res.data
            })
            toast.success("please confirm from your email")
        }).catch(err => {
            dispatch({
                type: actionTypes.REGISTER_CHAIRMAN_USER_FAILED
            })
            toast.error("something went wrong. please try agin")
        })

}

export const create_student_user = ({ fullname, email, password, password2 }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ fullname, email, password, password2 })
    console.log('inside')
    axios.post('http://localhost:8000/api/signup/student/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.REGISTER_STUDENT_USER_SUCCESS,
                payload: res.data
            })
            console.log(res.data)
        }).catch(err => {
            dispatch({
                type: actionTypes.REGISTER_STUDENT_USER_FAILED
            })
            console.log(err.response.data)
        })

}

export const forget_password = ({ email }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ email })
    axios.post('http://localhost:8000/api/password_reset/', body, config)
        .then(response => {

            dispatch({
                type: actionTypes.PASSWORD_CHANGE_REQUEST_SUCCESS,
                payload: response.data
            })

            toast.success("enter the code sent to your email")

        }).catch(err => {

            dispatch({
                type: actionTypes.PASSWORD_CHANGE_REQUEST_FAILED
            })
            toast.error("please enter correct email address", err)
            console.log("i am here", err)
        })
}

export const forget_password_confirm = ({ token, password }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ token, password })
    axios.post('http://localhost:8000/api/password_reset/confirm/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_SUCCESS,
                payload: response.data
            })
            toast.success("successfully changed the password")
        }).catch(err => {
            dispatch({
                type: actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_FAILED
            })
            toast.error("Token is not correct", err)
        })
}

export const email_change = ({ oldEmail, newEmail }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const token = localStorage.getItem("token")
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
    const body = JSON.stringify({ 'oldEmail': oldEmail, 'newEmail': newEmail })
    axios.post('http://localhost:8000/api/emailchange/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.EMAIL_CHANGE_REQUEST_SUCCESS
            })
            toast.success("please confirm from your new email address")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.EMAIL_CHANGE_REQUEST_FAILED
            })
            toast.error("something went wrong")
        })
}


export const login = ({ email, password }) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({ email, password })
    console.log(body)
    axios.post('http://localhost:8000/api/login/', body, config)
        .then(response => {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: response.data
            })
            toast.success("login success")
        }).catch(err => {
            dispatch({
                type: actionTypes.LOGIN_FAILED
            })
            toast.error("login failed")
        })

}

export const check_continuous_auth = () => (dispatch) => {
    const token = localStorage.getItem("token")
    if (!token) {
        dispatch(logout)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    }
    axios.get('http://localhost:8000/api/checkauth/', config)
        .then(response => {
            dispatch({
                type: actionTypes.CONTINUOUS_USER_AUTH_SUCCESS,
                payload: response.data
            })
        }).catch(err => {
            dispatch({
                type: actionTypes.CONTINUOUS_USER_AUTH_FAILED
            })
        })
}

export const logout = () => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    localStorage.removeItem("token")
    dispatch({ type: actionTypes.AUTH_LOGOUT })
    toast.success("logout success")
}

// provisional certificates actions by student

export const student_apply_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/student-provisional-apply/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully applied")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const student_upload_ssc = (body) => (dispatch) => {

    dispatch({ type: actionTypes.LOADING_START })

    const config = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        }
    }
    console.log('from student upload', body)
    axios.post('http://localhost:8000/api/student-provisional-sscCertificate/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.STUDENT_UPLOAD_SSC_SUCCESS
            })
            toast.success("successfully uploaded your certificate")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.STUDENT_UPLOAD_SSC_FAILED
            })
            toast.error("something went wrong")
        })
}
export const student_pay_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/student-provisional-pay/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully paid for provisional")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}


// chairman action for provisional

export const chairman_accept_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/chairman-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const chairman_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/chairman-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully rejected")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

// provost action for provisional


export const provost_accept_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/provost-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const provost_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/provost-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully rejected")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

// librarian action for provisional


export const librarian_accept_provisional = (email) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email })
    console.log(body)
    axios.post('http://localhost:8000/api/librarian-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const librarian_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/librarian-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully rejected")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

// examController action for provisional


export const examController_accept_provisional = (email, checkedBy, issued_Date) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'checkedBy': checkedBy, 'issued_date': issued_Date })
    console.log(body)
    axios.post('http://localhost:8000/api/examController-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            console.log('from action', err)
            toast.error("something went wrong")
        })
}

export const examController_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/examController-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully rejected")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

// courier action for provisional


export const courier_accept_provisional = (email, date) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'delivery_date': date })
    console.log(body)
    axios.post('http://localhost:8000/api/courier-accept-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}

export const courier_reject_provisional = (email, message) => (dispatch) => {
    dispatch({ type: actionTypes.LOADING_START })
    console.log(email, 'email')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ 'student_email': email, 'message': message })
    console.log(body)
    axios.post('http://localhost:8000/api/courier-reject-provisional/', body, config)
        .then(res => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS
            })
            toast.success("successfully accepted")
        })
        .catch(err => {
            dispatch({
                type: actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED
            })
            toast.error("something went wrong")
        })
}
