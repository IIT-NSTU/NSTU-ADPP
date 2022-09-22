import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { examController_accept_provisional } from "../../../../actions/auth";

const ProvisionalFinalAcceptExamController = () => {
    const data = useParams()
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [certificateData, setCertificateData] = useState({})
    const [checker, setChecker] = useState({
        checkedBy: ''
    })
    const [issueDate, setIssueDate] = useState({
        date: ''
    })
    const { checkedBy } = checker
    const { date } = issueDate
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



    const acceptExamController = (email, checkedBy, issued_date) => {
        dispatch(examController_accept_provisional(email, checkedBy, issued_date))
        navigate(`/exam-controller/student-details/${data.roll}`)

    }
    const checkerChange = (e) => {

        setChecker(prevState => {
            return {
                ...prevState,
                checkedBy: e.target.value
            }
        })
        console.log(checkedBy)
    }
    const issueDateChange = (e) => {

        setIssueDate(prevState => {
            return {
                ...prevState,
                date: e.target.value
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
                            <div class="title" style={{ marginTop: '20px' }}>Checked By?</div>
                            <div class="input-box">
                                <textarea
                                    style={{

                                        "width": "100%", "height": "50px", "padding": "12px 20px", "boxSizing": "border-box", "border": "2px solid #ccc", "borderRadius": "4px", "backgroundColor": "#f8f8f8", "fontSize": "16px", "resize": "none",
                                        marginTop: '20px',
                                    }}
                                    rows="18"
                                    className="name-input"
                                    onChange={e => checkerChange(e)}
                                    placeholder="Checked By"
                                    name="email"
                                    value={checkedBy}
                                />
                            </div>
                            <div class="title" style={{ marginTop: '20px' }}>In which date certificate can be taken?</div>
                            <div class="input-box" style={{ textAlign: 'center' }}>
                                <input type="date"
                                    style={{

                                        "width": "80%", "height": "50px", "padding": "12px 20px", "boxSizing": "border-box", "border": "2px solid #ccc", "borderRadius": "4px", "backgroundColor": "#f8f8f8", "fontSize": "16px", "resize": "none",
                                        marginTop: '20px',
                                    }}
                                    rows="18"
                                    className="name-input"
                                    onChange={e => issueDateChange(e)}
                                    placeholder="yyyy-mm-dd"
                                    name="date"

                                    value={date}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>

                                <input type="submit" value="Accept" id="accept"
                                    onClick={() => acceptExamController(certificateData.student_details.email, checkedBy, date)}
                                    style={{ width: '40%', marginLeft: '60px' }}
                                    disabled={certificateData.examController_status === "approved" || (date.length === 0 || checkedBy.length === 0)}
                                />

                            </div>
                        </div>
                    </div>

                </React.Fragment >
            }
        </div>

    )
}

export default ProvisionalFinalAcceptExamController