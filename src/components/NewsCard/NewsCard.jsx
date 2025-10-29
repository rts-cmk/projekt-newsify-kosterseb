import React, { useState } from 'react';
import { useSwipe } from '../../hooks/useSwipe';
import { useArchive } from '../../contexts/ArchiveContext';
import './NewsCard.sass';
import archiveIcon from '../../assets/archive-icon.svg';
import removeIcon from '../../assets/remove-icon.svg';

export default function NewsCard({ article, onSwipeRight, onSwipeLeft, showDelete = false }) {
    const [swipeAction, setSwipeAction] = useState(null);
    const { removeFromArchive } = useArchive();
    
    const handleSwipeRight = () => {
        if (onSwipeRight) {
            setSwipeAction('save');
            setTimeout(() => {
                onSwipeRight();
                setSwipeAction(null);
            }, 300);
        }
    };

    const handleSwipeLeft = () => {
        if (onSwipeLeft) {
            setSwipeAction('delete');
            setTimeout(() => {
                onSwipeLeft();
                setSwipeAction(null);
            }, 300);
        }
    };

    const {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        isSwiping,
        swipeDistance
    } = useSwipe(handleSwipeLeft, handleSwipeRight, 100);

    const getBackgroundColor = () => {
        if (!isSwiping) {
            if (swipeAction === 'save') return '#5a7f3e';
            if (swipeAction === 'delete') return '#e74c3c';
            return 'transparent';
        }
        
        if (swipeDistance > 100) return '#5a7f3e';
        if (swipeDistance < -100) return '#e74c3c';
        return 'transparent';
    };

    const getSwipeIcon = () => {
        if (swipeDistance > 100) return <img src={archiveIcon} alt="Archive" className="swipe-svg" />;
        if (swipeDistance < -100) return <img src={removeIcon} alt="Remove" className="swipe-svg" />;
        return null;
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removeFromArchive(article.id);
    };

    const handleCardClick = () => {
        if (!isSwiping && article.url) {
            window.open(article.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div 
            className={`news-card-wrapper ${swipeAction ? 'swiped' : ''}`}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {isSwiping && getSwipeIcon() && (
                <div 
                    className="swipe-icon" 
                    style={{
                        left: swipeDistance > 0 ? '20%' : '80%',
                        transform: swipeDistance > 0 ? 'translate(-20%, -50%)' : 'translate(-80%, -50%)'
                    }}
                >
                    {getSwipeIcon()}
                </div>
            )}
            
            <div
                className="news-card"
                style={{
                    transform: isSwiping ? `translateX(${swipeDistance}px)` : 'translateX(0)',
                    transition: isSwiping ? 'none' : 'transform 0.3s ease'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleCardClick}
            >
                <div className="news-image">
                    {article.image ? (
                        <img src={article.image} alt={article.title} />
                    ) : (
                        <div className="news-image-placeholder"></div>
                    )}
                </div>
                
                <div className="news-info">
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                </div>

                {showDelete && (
                    <button 
                        className="delete-btn"
                        onClick={handleDeleteClick}
                    >
                        <img src={removeIcon} alt="Delete" />
                    </button>
                )}
            </div>
        </div>
    );
}