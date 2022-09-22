import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { chairman_accept_provisional } from "../../../../actions/auth";
import './StudentDetails.css';

const StudentDetailsforChairman = () => {
    const data = useParams()
    let navigate = useNavigate();
    const disptach = useDispatch()
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

    const acceptChairman = (email) => {
        console.log(email)
        disptach(chairman_accept_provisional(email))
    }

    const rejectChairman = () => {
        if (certificateData.student_details) {
            navigate(`/chairman/${data.roll}/reject`)
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
                                        {certificateData.ssc_certificate &&
                                            <div class="input-box" style={{ textAlign: 'center' }}>
                                                <span class="details">SSC certificate</span>
                                                <button type="submit" value="Reject" id="sscButton"

                                                    style={{ "width": "60%", "height": "45px", "outline": "none", "background": "rgb(6, 28, 46)", "borderRadius": "30px", "fontSize": "20px", "fontWeight": "700p", "boxShadow": "3px 3px 8px #b1b1b1, -3px -3px 8px #fff", "transition": "hover 1s ease-out", "color": "#fff", "border": "none" }}
                                                    onClick={() => openInNewTab(`http://127.0.0.1:8000${certificateData.ssc_certificate}`)}
                                                >View</button>
                                            </div>
                                        }
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* authority details */}
                        <div class="studnet__container">
                            <div class="title" style={{ marginTop: '10px' }}>Approval Details</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th> Authority </th>
                                        <th> Action Date</th>
                                        <th> Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th> Chairman </th>
                                        <td> {certificateData.chairman_action_date ? certificateData.chairman_action_date : <p>pending</p>}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            {certificateData.chairman_status === 'approved' ?
                                                <i class='bx bxs-check-circle' style={{ fontSize: '24px', color: 'green' }}></i> :
                                                certificateData.chairman_status === 'rejected' ? <i class='bx bxs-x-circle' style={{ fontSize: '24px', color: 'red' }}></i> :
                                                    <i class='bx bx-loader' style={{ fontSize: '24px', color: '#c8ab2c' }}></i>
                                            }
                                        </td>

                                    </tr>
                                    <tr>
                                        <th> Hall Provost </th>
                                        <td> {certificateData.provost_action_date ? certificateData.provost_action_date : <p>pending</p>}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            {certificateData.provost_status === 'approved' ?
                                                <i class='bx bxs-check-circle' style={{ fontSize: '24px', color: 'green' }}></i> :
                                                certificateData.provost_status === 'rejected' ? <i class='bx bxs-x-circle' style={{ fontSize: '24px', color: 'red' }}></i> :
                                                    <i class='bx bx-loader' style={{ fontSize: '24px', color: '#c8ab2c' }}></i>
                                            }
                                        </td>

                                    </tr>
                                    <tr>
                                        <th> Librarian </th>
                                        <td> {certificateData.librarian_action_date ? certificateData.librarian_action_date : <p>pending</p>}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            {certificateData.librarian_status === 'approved' ?
                                                <i class='bx bxs-check-circle' style={{ fontSize: '24px', color: 'green' }}></i> :
                                                certificateData.librarian_status === 'rejected' ? <i class='bx bxs-x-circle' style={{ fontSize: '24px', color: 'red' }}></i> :
                                                    <i class='bx bx-loader' style={{ fontSize: '24px', color: '#c8ab2c' }}></i>
                                            }
                                        </td>

                                    </tr>
                                    <tr>
                                        <th> Exam controller </th>
                                        <td> {certificateData.examController_action_date ? certificateData.examController_action_date : <p>pending</p>}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            {certificateData.examController_status === 'approved' ?
                                                <i class='bx bxs-check-circle' style={{ fontSize: '24px', color: 'green' }}></i> :
                                                certificateData.examController_status === 'rejected' ? <i class='bx bxs-x-circle' style={{ fontSize: '24px', color: 'red' }}></i> :
                                                    <i class='bx bx-loader' style={{ fontSize: '24px', color: '#c8ab2c' }}></i>
                                            }
                                        </td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                    {/* {certificateData.ssc_certificate && <div className="certificate_container">
                        <img src={`http://localhost:8000${certificateData.ssc_certificate}`} alt="" />
                    </div>
                    } */}

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>

                        <input type="submit" value="Accept" id="accept" onClick={() => acceptChairman(certificateData.student_details.email)}
                            style={{ width: '15%', marginLeft: 'auto' }}
                            disabled={certificateData.chairman_status === "approved"}
                        />



                        <input type="submit" value="Reject" id="reject"
                            onClick={rejectChairman}
                            style={{ width: '15%', marginLeft: '60px' }}
                            disabled={certificateData.chairman_status === "rejected"}
                        />

                    </div>
                </React.Fragment >
            }
        </div>

    )
}

export default StudentDetailsforChairman