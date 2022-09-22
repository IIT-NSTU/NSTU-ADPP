import React from 'react'
import { useParams } from 'react-router-dom'

const ProvisionalWarning = () => {
    const { roll } = useParams()
    return (
        <>            <div style={{ marginTop: '25px', marginBottom: '20px' }}>
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
                <li class="li incomplete">

                    <div class="status">
                        <h4> Download </h4>
                    </div>
                </li>
            </ul>

        </div>

            <br />
            <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{
                    display: 'table',
                    margin: '0 auto',
                    textAlign: 'justify',

                }}>
                    <p >Hello  <b>{roll}</b></p>
                    <br />
                    <p style={{ color: 'red' }}>Our system has detected that your certificate has been manipulated</p>
                    <br />
                    <p >Please contact with the authority </p>
                </div>
            </div>
        </>
    )
}

export default ProvisionalWarning