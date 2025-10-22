import React, { useState, useEffect } from 'react';
import newsApi from '../../services/newsApi';
import BottomNav from '../BottomNav/BottomNav';
import NewsCard from '../NewsCard/NewsCard';
import { useArchive } from '../../contexts/ArchiveContext';
import './Popular.sass';
import logo from '../../assets/logo_small.svg';

export default function Popular() {
    const [expandedCategories, setExpandedCategories] = useState(['HEALTH']);
    const [popularNews, setPopularNews] = useState({});
    const [loading, setLoading] = useState(true);
    const { addToArchive } = useArchive();

    // Get active categories from localStorage
    const getActiveCategories = () => {
        const saved = localStorage.getItem('newsify-categories');
        const categories = saved ? JSON.parse(saved) : {
            EUROPE: true,
            HEALTH: true,
            SPORT: true,
            BUSINESS: false,
            TRAVEL: true
        };
        return Object.entries(categories)
            .filter(([_, isActive]) => isActive)
            .map(([name]) => name);
    };

    const activeCategories = getActiveCategories();

    const fetchPopularNews = async () => {
        setLoading(true);
        const data = {};
        
        // Fetch popular stories (home section for most viewed)
        for (const category of activeCategories) {
            const articles = await newsApi.getTopStories(category);
            data[category] = articles.slice(0, 5); // Show top 5 per category
        }
        
        setPopularNews(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPopularNews();
    }, []);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <div className="popular-container">
            <header className="popular-header">
                <img src={logo} alt="Newsify" className="popular-logo" />
                <span className="popular-brand">Newsify</span>
            </header>

            <div className="popular-content">
                {loading ? (
                    <div className="loading">Loading popular news...</div>
                ) : (
                    Object.entries(popularNews).map(([category, articles]) => (
                        <div key={category} className="category-section">
                            <button 
                                className={`category-header ${expandedCategories.includes(category) ? 'expanded' : ''}`}
                                onClick={() => toggleCategory(category)}
                            >
                                <div className="category-title">
                                    <img src={logo} alt="" className="category-icon" />
                                    <span>{category}</span>
                                </div>
                                <span className="expand-icon">
                                    {expandedCategories.includes(category) ? '∧' : '∨'}
                                </span>
                            </button>

                            {expandedCategories.includes(category) && (
                                <div className="news-list">
                                    {articles.length === 0 ? (
                                        <div className="no-articles">No popular articles found</div>
                                    ) : (
                                        articles.map(article => (
                                            <NewsCard
                                                key={article.id}
                                                article={article}
                                                onSwipeRight={() => addToArchive(article)}
                                                showBookmark={true}
                                            />
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            <BottomNav active="popular" />
        </div>
    );
}