import React from 'react';
import './SplashScreen.sass';
import splashImage from '../../assets/logo_large.svg';

export default function SplashScreen() {
    return (
        <div className="splash-screen">
            <img src={splashImage} alt="Newsify Logo" className="splash-logo" />
            <h1>Newsify</h1>
        </div>
    );
}