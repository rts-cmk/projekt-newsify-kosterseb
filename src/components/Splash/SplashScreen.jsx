import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.sass';
import splashImage from '../../assets/logo_large.svg';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenOnboarding = localStorage.getItem('newsify-onboarding-complete');
            if (hasSeenOnboarding) {
                navigate('/auth');
            } else {
                navigate('/onboarding');
            }
        }, 4000); // 4 seconds for animation

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="splash-image-animated">
                    <img src={splashImage} alt="Newsify Logo" className="splash-logo" />
                </div>
                <div className="title-animated">
                    <h1>Newsify</h1>
                </div>
            </div>
        </div>
    );
}