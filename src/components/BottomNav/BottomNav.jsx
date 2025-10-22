import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.sass';

// import of svg icons for navigation items

export default function BottomNav({ active }) {
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', label: 'Home', path: '/home', icon: '/src/assets/home-icon.svg' },
        { id: 'archive', label: 'Archive', path: '/archive', icon: '/src/assets/archive-icon.svg' },
        { id: 'popular', label: 'Popular', path: '/popular', icon: '/src/assets/popular-icon.svg' },
        { id: 'settings', label: 'Settings', path: '/settings', icon: '/src/assets/settings-icon.svg' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(item => {
                const Icon = item.icon; // Get the component
                return (
                    <button
                        key={item.id}
                        className={`nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="nav-icon">
                            <img src={item.icon} alt={item.label} />
                        </span>
                        <span className="nav-label">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    )};