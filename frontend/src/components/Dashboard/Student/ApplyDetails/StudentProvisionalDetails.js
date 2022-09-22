import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './StudentDetails.css';
// import { student_apply_provisional } from "../../../actions/auth";
const StudentProvisionalDetails = () => {

    let navigate = useNavigate();
    const disptach = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [certificateData, setCertificateData] = useState({})
    const [blockChainData, setBlockChainData] = useState({})
    const getData = React.useCallback(async () => {
        if (user) {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({ 'email': user.email })
            console.log('student-details', user.email)
            axios.post(`http://localhost:8000/api/student-details/`, body, config)
                .then(res => {
                    setCertificateData(res.data)
                    if (res.data.examController_status === "approved") {
                        axios.get(`http://localhost:3001/find/${res.data.result.roll}-provisional`, config)
                            .then(res => {
                                setBlockChainData(res.data)
                                console.log('blockchain', res.data)
                            })
                            .catch(err => {
                                toast.error("something went wrong")
                            })
                    }
                })
                .catch(err => {
                    toast.error("something went wrong")
                })
        }
    }, [user])



    useEffect(() => {
        getData()

    }, [getData])
    const downloadStudentProvisional = url => {
        window.open(`http://127.0.0.1:8000/api/testPdf/${certificateData.student_details.roll}`, '_blank', 'noopener,noreferrer');
    }
    if (Object.keys(certificateData).length > 0 && Object.keys(blockChainData).length > 0) {
        if (certificateData.serial_number !== blockChainData.certificate_number || certificateData.result.cgpa !== blockChainData.cgpa) {
            return <Navigate to={'/provisional/manipulate-warning/' + certificateData.student_details.roll} />
        }
    }
    console.log('state', certificateData)
    return (
        <div>
            {certificateData.student_details &&

                <React.Fragment >
                    <div style={{ marginTop: '25px', marginBottom: '20px' }}>
                        <h1 style={{ textAlign: 'center', marginBottom: '10px', }}>Application Phase</h1>
                        <ul class="timeline" id="timeline">
                            <li class="li complete">
                                {/* <div class="timestamp">
                            <span class="author">Abhi Sharma</span>
                            <span class="date">11/15/2014</span>
                        </div> */}
                                <div class="status">
                                    <h4> Apply for Document</h4>
                                </div>
                            </li>
                            <li class="li complete">
                                <div class="status">
                                    <h4> Attach Document </h4>
                                </div>
                            </li>
                            <li class="li complete">

                                <div class="status">
                                    <h4> Payment </h4>
                                </div>
                            </li>
                            {certificateData.examController_status === "approved" ?
                                <li class="li complete">

                                    <div class="status">
                                        <h4> Download </h4>
                                    </div>
                                </li> : <li class="li">

                                    <div class="status">
                                        <h4> Download </h4>
                                    </div>
                                </li>
                            }

                        </ul>

                    </div>

                    <div className='student__whole__container'>
                        {/* student details */}


                        {/* authority details */}
                        <div class="studnet__container" style={{ height: '450px' }}>
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

                            {/* ------------------------- */}


                        </div>
                    </div>
                    {certificateData.takeBy === 'courier' ?
                        <div className='student__whole__container'>
                            <div class="studnet__container" style={{ height: '250px' }}>
                                <div class="title" style={{ marginTop: '10px' }}>Courier Details</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th> Authority </th>
                                            {certificateData.courier_status === 'rejected' ? <th>  Rejected Date</th> : <th>  Delivery Date</th>}
                                            <th> Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th> Courier Team </th>
                                            <td> {certificateData.courier_status === 'rejected' ? <p>{certificateData.courier_action_date}</p> : certificateData.courier_delivery_date ? <p>{certificateData.courier_delivery_date}</p> : <p>Pending</p>}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {certificateData.courier_status === 'approved' ?
                                                    <i class='bx bxs-check-circle' style={{ fontSize: '24px', color: 'green' }}></i> :
                                                    certificateData.courier_status === 'rejected' ? <i class='bx bxs-x-circle' style={{ fontSize: '24px', color: 'red' }}></i> :
                                                        <i class='bx bx-loader' style={{ fontSize: '24px', color: '#c8ab2c' }}></i>
                                                }
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null}

                    {/* {certificateData.ssc_certificate && <div className="certificate_container">
                        <img src={`http://localhost:8000${certificateData.ssc_certificate}`} alt="" />
                    </div>
                    } */}

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>

                        <input type="submit" value="Download" id="accept"
                            style={{ width: '15%', marginLeft: 'auto' }}
                            disabled={certificateData.examController_status !== "approved"}
                            onClick={() => { downloadStudentProvisional(certificateData.provisional_certificate_url) }}
                        />

                        {/* <input type="submit" value="Reject" id="reject"
                            onClick={rejectChairman}
                            style={{ width: '15%', marginLeft: '60px' }}
                            disabled={certificateData.examController_status !== null}
                        /> */}

                    </div>
                    <p style={{ height: '15px' }}></p>
                </React.Fragment >
            }
        </div>
    )
}


export default StudentProvisionalDetails