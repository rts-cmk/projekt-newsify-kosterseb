import React, { useState, useEffect } from 'react';
import { useArchive } from '../../contexts/ArchiveContext';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
import { useSwipe } from '../../hooks/useSwipe';
import newsApi from '../../services/newsApi';
import BottomNav from '../BottomNav/BottomNav';
import NewsCard from '../NewsCard/NewsCard';
import './home.sass';
import logo from '../../assets/logo_small.svg';

//import arrow svg
import OpenedArrow from '../../assets/opened-arrow.svg';
import ClosedArrow from '../../assets/closed-arrow.svg';

export default function Home() {
    const [expandedCategories, setExpandedCategories] = useState(['HEALTH']);
    const [newsData, setNewsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
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

    const fetchNews = async () => {
        setLoading(true);
        const data = {};
        
        for (const category of activeCategories) {
            const articles = await newsApi.getTopStories(category);
            data[category] = articles;
        }
        
        setNewsData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Pull to refresh
    const { containerRef, isPulling, isRefreshing, pullDistance } = usePullToRefresh(
        fetchNews,
        80
    );

    const toggleCategory = (category) => {
        setExpandedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        const results = await newsApi.searchArticles(searchQuery);
        setNewsData({ SEARCH: results });
        setExpandedCategories(['SEARCH']);
        setLoading(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        fetchNews();
        setExpandedCategories(['HEALTH']);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="Newsify" className="home-logo" />
                <span className="home-brand">Newsify</span>
            </header>

            <form className="search-bar" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search news" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button type="button" onClick={clearSearch} className="clear-search">✕</button>
                )}
            </form>

            {/* Pull to refresh indicator */}
            {(isPulling || isRefreshing) && (
                <div className="refresh-indicator" style={{ height: pullDistance }}>
                    {isRefreshing ? '⟳ Refreshing...' : pullDistance >= 80 ? '↓ Release to refresh' : '↓ Pull to refresh'}
                </div>
            )}

            <div className="news-content" ref={containerRef}>
                {loading ? (
                    <div className="loading">Loading news...</div>
                ) : (
                    Object.entries(newsData).map(([category, articles]) => (
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
                                    {expandedCategories.includes(category) ? (<img className='opened-arrow' src={OpenedArrow} alt="closed" />) : (<img className='closed-arrow' src={ClosedArrow} alt="closed" />)}
                                </span>
                            </button>

                            {expandedCategories.includes(category) && (
                                <div className="news-list">
                                    {articles.length === 0 ? (
                                        <div className="no-articles">No articles found</div>
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

            <BottomNav active="home" />
        </div>
    );
}