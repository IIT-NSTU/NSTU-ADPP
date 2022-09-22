import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { student_apply_provisional } from "../../../actions/auth";
import pay from '../../../assets/images/calculator.png';
import upload from '../../../assets/images/evaluation.png';
import key_image from '../../../assets/images/key-dates.png';
import apply from '../../../assets/images/transcripts-documents.png';
import './StudentDashboard.css';

const StudentDashboard = () => {
    let navigate = useNavigate();
    const disptach = useDispatch();
    const { email } = useSelector(state => state.auth.user)
    const [certificateData, setCertificateData] = useState({})
    const [isApplied, setIsApplied] = useState()
    const getData = React.useCallback(async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ 'email': email })
        axios.post(`http://localhost:8000/api/is-email-chanaged/`, body, config)
            .then(res => {
                setIsApplied(res.data)
                axios.post(`http://localhost:8000/api/student-details/`, body, config)
                    .then(res => {
                        console.log(res.data)
                        setCertificateData(res.data)


                    })
                    .catch(err => {
                    })
                console.log(res.data)
            })
            .catch(err => {
            })
    }, [email])
    useEffect(() => {
        getData()
    }, [getData])
    const applyForProvisional = () => {
        disptach(student_apply_provisional(email))
        navigate('/student/provisional/upload')
    }
    const goToPaymentPage = () => {
        navigate('/student/provisional/pay')
    }
    const goToDetailsPage = () => {
        navigate('/student/provisional/details')
    }
    const goToUploadPage = () => {
        navigate('/student/provisional/upload')
    }
    const goToChangeEmail = () => {
        navigate('/student/email-change')
    }

    console.log(email, Object.keys(certificateData).length)
    return (
        <React.Fragment>

            <p style={{ height: '20px' }}></p>
            <p style={{ color: '#f2cd00', fontSize: '24pt', textAlign: 'center' }}>1</p>
            <h2 style={{ textAlign: 'center' }}>WHAT YOU NEED TO DO</h2>
            <p style={{ height: '30px' }}></p>
            <div style={{ display: 'flex', textAlign: 'center' }}>
                <div className="key__dates" style={{ borderRight: '3px dotted #231f20' }}>
                    <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                        <img alt="Key Dates &amp; Deadlines" height="373" src={apply} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                    </h2>
                    <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", marginRight: '35px' }}>Apply for Documents</h3>
                    <p style={{ "marginTop": "0", "marginBottom": "1rem", textAlign: 'justify', paddingRight: '15px' }}>Apply for the document you want to withdraw. Just click for apply for the document.</p>

                </div>
                <div className="key__dates" style={{ borderRight: '3px dotted #231f20', marginLeft: '10px' }}>
                    <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                        <img alt="Key Dates &amp; Deadlines" height="373" src={upload} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                    </h2>
                    <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", paddingLeft: '10px' }}>Upload Information</h3>
                    <p style={{ "marginTop": "0", "marginBottom": "1rem", marginRight: '15px', textAlign: 'justify' }}>Upload the material for the document that you applied to withdraw.</p>

                </div>
                <div className="key__dates" style={{ borderRight: '3px dotted #231f20', marginLeft: '10px' }}>
                    <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                        <img alt="Key Dates &amp; Deadlines" height="373" src={pay} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                    </h2>
                    <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a", paddingLeft: '10px', marginRight: '15px', }}>Pay for Certificates</h3>
                    <p style={{ "marginTop": "0", "marginBottom": "1rem", marginRight: '15px', textAlign: 'justify' }}>The next step is to pay for the document that you applied to withdraw.</p>

                </div>
                <div className="key__dates">
                    <h2 style={{ "color": "#3d4a43", "marginBottom": "5px", "textTransform": "capitalize" }}>
                        <img alt="Key Dates &amp; Deadlines" height="373" src={key_image} width="372" style={{ "width": "60px", 'height': '60px', "marginBottom": "5px" }} />
                    </h2>
                    <h3 style={{ "fontSize": "calc(1.3125rem + 0.75vw)", "lineHeight": "calc(1.3625rem + 1.35vw)", "letterSpacing": "-0.005em", "color": "#2b292a" }}>Collect Applied Document</h3>
                    <p style={{ "marginTop": "0", "marginBottom": "1rem" }}>Your final step is to collect the document that you applied for.</p>


                </div>

            </div>
            <p style={{ height: '20px' }}></p>
            {/* <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '30px', fontWeight: '700' }}>Select your certificate</p> */}
            <p style={{ color: '#f2cd00', fontSize: '24pt', textAlign: 'center' }}>2</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around', marginTop: '10px' }}>

                <h1 style={{ "fontWeight": "300", "fontSize": "calc(1.5813rem + 3.9756vw)", "lineHeight": "calc(1.625rem + 4.5vw)", "letterSpacing": "-0.007em", "color": "#275d38" }}>Change Your Email</h1>
                <p style={{ marginLeft: '15%', marginRight: '15%', marginTop: '10px', marginBottom: '10px', textAlign: 'justify' }}>For continuing the process at first you need to change your email. Because in future you may have not your own student email. For his reason to continue the process you need to change the student email.</p>
                {isApplied ? <p><input value="Email Change Done" class="applyBtn applyBtn-apply" id="applyBtn" disabled /></p> : <p><input value="Change Email" class="applyBtn applyBtn-apply" onClick={() => goToChangeEmail()} /></p>}

            </div>
            <p style={{ height: '20px' }}></p>
            <p style={{ color: '#f2cd00', fontSize: '24pt', textAlign: 'center' }}>3</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-around', marginTop: '10px' }}>

                <h1 style={{ "fontWeight": "300", "fontSize": "calc(1.5813rem + 3.9756vw)", "lineHeight": "calc(1.625rem + 4.5vw)", "letterSpacing": "-0.007em", "color": "#275d38" }}>Provisional Certificate</h1>
                <p style={{ marginLeft: '15%', marginRight: '15%', marginTop: '10px', marginBottom: '10px', textAlign: 'justify' }}>A provisional certificate is a type of certificate issued for a temporary period of time. If you want your admissions to be done but you are yet to receive your original degree certificate, then you can provide your provisional certificate and get yourself admitted to your college.</p>
                {Object.keys(certificateData).length > 0 && certificateData && certificateData.is_applied &&
                    certificateData.takeBy && !certificateData.is_paid &&
                    <p><input value="Pay" class="applyBtn applyBtn-apply" onClick={() => goToPaymentPage()} /></p>

                }
                {Object.keys(certificateData).length > 0 && certificateData && certificateData.is_applied && !certificateData.takeBy &&
                    <p><input value="Upload info" class="applyBtn applyBtn-apply" onClick={() => goToUploadPage()} /></p>

                }
                {Object.keys(certificateData).length > 0 && certificateData && certificateData.is_applied && certificateData.takeBy && certificateData.is_paid &&
                    <p><input value="Details" class="applyBtn applyBtn-apply" onClick={() => goToDetailsPage()} /></p>


                }
                {Object.keys(certificateData).length > 0 && certificateData && !certificateData.is_applied &&
                    <p><input value="Apply Now" id="applyBtn" disabled={!isApplied} class="applyBtn applyBtn-apply" onClick={() => applyForProvisional()} /></p>

                }
                {(Object.keys(certificateData).length === 0 || (certificateData && !certificateData.is_applied)) &&
                    <p><input value="Apply Now" id="applyBtn" class="applyBtn applyBtn-apply" disabled={!isApplied} onClick={() => applyForProvisional()} /></p>
                }
            </div>

            <p style={{ height: '10px' }}></p>
        </React.Fragment >
    )
}


export default StudentDashboard

