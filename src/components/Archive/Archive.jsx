import React, { useState, useEffect } from 'react';
import { useArchive } from '../../contexts/ArchiveContext';
import BottomNav from '../BottomNav/BottomNav';
import NewsCard from '../NewsCard/NewsCard';
import './Archive.sass';
import logo from '../../assets/logo_small.svg';

export default function Archive() {
    const [expandedCategories, setExpandedCategories] = useState([]);
    const { archivedArticles, removeFromArchive } = useArchive();

    // Group articles by category
    const groupedArticles = archivedArticles.reduce((acc, article) => {
        const category = article.section?.toUpperCase() || 'OTHER';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(article);
        return acc;
    }, {});

    const categories = Object.keys(groupedArticles).sort();

    useEffect(() => {
        // Auto-expand first category
        if (categories.length > 0 && expandedCategories.length === 0) {
            setExpandedCategories([categories[0]]);
        }
    }, [categories.length]);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleDelete = (articleId) => {
        removeFromArchive(articleId);
    };

    return (
        <div className="archive-container">
            <header className="archive-header">
                <img src={logo} alt="Newsify" className="archive-logo" />
                <span className="archive-brand">Newsify</span>
            </header>

            <div className="archive-content">
                {archivedArticles.length === 0 ? (
                    <div className="empty-archive">
                        <div className="empty-icon">🔖</div>
                        <h3>No Saved Articles</h3>
                        <p>Swipe right on articles to save them here</p>
                    </div>
                ) : (
                    categories.map(category => (
                        <div key={category} className="category-section">
                            <button 
                                className={`category-header ${expandedCategories.includes(category) ? 'expanded' : ''}`}
                                onClick={() => toggleCategory(category)}
                            >
                                <div className="category-title">
                                    <img src={logo} alt="" className="category-icon" />
                                    <span>{category}</span>
                                    <span className="count">({groupedArticles[category].length})</span>
                                </div>
                                <span className="expand-icon">
                                    {expandedCategories.includes(category) ? '∧' : '∨'}
                                </span>
                            </button>

                            {expandedCategories.includes(category) && (
                                <div className="news-list">
                                    {groupedArticles[category].map(article => (
                                        <NewsCard
                                            key={article.id}
                                            article={article}
                                            onSwipeLeft={() => handleDelete(article.id)}
                                            showBookmark={false}
                                            showDelete={true}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <BottomNav active="archive" />
        </div>
    );
}