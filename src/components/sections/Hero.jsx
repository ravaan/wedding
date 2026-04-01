import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import content from "../../data/content.json";
import flowerData from "../../data/flowerLayout.json";
import FlowerEditor from "../editor/FlowerEditor";
import { trackCountdownView, trackEvent } from "../../services/analytics";

dayjs.extend(duration);

const basePath = import.meta.env.BASE_URL || "/";

// Flower image element with absolute positioning and CSS transforms
const FlowerImg = ({
  src,
  className = "",
  style = {},
  alt = "decorative flower",
}) => (
  <img
    src={`${basePath}florals/${src}`}
    alt={alt}
    className={`absolute pointer-events-none select-none ${className}`}
    style={{ ...style }}
    loading="eager"
    draggable={false}
  />
);

// Thin gold ornament with diamond motif
const GoldOrnament = ({ width = "200px", className = "" }) => (
  <svg
    viewBox="0 0 200 20"
    fill="none"
    style={{ width }}
    className={`mx-auto ${className}`}
  >
    <line
      x1="0"
      y1="10"
      x2="85"
      y2="10"
      style={{ stroke: "var(--theme-gold)" }}
      strokeWidth="0.5"
    />
    <line
      x1="115"
      y1="10"
      x2="200"
      y2="10"
      style={{ stroke: "var(--theme-gold)" }}
      strokeWidth="0.5"
    />
    <path
      d="M95 10 L100 5 L105 10 L100 15 Z"
      style={{ fill: "var(--theme-gold)" }}
    />
  </svg>
);

