import React from 'react';
import './OnBoarding.sass';

export default function OnBoarding() {
    return (
        <>
            <div>

                {/* Onboarding page 1 */}
                <div>
                    <img src="src/assets/first_image.png" alt="Welcome" />
                    <h2>Stay Connected,
                        Everywhere, Anytime</h2>
                    <p>Welcome to Newsify, your ultimate destination for breaking news, 
                        exclusive stories, and tailored content.</p>
                    <button>Skip</button>
                    <button>Continue</button>
                </div>
                {/* Onboarding page 2 */}
                <div>
                    <img src="src/assets/second_image.png" alt="Features" />
                    <h2>Become a Savvy
                        Global Citizen.
                    </h2>
                    <p>Discover tailored news that aligns with your interests and preferences.
                        Your personalized news journey awaits!</p>
                    <button>Skip</button>
                    <button>Continue</button>
                </div>
                {/* Onboarding page 3 */}
                <div>
                    <img src="src/assets/third_image.png" alt="Get Started" />
                    <h2>Enhance your News
                        Journey Now!
                    </h2>
                    <p>Be part of our dynamic community and contribute your insights 
                        and participate in enriching conversations.</p>
                    <button>Skip</button>
                    <button>Continue</button>
                </div>
            </div>
        </>
    )
}