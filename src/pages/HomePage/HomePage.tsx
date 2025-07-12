import HomePageContent from '@/components/HomePage/HomePageContent/HomePageContent';
import ThreeScene from '@/components/scenes/ThreeScene/ThreeScene';
import './HomePage.css';

const HomePage = () => {

    return (
        <div className="home-page-container">
            <div className='three-scene-wrapper'>
                <ThreeScene />
            </div>
            <div className='home-page-content-wrapper'>
                <HomePageContent />
            </div>
        </div>
    );
};

export default HomePage;