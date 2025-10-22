import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.sass';

export default function BottomNav({ active }) {
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', label: 'Home', path: '/home', icon: '🏠' },
        { id: 'archive', label: 'Archive', path: '/archive', icon: '🔖' },
        { id: 'popular', label: 'Popular', path: '/popular', icon: '⭐' },
        { id: 'settings', label: 'Settings', path: '/settings', icon: '⚙️' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item ${active === item.id ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}