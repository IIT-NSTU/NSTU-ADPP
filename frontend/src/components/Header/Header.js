import React from 'react';
import bdLogo50 from '../../assets/images/50-years-of-bangladesh-logo.png';
import mujibLogo from '../../assets/images/mujib_100_logo.png';
import nstuLogo from '../../assets/images/nstu.svg';
import './Header.css';

const Header = () => {
    return (
        <React.Fragment>
            <p style={{ height: '10px' }}></p>
            <div className='header' style={{ height: '75px' }}>
                <img src={nstuLogo} alt="not found" style={{ height: '70px' }} />
                <p id="headerTitle" style={{ marginLeft: '20px' }}>Noakhali Science and Technology Univeristy</p>
                <img src={bdLogo50} alt="not found" style={{ height: '75px', marginLeft: 'auto' }} />
                <img src={mujibLogo} alt="not found" style={{ height: '75px' }} />

            </div>
            <hr />
            <hr />
        </React.Fragment >
    )
}

export default Header