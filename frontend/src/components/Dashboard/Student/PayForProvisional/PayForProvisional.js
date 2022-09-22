import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { student_pay_provisional } from "../../../../actions/auth";
import './PayforProvisional.css';
const PayForProvisional = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    let email = '';
    if (user) {
        email = user.email;
        console.log(email)
    }
    const submit = (email) => {
        disptach(student_pay_provisional(email))
        navigate('/student/provisional/details')
    }
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
                    <li class="li complete">
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
            {/* <div>
                <h1>pay for provisional</h1>
                <input type="submit" value="pay" id="submit-registration"
                    style={{ width: '120px', height: '50px', marginLeft: '20px' }}
                    onClick={() => submit(email)}
                />
            </div> */}
            <div>
                <div id="Checkout" class="inline">
                    <h1>Pay Invoice</h1>
                    <div class="card-row">
                        <span class="visa"></span>
                        <span class="mastercard"></span>
                        <span class="amex"></span>
                        <span class="discover"></span>
                    </div>
                    <form style={{ padding: '10px 5px 5px 5px' }}>
                        <div class="form-group">
                            <label for="PaymentAmount">Payment amount</label>
                            <div class="amount-placeholder" style={{ width: '85%', borderBottom: '1px solid', }}>

                                <span>500</span>
                                <span>tk</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label or="NameOnCard">Name on card</label>
                            <input id="NameOnCard" class="form-control" type="text" maxlength="255" style={{ border: '1px solid', padding: '0px 10px 20px 5px', borderRadius: '10px' }}></input>
                        </div>
                        <div class="form-group">
                            <label for="CreditCardNumber">Card number</label>
                            <input id="CreditCardNumber" class="null card-image form-control" type="number" style={{ border: '1px solid', padding: '0px 10px 20px 5px', borderRadius: '10px' }}></input>
                        </div>



                    </form>
                    <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <button id="PayButton" class="btn btn-block btn-success submit-button" type="submit" style={{ width: '120px' }} onClick={() => submit(email)}>
                            {/* <span class="submit-button-lock"></span> */}
                            <span class="align-middle">Pay 500tk</span>
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default PayForProvisional