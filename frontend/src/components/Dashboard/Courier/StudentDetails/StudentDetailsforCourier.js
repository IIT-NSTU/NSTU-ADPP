import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './StudentDetails.css';

const StudentDetailsforCourier = () => {
    const data = useParams()
    let navigate = useNavigate();

    const [certificateData, setCertificateData] = useState({})
    const getData = React.useCallback(async () => {
        axios.get(`http://localhost:8000/api/student-provisional-applied-details/${data.roll}/`)
            .then(res => {
                setCertificateData(res.data)
                console.log(res.data)
            })
            .catch(err => {
                toast.error("something went wrong")
            })
    }, [data])
    useEffect(() => {
        getData()
    }, [getData])

    const acceptCourier = () => {
        if (certificateData.student_details) {
            navigate(`/courier/${data.roll}/final-accept`)
        }
    }

    const rejectCourier = () => {
        if (certificateData.student_details) {
            navigate(`/courier/${data.roll}/reject`)
        }
    }
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
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
                    {/* {certificateData.ssc_certificate && <div className="certificate_container">
                        <img src={`http://localhost:8000${certificateData.ssc_certificate}`} alt="" />
                    </div>
                    } */}
                    <p style={{ height: '40px' }}></p>
                    <div style={{ textAlign: 'center' }}>

                        <input type="submit" value="Accept" id="accept" onClick={() => acceptCourier()}
                            style={{ width: '15%', marginLeft: 'auto' }}
                            disabled={certificateData.courier_status === "approved"}
                        />

                        <input type="submit" value="Reject" id="reject"
                            onClick={() => rejectCourier()}
                            style={{ width: '15%', marginLeft: '60px' }}
                            disabled={certificateData.courier_status !== null}
                        />

                    </div>
                </React.Fragment >
            }
        </div>

    )
}

export default StudentDetailsforCourier