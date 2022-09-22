import { useState } from 'react'

const StudentSignup = () => {
    const [student, setStudent] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleChange = (e) => setStudent({
        ...student,
        [e.target.name]: e.target.value
    })

    const { username, email, password, password2 } = student

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(student)
    }

    return (
        <div className='container'>
            <h2>signup as a Student</h2>
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

export default StudentSignup