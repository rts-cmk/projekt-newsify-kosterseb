import React, { useState } from 'react';
import BottomNav from '../BottomNav/BottomNav';
import './Home.sass';
import logo from '../../assets/logo_small.svg';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('HEALTH');
    const [expandedCategories, setExpandedCategories] = useState(['HEALTH']);

    const categories = ['HEALTH', 'SPORT', 'TRAVEL'];
    
    // Mock news data
    const newsArticles = [
        {
            id: 1,
            category: 'HEALTH',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        },
        {
            id: 2,
            category: 'HEALTH',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        },
        {
            id: 3,
            category: 'SPORT',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        },
        {
            id: 4,
            category: 'TRAVEL',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        }
    ];

    const toggleCategory = (category) => {
        setExpandedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="Newsify" className="home-logo" />
                <span className="home-brand">Newsify</span>
            </header>

            <div className="search-bar">
                <input type="text" placeholder="Search news" />
            </div>

            <div className="news-content">
                {categories.map(category => (
                    <div key={category} className="category-section">
                        <button 
                            className={`category-header ${expandedCategories.includes(category) ? 'expanded' : ''}`}
                            onClick={() => toggleCategory(category)}
                        >
                            <div className="category-title">
                                <img src={logo} alt="" className="category-icon" />
                                <span>{category}</span>
                            </div>
                            <span className="expand-icon">{expandedCategories.includes(category) ? '∧' : '∨'}</span>
                        </button>

                        {expandedCategories.includes(category) && (
                            <div className="news-list">
                                {newsArticles
                                    .filter(article => article.category === category)
                                    .map(article => (
                                        <div key={article.id} className="news-card">
                                            <div className="news-image-placeholder"></div>
                                            <div className="news-info">
                                                <h3>{article.title}</h3>
                                                <p>{article.description}</p>
                                            </div>
                                            <button className="bookmark-btn">🔖</button>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <BottomNav active="home" />
        </div>
    );
}