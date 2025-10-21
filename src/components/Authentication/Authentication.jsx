import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Authentication.sass';
import logo from '../../assets/logo_large.svg';

export default function Authentication() {
    const navigate = useNavigate();

    const handleAuth = () => {
        // For now, just navigate to home
        // Later you can add actual authentication logic
        navigate('/home');
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <div className="auth-logo">
                    <img src={logo} alt="Newsify Logo" />
                </div>
                <h1 className="auth-title">Newsify</h1>
                <p className="auth-subtitle">Welcome! Let's dive into your account!</p>

                <div className="auth-buttons">
                    <button className="auth-btn auth-facebook" onClick={handleAuth}>
                        Continue with Facebook
                    </button>
                    
                    <button className="auth-btn auth-google" onClick={handleAuth}>
                        Continue with Google
                    </button>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button className="auth-btn auth-password" onClick={handleAuth}>
                        Sign in with password
                    </button>

                    <p className="auth-signup">
                        Don't have an account? <span className="signup-link">Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}