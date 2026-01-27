import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initAnalytics } from './services/analytics';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Loading from './components/ui/Loading';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const TravelPage = lazy(() => import('./pages/TravelPage'));
const RSVPPage = lazy(() => import('./pages/RSVPPage'));
const CeremoniesPage = lazy(() => import('./pages/CeremoniesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const GuestBookPage = lazy(() => import('./pages/GuestBookPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  useEffect(() => {
    // Initialize Mixpanel analytics
    initAnalytics();
  }, []);

  return (
    <Router basename="/wedding">
      <div className="min-h-screen bg-cream">
        <Header />

        <AnimatePresence mode="wait">
          <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/rsvp" element={<RSVPPage />} />
              <Route path="/ceremonies" element={<CeremoniesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/guestbook" element={<GuestBookPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>

        <Footer />
      </div>
    </Router>
  );
}

export default App;