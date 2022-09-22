
import FormData from 'form-data';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { student_upload_ssc } from '../../../../actions/auth';

const UploadImage = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState()
    const [way, setWay] = React.useState('courier');
    const [address, setAddress] = React.useState('');
    const disptach = useDispatch()
    const user = useSelector(state => state.auth.user)
    let email = '';
    if (user) {
        email = user.email;
        console.log(email)
    }
    const submit = (email, way, image) => {
        const uploadData = new FormData()
        uploadData.append('email', email)
        uploadData.append('ssc_certificate', image)
        uploadData.append('way', way)
        uploadData.append('address', address)
        console.log(way)
        disptach(student_upload_ssc(uploadData))
        navigate('/student/provisional/pay')

    }
    const handleChange = (event) => {
        setWay(event.target.value)
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    // const consoleDate = (e) => {
    //     const d = new Date(document.getElementById("dt").value);
    //     let dt = d.getDate();

    //     let mn = parseInt(d.getMonth());
    //     mn = mn + 1
    //     let yy = d.getFullYear();
    //     console.log(yy + '-' + mn + '-' + dt)
    // }
    // <input type="date" name="" id="dt" placeholder='address' onChange={(e) => { consoleDate(e) }} />

    return (
        <>
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
                    <li class="li">
                        <div class="status">
                            <h4> Attach Document </h4>
                        </div>
                    </li>
                    <li class="li">

                        <div class="status">
                            <h4> Payment </h4>
                        </div>
                    </li>
                    <li class="li">

                        <div class="status">
                            <h4> Download </h4>
                        </div>
                    </li>
                </ul>

            </div>
            <h3 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>Upload Your Document </h3>
            <div style={{ "display": "flex", "flexDirection": "column", "alignContent": "space-around", "flexWrap": "wrap", "alignItems": "flex-start", "justifyContent": "flex-start", }}>
                <h5 style={{ marginBottom: '10px' }}>SSC Certificate</h5>
                <input type="file" onChange={(evt) => setImage(evt.target.files[0])} />

                <h4 style={{ marginTop: '20px' }}>Choose certificate deliverable way</h4>
                <div>
                    <input
                        type="radio"
                        value="courier"
                        checked={way === 'courier'}
                        onChange={handleChange}
                    /> Courier
                </div>
                <div>
                    <input
                        type="radio"
                        value="physically"
                        checked={way === 'physically'}
                        onChange={handleChange}
                    /> Physically
                </div>
                {way === 'courier' ?
                    <div style={{ marginTop: '10px' }}>
                        <div class="input-box">
                            <textarea
                                style={{

                                    "width": "100%", "height": "100px", "padding": "12px 20px", "boxSizing": "border-box", "border": "2px solid #ccc", "borderRadius": "4px", "backgroundColor": "#f8f8f8", "fontSize": "16px", "resize": "none",
                                    marginTop: '20px',
                                }}
                                rows="18"
                                className="name-input"
                                placeholder="Enter your address"
                                name="email"
                                value={address}
                                onChange={handleAddressChange}
                            />
                        </div>
                    </div> : null
                }
                <button disabled={(way === 'courier' && address.length === 0) || !image} style={{ marginTop: '10px', }} onClick={() => submit(email, way, image)}>Submit</button>


            </div>
        </>
    )
}

export default UploadImage