import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/NeumorphismForm.css'

const Registration = () => {
    return (
        <div className="form-container" style={{ height: '620px' }}>
            <div className="avatar"></div>
            <div className="title">IIT Certificate</div>
            <div className="sub-title">CR3W</div>
            <Link to="/student/signup" >
                <input style={{ marginTop: "20px", marginBottom: "20px" }} type="submit" value="Registration for student" className="submit-input" />
            </Link>
            <Link to="/chairman/signup" >
                <input style={{ marginBottom: '20px' }} type="submit" value="Registration for chairman" className="submit-input" />
            </Link>
            <Link to="/librarian/signup" >
                <input style={{ marginBottom: '20px' }} type="submit" value="Registration for librarian" className="submit-input" />
            </Link>
            <Link to="/provost/signup" >
                <input style={{ marginBottom: '20px' }} type="submit" value="Registration for provost" className="submit-input" />
            </Link>



        </div>
    )
}

export default Registration