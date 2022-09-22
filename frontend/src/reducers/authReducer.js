
import * as actionTypes from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    passwordResetRequest: "",
    emailChangeRequest: "",
    isLoading: false,
    user: null,
    provisional: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_START:
            return {
                ...state,
                isLoading: true,
            }

        case actionTypes.REGISTER_STUDENT_USER_SUCCESS:
        case actionTypes.REGISTER_CHAIRMAN_USER_SUCCESS:

            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                user: action.payload.user,
                passwordResetRequest: "",
                emailChangeRequest: ""
            }
        case actionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                passwordResetRequest: "",
                emailChangeRequest: "",
            }
        case actionTypes.CONTINUOUS_USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                passwordResetRequest: ""
            }

        case actionTypes.REGISTER_STUDENT_USER_FAILED:
        case actionTypes.REGISTER_CHAIRMAN_USER_FAILED:
        case actionTypes.LOGIN_FAILED:
        case actionTypes.CONTINUOUS_USER_AUTH_FAILED:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                passwordResetRequest: "",
                emailChangeRequest: "",
            }
        case actionTypes.PASSWORD_CHANGE_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordResetRequest: "email found"
            }
        case actionTypes.PASSWORD_CHANGE_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                passwordResetRequest: "email not found"
            }
        case actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordResetRequest: "reset done"
            }
        case actionTypes.PASSWORD_CHANGE_CONFIRM_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.EMAIL_CHANGE_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                emailChangeRequest: "email change requested"
            }

        case actionTypes.EMAIL_CHANGE_REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                emailChangeRequest: ""
            }

        // provisional action

        case actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.PROVISIONAL_CONFIRM_CHAIRMAN_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.PROVISIONAL_REJECT_CHAIRMAN_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.PROVISIONAL_REJECT_CHAIRMAN_FAILED:
            return {
                ...state,
                isLoading: false
            }

        case actionTypes.STUDENT_UPLOAD_SSC_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.STUDENT_UPLOAD_SSC_FAILED:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}

