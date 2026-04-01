import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { trackPageView, trackEvent } from "../services/analytics";

const basePath = import.meta.env.BASE_URL || "/";

const PartyPage = () => {
  const [playing, setPlaying] = useState(true);
  const [beatDrop, setBeatDrop] = useState(false);
  const audioRef = useRef(null);
  const beatTimerRef = useRef(null);

  useEffect(() => {
    trackPageView("Party");
  }, []);

  useEffect(() => {
    const audio = new Audio(`${basePath}clap-your-hands.mp3`);
    audio.loop = true;
    audio.volume = 0.5;
    audio.currentTime = 55;
    audioRef.current = audio;

    const startBeatTimer = () => {
      // Beat drops at 1:15 (75s). Song starts at 55s. So 20s after playback.
      beatTimerRef.current = setTimeout(() => {
        setBeatDrop(true);
      }, 20000);
    };

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          startBeatTimer();
        })
        .catch(() => {});
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };

    audio
      .play()
      .then(() => {
        setPlaying(true);
        startBeatTimer();
      })
      .catch(() => {
        document.addEventListener("click", tryPlay, { once: false });
        document.addEventListener("touchstart", tryPlay, { once: false });
        document.addEventListener("keydown", tryPlay, { once: false });
        document.addEventListener("scroll", tryPlay, { once: false });
      });

    return () => {
      audio.pause();
      audio.src = "";
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("scroll", tryPlay);
    };
  }, []);

  // Fireworks on beat drop — original style, runs until song loops
  useEffect(() => {
    if (!beatDrop) return;

    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
      "#ff8800",
      "#ffffff",
    ];
    const isMobile = window.innerWidth < 768;
    const streamCount = isMobile ? 1 : 2;
    const burstCount = isMobile ? 96 : 120;
    let rafId;
    let stopped = false;

    const frame = () => {
      if (stopped) return;
      confetti({
        particleCount: streamCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: streamCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
        zIndex: 9999,
      });
      rafId = requestAnimationFrame(frame);
    };

    // Big burst first
    confetti({
      particleCount: burstCount,
      spread: 100,
      origin: { y: 0.5 },
      colors,
      zIndex: 9999,
    });

    frame();

    // Stop when song loops (161s of fireworks), then restart on next beat drop
    const fireworkDuration = 161000;
    const loopTotal = 196000;
    const beatDropOffset = 35000;

    const stopAndLoop = () => {
      stopped = true;
      cancelAnimationFrame(rafId);

      setTimeout(() => {
        // Restart on next beat drop
        stopped = false;
        confetti({
          particleCount: burstCount,
          spread: 100,
          origin: { y: 0.5 },
          colors,
          zIndex: 9999,
        });
        frame();
        setTimeout(stopAndLoop, fireworkDuration);
      }, beatDropOffset);
    };

    const loopTimeout = setTimeout(stopAndLoop, fireworkDuration);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(loopTimeout);
    };
  }, [beatDrop]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      trackEvent("Music Toggled", { action: "pause", page: "Party" });
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          trackEvent("Music Toggled", { action: "play", page: "Party" });
        })
        .catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full px-6 md:px-12 py-16 md:py-24 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="font-black text-white text-center mb-12 md:mb-24"
          style={{
            fontFamily: "'Cubao Wide', sans-serif",
            fontSize: "clamp(3.2rem, 12vw, 16rem)",
          }}
        >
          Party Itirenary
        </motion.h1>

        {/* ===== DAY 1 ===== */}
        <div className="mb-12 md:mb-20">
          <h2
            style={{
              color: "#e91e90",
              fontFamily: "'Gulfs Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6vw, 8rem)",
            }}
          >
            Day 1 - 23<sup>rd</sup> April
          </h2>
        </div>

        {/* Mehendi & Bhaat */}
        <div className="mb-10">
          <h3
            className="font-black uppercase tracking-wide mb-2"
            style={{
              color: "#2ecc40",
              fontFamily: "'Cubao Narrow', sans-serif",
              fontSize: "clamp(2rem, 5vw, 5rem)",
            }}
          >
            Mehendi & Bhaat - 1 PM
          </h3>
          <p
            style={{
              color: "#2ecc40",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
            }}
          >
            Get Inked, Get Fed
          </p>
        </div>

        {/* Party #1 */}
        <div className="mb-4">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #1
          </h3>
          <p
            style={{
              color: "#00ffff",
              fontFamily: "'Gulfs Display', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 5rem)",
            }}
          >
            Welcome Drinks & Drags @ Arpit's suite
          </p>
        </div>

        {/* Dance Practice */}
        <div className="mb-10 mt-6">
          <p
            style={{
              color: "#00ffff",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 3.5rem)",
            }}
          >
            Dance Practice - choreographed by Iron Man
          </p>
        </div>

        {/* Party #2 */}
        <div className="mb-4">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #2
          </h3>
          <h4
            className="font-black uppercase tracking-wide mb-2"
            style={{
              color: "#e67e22",
              fontFamily: "'Cubao Narrow', sans-serif",
              fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)",
            }}
          >
            Sangeet & DJ Night - 7 PM
          </h4>
          <p
            style={{
              color: "#e67e22",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
            }}
          >
            Party, perform, party, perform,
          </p>
          <p
            style={{
              color: "#e67e22",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1rem, 2.2vw, 2.2rem)",
            }}
          >
            but with Naniji around
          </p>
        </div>

        {/* Party #3 */}
        <div className="mb-16 mt-8">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #3
          </h3>
          <p
            style={{
              color: "#5b4ce0",
              fontFamily: "'Gulfs Display', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 5rem)",
            }}
          >
            After Party @ Arpit's suite, No Naniji here
          </p>
        </div>

        {/* Separator */}
        <div className="my-16 md:my-20 flex justify-center">
          <div className="w-full max-w-2xl h-1 bg-white rounded-full" />
        </div>

        {/* ===== DAY 2 ===== */}
        <div className="mb-12 md:mb-20">
          <h2
            style={{
              color: "#e91e90",
              fontFamily: "'Gulfs Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6vw, 8rem)",
            }}
          >
            Day 2 - 24<sup>th</sup> April
          </h2>
        </div>

        {/* Haldi */}
        <div className="mb-10">
          <h3
            className="font-black uppercase tracking-wide mb-2"
            style={{
              color: "#ecc94b",
              fontFamily: "'Cubao Narrow', sans-serif",
              fontSize: "clamp(2rem, 5vw, 5rem)",
            }}
          >
            Haldi - 11 AM
          </h3>
          <p
            style={{
              color: "#ecc94b",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.2rem, 3vw, 3rem)",
            }}
          >
            Sober up, have some lemonade, and tear Arpit's kurta
          </p>
        </div>

        {/* Party #4 */}
        <div className="mb-4">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #4
          </h3>
          <p
            className="mb-2"
            style={{
              color: "#3b82f6",
              fontFamily: "'Gulfs Display', serif",
              fontSize: "clamp(1.6rem, 3.8vw, 4rem)",
            }}
          >
            Gentleman's (& woman's) drinks @ Arpit's suite
          </p>
          <p
            style={{
              color: "#00ffff",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
            }}
          >
            Get ready for Baarat
          </p>
        </div>

        {/* Party #5 */}
        <div className="mb-4 mt-8">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #5
          </h3>
          <h4
            className="font-black uppercase tracking-wide mb-2"
            style={{
              color: "#ef4444",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)",
            }}
          >
            Baarat - 5 PM
          </h4>
          <p
            style={{
              color: "#ef4444",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
            }}
          >
            Dance till your legs fall off
          </p>
        </div>

        {/* Jaimala, Reception & Pheras */}
        <div className="mb-10 mt-8">
          <h3
            className="font-black uppercase tracking-wide mb-2"
            style={{
              color: "#e91e90",
              fontFamily: "'Cubao Narrow', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 4.5rem)",
            }}
          >
            Jaimala, Reception & Pheras - 8 PM Onwards
          </h3>
          <p
            style={{
              color: "#e91e90",
              fontFamily: "'Garet', sans-serif",
              fontSize: "clamp(1.4rem, 3.5vw, 3.5rem)",
            }}
          >
            Summon your inner Sajjan
          </p>
        </div>

        {/* Party #6 */}
        <div className="mb-16">
          <h3
            className="font-black uppercase tracking-wide"
            style={{
              color: "#e53e3e",
              fontFamily: "'Gulfs Display', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
            }}
          >
            Party #6
          </h3>
          <p
            style={{
              color: "#6b7280",
              fontFamily: "'Gulfs Display', serif",
              fontSize: "clamp(1.8rem, 4.5vw, 5rem)",
            }}
          >
            5 parties were enough, no?
          </p>
        </div>
      </div>

      {/* Music toggle */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={toggle}
        className="fixed bottom-6 left-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center cursor-pointer"
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
                  className="w-[3px] bg-white rounded-full"
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
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default PartyPage;
