import React, { useState } from 'react';
import BottomNav from '../BottomNav/BottomNav';
import './Archive.sass';
import logo from '../../assets/logo_small.svg';

export default function Archive() {
    const [expandedCategories, setExpandedCategories] = useState(['SPORT']);

    const categories = ['SPORT', 'TRAVEL'];
    
    // Mock archived articles
    const archivedArticles = [
        {
            id: 1,
            category: 'SPORT',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        },
        {
            id: 2,
            category: 'SPORT',
            title: 'Headline',
            description: 'Surfing is a surface water sport in which the wave rider, referred to as...',
            image: null
        },
        {
            id: 3,
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
        <div className="archive-container">
            <header className="archive-header">
                <img src={logo} alt="Newsify" className="archive-logo" />
                <span className="archive-brand">Newsify</span>
            </header>

            <div className="archive-content">
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
                                {archivedArticles
                                    .filter(article => article.category === category)
                                    .map(article => (
                                        <div key={article.id} className="news-card">
                                            <div className="news-image-placeholder"></div>
                                            <div className="news-info">
                                                <h3>{article.title}</h3>
                                                <p>{article.description}</p>
                                            </div>
                                            <button className="delete-btn">🗑️</button>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <BottomNav active="archive" />
        </div>
    );
}