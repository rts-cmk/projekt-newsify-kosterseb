import React from 'react';
import './SplashScreen.sass';
import splashImage from '../../assets/logo_large.svg';

export default function SplashScreen() {
    return (
        // Splash Screen Component
        <div className="splash-screen">
            <div className="splash-image-animated">
            <img src={splashImage} alt="Newsify Logo" className="splash-logo" />
            </div>
            <div className="title-animated">
            <h1>Newsify</h1>
            </div>
        </div>
    );
}