
import data from '@public/data/data.json';
import { Suspense, lazy} from 'react';
import { useLocation, useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/layout/Layout';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import AwardDetail from './components/pages/AchievementsPage/AwardDetail/AwardDetail';
import CertificateDetail from './components/pages/AchievementsPage/CertificateDetail/CertificateDetail';
import PositionDetail from './components/pages/WorkHighlightsPage/PositionDetail/PositionDetail';
import ProjectDetail from './components/pages/WorkHighlightsPage/ProjectDetail/ProjectDetail';
import HomePage from './pages/HomePage/HomePage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

interface IAward {
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  issuerImage?: string;
  achievements?: string[];
}

const AboutMePage = lazy(() => import('./pages/AboutMePage/AboutMePage'));
const WorkHighlightsPage = lazy(() => import('./pages/WorkHighlightsPage/WorkHighlightsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage/AchievementsPage'));
const ContactMePage = lazy(() => import('./pages/ContactMePage/ContactMePage'));

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isProjectModal = location.pathname.includes('/work-highlights/projects/');
  const isPositionModal = location.pathname.includes('/work-highlights/positions/');
  const isCertificateModal = location.pathname.includes('/achievements/certificates/');
  const isAwardModal = location.pathname.includes('/achievements/awards/');

  const isModalRoute = isProjectModal || isPositionModal || isCertificateModal || isAwardModal;

  // Extract modal data
  const getModalData = () => {
    if (isProjectModal) {
      return {
        type: 'project',
        id: location.pathname.split('/').pop(),
        baseRoute: '/work-highlights'
      };
    }
    if (isPositionModal) {
      return {
        type: 'position',
        id: location.pathname.split('/').pop(),
        baseRoute: '/work-highlights'
      };
    }
    if (isCertificateModal) {
      return {
        type: 'certificate',
        id: location.pathname.split('/').pop(),
        baseRoute: '/achievements'
      };
    }
    if (isAwardModal) {
      return {
        type: 'award',
        id: location.pathname.split('/').pop(),
        baseRoute: '/achievements'
      };
    }
    return null;
  };

  const modalData = getModalData();

  const handleCloseModal = () => {
    if (modalData) {
      void navigate(modalData.baseRoute);
    }
  };

  // Determine which base route to show for the Routes component
  const getBaseRouteForLocation = () => {
    if (isProjectModal || isPositionModal) {
      return '/work-highlights';
    }
    if (isCertificateModal || isAwardModal) {
      return '/achievements';
    }
    return location.pathname;
  };

  const renderModalContent = () => {
    if (!modalData || !data) return null;

    switch (modalData.type) {
      case 'project':
        return <ProjectDetail projectId={modalData.id || ''} />;
      case 'position':
        return <PositionDetail positionId={modalData.id || ''} />;
      case 'certificate': {
        // Now certifications is an object, so we pass the key directly
        return <CertificateDetail certificateId={modalData.id || ''} />;
      }
      case 'award': {
        // Now awards is an object, so we pass the key and the data object
        return (
          <AwardDetail
            id={modalData.id || ''}
            data={data.awards as unknown as { [key: string]: IAward }}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes
          location={isModalRoute ? { ...location, pathname: getBaseRouteForLocation() } : location}
        >
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about-me" element={<AboutMePage />} />
            <Route path="work-highlights" element={<WorkHighlightsPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="contact-me" element={<ContactMePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Modal overlay */}
      {isModalRoute && modalData && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          {renderModalContent()}
        </ModalWrapper>
      )}

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        limit={3}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
