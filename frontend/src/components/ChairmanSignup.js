import PropTypes from 'prop-types'
import { useState } from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { create_chairman_user } from '../actions/auth'

const ChairmanSignup = ({ create_chairman_user, isAuthenticated, isChairman }) => {
    const [chairman, setChairman] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleChange = (e) => setChairman({
        ...chairman,
        [e.target.name]: e.target.value
    })

    const { username, email, password, password2 } = chairman

    const handleSubmit = (e) => {
        e.preventDefault()
        const newClient = {
            username,
            email,
            password,
            password2
        }
        console.log(newClient)
        create_chairman_user(newClient)
    }
    if (isAuthenticated && isChairman) {
        return <Navigate to="/chairman/dashboard" />
    }
    return (
        <div className='container'>
            <h2>signup as a chairman</h2>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='form-group mb-3'>
                            <label>username</label>
                            <input type='text'
                                className='form-control'
                                name='username'
                                value={username}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <div className='form-group mb-3'>
                            <label>Email</label>
                            <input type='text'
                                className='form-control'
                                name='email'
                                value={email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label>password</label>
                            <input type='text'
                                className='form-control'
                                name='password'
                                value={password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label>Confirm password</label>
                            <input type='text'
                                className='form-control'
                                name='password2'
                                value={password2}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
ChairmanSignup.propTypes = {
    create_chairman_user: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isChairman: PropTypes.bool
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isChairman: state.auth.isChairman
})
export default connect(mapStateToProps, { create_chairman_user })(ChairmanSignup)