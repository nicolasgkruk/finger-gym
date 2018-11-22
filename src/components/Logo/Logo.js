import React from 'react';

import fingerLogo from '../../assets/images/finger.png'

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={fingerLogo} className="Logo Logo__image" alt="Finger Logo" />
    </div>
);

export default logo;