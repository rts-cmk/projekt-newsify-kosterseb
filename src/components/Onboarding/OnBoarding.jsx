import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnBoarding.sass';

export default function OnBoarding() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const navigate = useNavigate();

    const slides = [
        {
            image: 'src/assets/first_image.png',
            title: 'Stay Connected, Everywhere, Anytime',
            description: 'Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.'
        },
        {
            image: 'src/assets/second_image.png',
            title: 'Become a Savvy Global Citizen.',
            description: 'Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!'
        },
        {
            image: 'src/assets/third_image.png',
            title: 'Enhance your News Journey Now!',
            description: 'Be part of our dynamic community and contribute your insights and participate in enriching conversations.'
        }
    ];

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swipe left
            handleNext();
        }

        if (touchStart - touchEnd < -75) {
            // Swipe right
            handlePrevious();
        }
    };

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            completeOnboarding();
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        completeOnboarding();
    };

    const completeOnboarding = () => {
        localStorage.setItem('newsify-onboarding-complete', 'true');
        navigate('/auth');
    };

    return (
        <div className="onboarding-container">
            <div 
                className="onboarding-slides"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div 
                    className="slides-wrapper"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <div className="slide-content">
                                <div className="slide-image">
                                    <img src={slide.image} alt={`Onboarding ${index + 1}`} />
                                </div>
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="onboarding-controls">
                <div className="progress-dots">
                    {slides.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <div className="button-group">
                    <button className="btn-skip" onClick={handleSkip}>
                        Skip
                    </button>
                    <button className="btn-continue" onClick={handleNext}>
                        {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
}