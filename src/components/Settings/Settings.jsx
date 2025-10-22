import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import BottomNav from '../BottomNav/BottomNav';
import './Settings.sass';
import logo from '../../assets/logo_small.svg';

export default function Settings() {
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('newsify-categories');
        return saved ? JSON.parse(saved) : {
            EUROPE: true,
            HEALTH: true,
            SPORT: true,
            BUSINESS: false,
            TRAVEL: true
        };
    });

    useEffect(() => {
        localStorage.setItem('newsify-categories', JSON.stringify(categories));
    }, [categories]);

    const toggleCategory = (categoryName) => {
        setCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    const replayOnboarding = () => {
        localStorage.removeItem('newsify-onboarding-complete');
        navigate('/onboarding');
    };

    return (
        <div className="settings-container">
            <header className="settings-header">
                <img src={logo} alt="Newsify" className="settings-logo" />
                <span className="settings-brand">Newsify</span>
            </header>

            <div className="settings-content">
                <h1 className="settings-title">Settings</h1>
                
                <section className="settings-section">
                    <h2 className="section-label">Categories</h2>
                    
                    <div className="category-list">
                        {Object.entries(categories).map(([name, isActive]) => (
                            <div key={name} className="category-item">
                                <div className="category-info">
                                    <img src={logo} alt="" className="category-icon" />
                                    <span className="category-name">{name}</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={isActive}
                                        onChange={() => toggleCategory(name)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                <button className="btn-dark-mode" onClick={toggleDarkMode}>
                    Toggle dark mode
                </button>

                <button className="btn-replay-onboarding" onClick={replayOnboarding}>
                    View Onboarding Again
                </button>

                <p className="version-info">Version 4.8.15.16.23.42</p>
            </div>

            <BottomNav active="settings" />
        </div>
    );
}