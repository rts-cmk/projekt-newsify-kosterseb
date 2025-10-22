import React, { useState } from 'react';
import { useSwipe } from '../../hooks/useSwipe';
import { useArchive } from '../../contexts/ArchiveContext';
import './NewsCard.sass';

//import svg
import ArchiveIcon from '../../assets/archive-icon.svg';
import RemoveIcon from '../../assets/remove-icon.svg';

export default function NewsCard({ article, onSwipeRight, onSwipeLeft, showBookmark = true, showDelete = false }) {
    const [swipeAction, setSwipeAction] = useState(null);
    const { addToArchive, removeFromArchive, isArchived } = useArchive();
    
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
        if (swipeDistance > 100) return (
            <img className="archive-icon" src={ArchiveIcon} alt="Archive Icon" />
        );
        if (swipeDistance < -100) return (
            <img className="remove-icon" src={RemoveIcon} alt="Remove Icon" />
        );
        return null;
    };

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        if (isArchived(article.id)) {
            removeFromArchive(article.id);
        } else {
            addToArchive(article);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        removeFromArchive(article.id);
    };

    return (
        <div 
            className={`news-card-wrapper ${swipeAction ? 'swiped' : ''}`}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {isSwiping && getSwipeIcon() && (
                <div className="swipe-icon">{getSwipeIcon()}</div>
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

                {showBookmark && (
                    <button 
                        className={`bookmark-btn ${isArchived(article.id) ? 'active' : ''}`}
                        onClick={handleBookmarkClick}
                    >
                        {isArchived(article.id) ? (<img src={ArchiveIcon} alt="Bookmark Icon" />) : (<img src={ArchiveIcon} alt="Bookmark Icon" />)}
                    </button>
                )}
            </div>
        </div>
    );
}