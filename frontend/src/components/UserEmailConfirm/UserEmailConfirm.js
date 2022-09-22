import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import './UserEmailConfirm.css';
const useHomeSectionSize = () => {
    const [size, setSize] = useState([
        window.innerHeight, window.innerWidth
    ])
    useEffect(() => {
        const handleResize = () => {
            setSize(
                [
                    window.innerHeight, window.innerWidth
                ]
            )
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return size
}


const UserEmailConfirm = () => {
    const [confettiHeight, confettiWidth] = useHomeSectionSize()
    const openEmail = () => {
        window.location.replace('https://www.gmail.com');
    }
    return (
        <>
            <Confetti height={confettiHeight} width={confettiWidth - 110} numberOfPieces={400} gravity={0.1} />

            <div style={{ textAlign: 'center', display: 'flex', position: 'fixed', width: '100%', height: '100%', top: '0px', left: '0px', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <div class="checkmark-circle">
                    <div class="background"></div>
                    <div class="checkmark draw"></div>
                </div>
                <h1 style={{ marginTop: '20px' }}>Congratulations!</h1>
                <p style={{ marginTop: '20px' }}>A confirmation e-mail was sent to your email. Please confirm to complete your registration</p>

                <button style={{ marginTop: '20px' }} class="submit-btn" type="submit" onClick={openEmail}>Open gmail</button>

            </div>




        </>
    )
}
export default UserEmailConfirm