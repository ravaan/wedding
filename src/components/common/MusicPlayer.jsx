import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../../services/analytics";

const basePath = import.meta.env.BASE_URL || "/";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);
  const location = useLocation();
  const isPartyPage = location.pathname === "/party";

  // Create audio and autoplay — by the time this mounts, user has already
  // tapped the entry overlay so the browser allows audio.play()
  useEffect(() => {
    const audio = new Audio(`${basePath}river-flows-in-you.mp3`);
    audio.loop = true;
    audio.volume = 1.0;
    audio.currentTime = 15;
    audioRef.current = audio;

    audio
      .play()
      .then(() => {
        startedRef.current = true;
        setPlaying(true);
        trackEvent("Background Music Autoplay", { success: true });
      })
      .catch(() => {
        trackEvent("Background Music Autoplay", { success: false });
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Pause on party page, resume on others
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPartyPage) {
      audio.pause();
      setPlaying(false);
    } else if (!userPaused && startedRef.current) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [isPartyPage]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      setUserPaused(true);
      trackEvent("Music Toggled", { action: "pause", page: "Main" });
    } else {
      audio
        .play()
        .then(() => {
          startedRef.current = true;
          setPlaying(true);
          setUserPaused(false);
          trackEvent("Music Toggled", { action: "play", page: "Main" });
        })
        .catch(() => {});
    }
  };

  if (isPartyPage) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4 }}
      onClick={toggle}
      className="fixed bottom-6 left-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[var(--theme-gold)]/20 flex items-center justify-center cursor-pointer"
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-[3px]"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-[var(--theme-gold)] rounded-full"
                animate={{ height: [4, 12, 4] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="paused"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--theme-gold)"
          >
            <path d="M8 5v14l11-7z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MusicPlayer;
