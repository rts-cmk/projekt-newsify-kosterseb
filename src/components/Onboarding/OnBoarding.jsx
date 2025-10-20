import React from 'react';
import './OnBoarding.sass';

export default function OnBoarding() {
    return (
        <>
        <div>

            {/* Onboarding page 1 */}
            <div>
                <img src="src/assets/first_image.png" alt="Welcome" />
            </div>
            {/* Onboarding page 2 */}
            <div>
                <img src="src/assets/second_image.png" alt="Features" />
            </div>
            {/* Onboarding page 3 */}
            <div>
                <img src="src/assets/third_image.png" alt="Get Started" />
            </div>
        </div>
        </>
    )
    }