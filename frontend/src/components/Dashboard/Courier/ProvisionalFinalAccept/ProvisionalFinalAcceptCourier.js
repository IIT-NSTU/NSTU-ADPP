import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { courier_accept_provisional } from "../../../../actions/auth";

const ProvisionalFinalAcceptCourier = () => {
    const data = useParams()
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [certificateData, setCertificateData] = useState({})

    const [issueDate, setIssueDate] = useState({
        date: ''
    })

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

    console.log(date)

    const acceptCourier = (email, issued_date) => {
        dispatch(courier_accept_provisional(email, issued_date))
        navigate(`/courier/approved/dashboard`)

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
                                        <div class="input-box" >
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
                                            <span class="details">Phone Number</span>
                                            <input type="text" placeholder={certificateData.student_details.phone} disabled />
                                        </div>

                                    </div>

                                    <div class="input-box" style={{ marginBottom: '20px', textAlign: 'center' }}>
                                        <span class="details" style={{ cursor: "default", }} id="delivery">Delivery Address</span>
                                        <input style={{ border: '1px solid #ccc', borderRadius: '10px' }} type="text" placeholder={certificateData.courier_delivery_place} disabled />
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* authority details */}

                    </div>
                    <div className='student__whole__container'>
                        <div class="studnet__container">

                            <div class="title" style={{ marginTop: '30px', fontSize: '24px' }}>Certificate Delivery Date</div>
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
                            <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>

                                <input type="submit" value="Accept" id="accept"
                                    onClick={() => acceptCourier(certificateData.student_details.email, date)}
                                    style={{ width: '40%' }}
                                    disabled={certificateData.courier_status === "approved"}
                                />

                            </div>
                        </div>
                    </div>
                    <p style={{ height: '20px' }}></p>
                </React.Fragment >
            }
        </div>

    )
}

export default ProvisionalFinalAcceptCourier