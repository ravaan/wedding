import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { initAnalytics, trackEvent } from "./services/analytics";
import { applyTheme } from "./config/theme";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import DevShortcuts from "./components/common/DevShortcuts";
import ThemeEditor from "./components/editor/ThemeEditor";
import Loading from "./components/ui/Loading";
import MusicPlayer from "./components/common/MusicPlayer";

const HomePage = lazy(() => import("./pages/HomePage"));
const PartyPage = lazy(() => import("./pages/PartyPage"));
const GiftRegistryEditPage = lazy(() => import("./pages/GiftRegistryEditPage"));

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
};

function EntryOverlay({ onEnter }) {
  return (
    <div
      onClick={onEnter}
      className="fixed inset-0 z-[200] bg-[var(--theme-cream)] flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <p className="font-script text-5xl md:text-7xl text-[var(--theme-green-dark)] mb-8">
        Prerna & Arpit
      </p>
      <p className="text-xs md:text-sm font-sans font-semibold uppercase tracking-[0.3em] text-[var(--theme-gold)] animate-pulse">
        Tap to enter
      </p>
    </div>
  );
}

function AppContent() {
  const [entered, setEntered] = useState(false);
  const [themeEditorOpen, setThemeEditorOpen] = useState(false);
  const location = useLocation();
  const isPartyPage = location.pathname === "/party";

  useEffect(() => {
    applyTheme();
    initAnalytics();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (isInputFocused()) return;
    if (e.key.toLowerCase() === "t" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setThemeEditorOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!entered) {
    return (
      <EntryOverlay
        onEnter={() => {
          setEntered(true);
          trackEvent("Site Entered", {
            method: "tap",
            timestamp: new Date().toISOString(),
          });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-batik-cream overflow-x-hidden">
      <Header />

      <Suspense fallback={<Loading fullScreen message="Loading page..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/party" element={<PartyPage />} />
          <Route path="/gift/edit" element={<GiftRegistryEditPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {!isPartyPage && <Footer />}
      <MusicPlayer />
      <DevShortcuts />
      {themeEditorOpen && (
        <ThemeEditor onClose={() => setThemeEditorOpen(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router basename="/">
      <AppContent />
    </Router>
  );
}

export default App;
