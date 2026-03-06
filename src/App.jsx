import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initAnalytics } from "./services/analytics";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Loading from "./components/ui/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const RSVPPage = lazy(() => import("./pages/RSVPPage"));
const TravelPage = lazy(() => import("./pages/TravelPage"));
const GiftRegistryPage = lazy(() => import("./pages/GiftRegistryPage"));
const GiftRegistryEditPage = lazy(() => import("./pages/GiftRegistryEditPage"));

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Router basename="/wedding">
      <div className="min-h-screen bg-batik-cream">
        <Header />

        <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedule" element={<EventsPage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/gift/edit" element={<GiftRegistryEditPage />} />
            <Route path="/gift" element={<GiftRegistryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
