import { gsap } from 'gsap';

import ThreeScene from '@/components/scenes/ThreeScene/ThreeScene';
import './HomePage.css';

const HomePage= () => {

    return (
        <div className="home-page-container">
            <div className='three-scene-wrapper'>
                <ThreeScene />
            </div>
            <div className='home-page-content-wrapper'>
                <h1>Welcome to My Portfolio</h1>
                <p>
                    Explore my projects and experiences in web development, 3D modeling, and more.
                    This portfolio showcases my skills and creativity.
                </p>
                <p>
                    Feel free to navigate through the 3D scene above to see a virtual representation of my work.
                </p>
            </div>


        </div>
    );
};

export default HomePage;