// Detect portrait vs landscape orientation
const useOrientation = () => {
  const [orientation, setOrientation] = useState(() =>
    window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : "landscape",
  );

  useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)");
    const handler = (e) => setOrientation(e.matches ? "portrait" : "landscape");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return orientation;
};

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [editorMode, setEditorMode] = useState(
    () => new URLSearchParams(window.location.search).get("editor") === "true",
  );
  const orientation = useOrientation();
  const [editOrientation, setEditOrientation] = useState(orientation);
  const [landscapeFlowers, setLandscapeFlowers] = useState(
    flowerData.landscape.flowers,
  );
  const [portraitFlowers, setPortraitFlowers] = useState(
    flowerData.portrait.flowers,
  );
  const activeOrientation = editorMode ? editOrientation : orientation;
  const flowers =
    activeOrientation === "portrait" ? portraitFlowers : landscapeFlowers;
  const simulateViewport = editorMode && editOrientation !== orientation;
  const widthUnit = simulateViewport ? "%" : "vw";
  const topClusterRef = useRef(null);
  const bottomClusterRef = useRef(null);
  const sectionRef = useRef(null);
  // Toggle editor with Ctrl+Shift+E
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        e.preventDefault();
        setEditorMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const weddingDate = dayjs("2026-04-23 10:00:00");

    const updateCountdown = () => {
      const now = dayjs();
      const diff = weddingDate.diff(now);

      if (diff > 0) {
        const dur = dayjs.duration(diff);
        setCountdown({
          days: Math.floor(dur.asDays()),
          hours: dur.hours(),
          minutes: dur.minutes(),
          seconds: dur.seconds(),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    trackCountdownView(
      Math.floor(dayjs.duration(weddingDate.diff(dayjs())).asDays()),
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={
        simulateViewport
          ? { maxWidth: "56vh", margin: "0 auto", height: "100vh" }
          : undefined
      }
    >
      {/* === LIGHT BACKGROUND === */}
      <div className="absolute inset-0 bg-[var(--theme-cream)]" />

      {/* === BRIGHT GOLD BORDER === */}
      <div className="absolute inset-[clamp(10px,2vw,24px)] border-2 border-[var(--theme-gold)] z-[1]" />

      {/* === CREAM CENTER === */}
      <div
        className="absolute z-[2] overflow-hidden"
        style={{
          inset: "calc(clamp(10px, 2vw, 24px) + 2px)",
          background:
            "linear-gradient(180deg, var(--theme-cream-light) 0%, var(--theme-cream) 50%, var(--theme-cream-dark) 100%)",
          clipPath: "inset(0)",
        }}
      >
        {/* ===== TOP FLORAL CLUSTER ===== */}
        <div
          ref={topClusterRef}
          className="absolute top-0 left-0 right-0 h-[30vh] md:h-[26vh] pointer-events-none"
        >
          {flowers
            .filter((f) => f.cluster === "top")
            .map((f) => (
              <FlowerImg
                key={f.id}
                src={f.src}
                style={{
                  top: `${f.y}%`,
                  left: `${f.x}%`,
                  width: `${f.width}${widthUnit}`,
                  opacity: f.opacity,
                  transform: `rotate(${f.rotation}deg) scaleX(${f.scaleX})`,
                }}
              />
            ))}
        </div>

        {/* ===== BOTTOM FLORAL CLUSTER ===== */}
        <div
          ref={bottomClusterRef}
          className="absolute bottom-0 left-0 right-0 h-[30vh] md:h-[26vh] pointer-events-none"
        >
          {flowers
            .filter((f) => f.cluster === "bottom")
            .map((f) => (
              <FlowerImg
                key={f.id}
                src={f.src}
                style={{
                  bottom: `${-f.y}%`,
                  left: `${f.x}%`,
                  width: `${f.width}${widthUnit}`,
                  opacity: f.opacity,
                  transform: `rotate(${f.rotation}deg) scaleX(${f.scaleX})`,
                }}
              />
            ))}
        </div>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 py-16 md:py-20">
          <div className="relative inline-block">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <GoldOrnament width="180px" className="mb-6" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-6 md:mb-8"
              >
                <motion.h1
                  className="font-script text-5xl md:text-7xl lg:text-8xl text-[var(--theme-green-dark)] leading-none tracking-[0.12em] font-semibold"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    textShadow: "0 1px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {content.wedding.brideName.split(" ")[0]}
                </motion.h1>

                <motion.div
                  className="my-3 md:my-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <span
                    className="text-2xl md:text-3xl text-[var(--theme-gold)] font-light"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                    }}
                  >
                    &amp;
                  </span>
                </motion.div>

                <motion.h1
                  className="font-script text-5xl md:text-7xl lg:text-8xl text-[var(--theme-green-dark)] leading-none tracking-[0.12em] font-semibold"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    textShadow: "0 1px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {content.wedding.groomName.split(" ")[0]}
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <GoldOrnament width="140px" className="mb-5" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="font-sans text-[11px] md:text-xs font-medium tracking-[0.25em] uppercase text-[var(--theme-text-dark)] mb-2"
              >
                April 23 — 24, 2026
              </motion.p>

              <motion.a
                href={content.venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="block text-lg md:text-xl text-[var(--theme-text-muted)] italic mb-10 hover:text-[var(--theme-gold)] transition-colors"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                }}
              >
                Taj Gateway, Nashik
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="flex justify-center gap-6 md:gap-10"
              >
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Min" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="font-display text-3xl md:text-5xl font-medium text-[var(--theme-gold)]">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            trackEvent("Scroll Indicator Clicked", { page: "Home" });
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[var(--theme-text-muted)] font-semibold">
            Scroll
          </span>
          <svg width="2" height="24" viewBox="0 0 2 24" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="24"
              style={{ stroke: "var(--theme-text-muted)" }}
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* === FLOWER EDITOR OVERLAY === */}
      {editorMode && (
        <FlowerEditor
          flowers={flowers}
          landscapeFlowers={landscapeFlowers}
          setLandscapeFlowers={setLandscapeFlowers}
          portraitFlowers={portraitFlowers}
          setPortraitFlowers={setPortraitFlowers}
          orientation={orientation}
          editOrientation={editOrientation}
          setEditOrientation={setEditOrientation}
          simulateViewport={simulateViewport}
          sectionRef={sectionRef}
          topClusterRef={topClusterRef}
          bottomClusterRef={bottomClusterRef}
        />
      )}
    </section>
  );
};

export default Hero;
