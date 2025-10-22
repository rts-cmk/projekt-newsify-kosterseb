import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.sass';

// Import SVGs as React components in Vite
import HomeIcon from '../../assets/home-icon.svg?react';
import ArchiveIcon from '../../assets/archive-icon.svg?react';
import PopularIcon from '../../assets/popular-icon.svg?react';
import SettingsIcon from '../../assets/settings-icon.svg?react';

export default function BottomNav({ active }) {
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', label: 'Home', path: '/home', Icon: HomeIcon },
        { id: 'archive', label: 'Archive', path: '/archive', Icon: ArchiveIcon },
        { id: 'popular', label: 'Popular', path: '/popular', Icon: PopularIcon },
        { id: 'settings', label: 'Settings', path: '/settings', Icon: SettingsIcon }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.id}
                    className={`nav-item ${active === item.id ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                >
                    <span className="nav-icon">
                        <item.Icon />
                    </span>
                    <span className="nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}