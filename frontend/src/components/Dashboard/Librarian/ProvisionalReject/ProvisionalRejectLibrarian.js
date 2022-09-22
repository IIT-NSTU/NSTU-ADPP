import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { librarian_reject_provisional } from "../../../../actions/auth";

const ProvisionalRejectLibrarian = () => {
    const data = useParams()
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [certificateData, setCertificateData] = useState({})
    const [textMessage, setTextMessage] = useState({
        message: ''
    })
    const { message } = textMessage
    const getData = React.useCallback(async () => {
        axios.get(`http://localhost:8000/api/student-provisional-applied-details/${data.roll}/`)
            .then(res => {
                setCertificateData(res.data)
            })
            .catch(err => {
                toast.error("something went wrong")
            })
    }, [data])
    useEffect(() => {
        getData()
    }, [getData])



    const rejectLibrarian = (email, message) => {
        dispatch(librarian_reject_provisional(email, message))
        navigate(`/librarian/student-details/${data.roll}`)

    }
    const messageChange = (e) => {
        console.log(e.target.value)
        setTextMessage(prevState => {
            return {
                ...prevState,
                message: e.target.value
            }
        })
    }

    return (
        <div>
            {certificateData.student_details &&

                <React.Fragment >

                    <div className='student__whole__container'>
                        {/* student details */}
                        <div class="studnet__container">
                            <div class="title">Student's Details</div>

                            <div class="content">

                                <form action="#" style={{ paddingTop: '25px' }}>

                                    <div class="user-details">
                                        <div class="input-box">
                                            <span class="details">Name</span>
                                            <input type="text" placeholder={certificateData.student_details.name} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">Roll</span>
                                            <input type="text" placeholder={certificateData.student_details.roll} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">Department</span>
                                            <input type="text" placeholder={certificateData.student_details.department} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">Session</span>
                                            <input type="text" placeholder={certificateData.student_details.session} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">Passing Year</span>
                                            <input type="text" placeholder={certificateData.student_details.passing_year} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">CGPA</span>
                                            <input type="text" placeholder={certificateData.result.cgpa} disabled />
                                        </div>
                                        <div class="input-box">
                                            <span class="details">Total Credits Completed</span>
                                            <input type="text" placeholder={certificateData.result.total_credit_completed} disabled />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* authority details */}
                        <div class="studnet__container">
                            <div class="title" style={{ marginTop: '45px' }}>What is the reason?</div>
                            <div class="input-box">
                                <textarea
                                    style={{

                                        "width": "100%", "height": "150px", "padding": "12px 20px", "boxSizing": "border-box", "border": "2px solid #ccc", "borderRadius": "4px", "backgroundColor": "#f8f8f8", "fontSize": "16px", "resize": "none",
                                        marginTop: '20px',
                                    }}
                                    rows="18"
                                    className="name-input"
                                    onChange={e => messageChange(e)}
                                    placeholder="E-mail"
                                    name="email"
                                    value={message}
                                />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>

                                <input type="submit" value="Reject" id="reject"
                                    onClick={() => rejectLibrarian(certificateData.student_details.email, message)}
                                    style={{ width: '60%', marginLeft: '60px' }}
                                    disabled={certificateData.librarian_status === "rejected"}
                                />

                            </div>
                        </div>
                    </div>

                </React.Fragment >
            }
        </div>

    )
}

export default ProvisionalRejectLibrarian