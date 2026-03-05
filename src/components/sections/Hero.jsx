import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import content from "../../data/content.json";
import { trackCountdownView } from "../../services/analytics";

dayjs.extend(duration);

// Reusable Indian motif SVG components
const Paisley = ({ x, y, scale = 1, rotate = 0, fill, fillOpacity = 1 }) => (
  <g
    transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
    fillOpacity={fillOpacity}
  >
    <path
      d="M0-40c-18 0-32 18-32 36 0 24 14 40 32 52 18-12 32-28 32-52 0-18-14-36-32-36z"
      fill={fill}
    />
    <path
      d="M0-28c-12 0-22 12-22 26 0 18 10 30 22 38 12-8 22-20 22-38 0-14-10-26-22-26z"
      fill="none"
      stroke={fill}
      strokeWidth="1.5"
      strokeOpacity="0.6"
    />
    <path
      d="M0-16c-7 0-13 8-13 17 0 12 6 20 13 26 7-6 13-14 13-26 0-9-6-17-13-17z"
      fill="none"
      stroke={fill}
      strokeWidth="1"
      strokeOpacity="0.4"
    />
    <path
      d="M0-40c-6-8-16-10-22-4s-4 16 4 20"
      fill="none"
      stroke={fill}
      strokeWidth="2"
      strokeOpacity="0.7"
    />
    <circle cx="0" cy="8" r="3" fill={fill} fillOpacity="0.5" />
  </g>
);

const Lotus = ({ x, y, scale = 1, rotate = 0, fill, fillOpacity = 1 }) => (
  <g
    transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
    fillOpacity={fillOpacity}
  >
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-18"
        rx="6"
        ry="18"
        fill={fill}
        transform={`rotate(${a})`}
      />
    ))}
    {[15, 45, 75, 105, 135, 165].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-26"
        rx="8"
        ry="26"
        fill={fill}
        fillOpacity="0.5"
        transform={`rotate(${a})`}
      />
    ))}
    <circle cx="0" cy="0" r="6" fill="#D4993D" fillOpacity="0.8" />
    <circle cx="0" cy="0" r="3" fill="#E8C84A" fillOpacity="0.9" />
  </g>
);

const Marigold = ({ x, y, scale = 1, fill, fillOpacity = 1 }) => (
  <g
    transform={`translate(${x},${y}) scale(${scale})`}
    fillOpacity={fillOpacity}
  >
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-14"
        rx="5"
        ry="10"
        fill={fill}
        transform={`rotate(${a})`}
      />
    ))}
    {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-10"
        rx="4"
        ry="7"
        fill={fill}
        fillOpacity="0.7"
        transform={`rotate(${a})`}
      />
    ))}
    <circle cx="0" cy="0" r="5" fill="#D4993D" fillOpacity="0.9" />
  </g>
);

const MangoLeaf = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  fill = "#2A5038",
  fillOpacity = 0.7,
}) => (
  <g
    transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
    fillOpacity={fillOpacity}
  >
    <path d="M0 0c-4-10-2-28 0-40 2 12 4 30 0 40z" fill={fill} />
    <path
      d="M0-10c-6-4-14-2-18 4M0-20c-8-3-16 0-20 6M0-30c-5-2-10 1-12 5"
      fill="none"
      stroke={fill}
      strokeWidth="0.8"
      strokeOpacity="0.5"
    />
  </g>
);

const MehendiVine = ({
  x,
  y,
  scale = 1,
  rotate = 0,
  stroke = "#D4993D",
  strokeOpacity = 0.6,
}) => (
  <g
    transform={`translate(${x},${y}) scale(${scale}) rotate(${rotate})`}
    strokeOpacity={strokeOpacity}
  >
    <path
      d="M0 0c8-12 4-28 12-40c-4-2-8 4-12 10c-4-10-2-24 6-32"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path d="M6-20c-3-2-6 0-6 3s3 4 6 3" fill={stroke} fillOpacity="0.4" />
    <path d="M2-35c-2-2-5 0-5 2s2 3 5 2" fill={stroke} fillOpacity="0.3" />
    <circle cx="14" cy="-42" r="1.5" fill={stroke} fillOpacity="0.5" />
    <circle cx="8" cy="-32" r="1" fill={stroke} fillOpacity="0.4" />
    <circle cx="0" cy="-8" r="1" fill={stroke} fillOpacity="0.4" />
  </g>
);

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = dayjs("2026-04-25 10:00:00");

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
    <section className="relative min-h-screen overflow-hidden">
      {/* === MAROON BORDER FRAME (outermost) === */}
      <div className="absolute inset-0 batik-bg-dark" />

      {/* === ORANGE BORDER === */}
      <div className="absolute inset-[clamp(20px,4vw,48px)] border-4 border-orange z-[1]">
        {/* Inner gold border */}
        <div className="absolute inset-2 border border-[#D4993D]/40" />
      </div>

      {/* === GREEN CENTER (fills most of viewport) === */}
      <div
        className="absolute z-[2]"
        style={{
          inset: "calc(clamp(20px, 4vw, 48px) + 4px)",
          background: "linear-gradient(180deg, #3A6B4A 0%, #2A5038 100%)",
        }}
      >
        {/* Top floral crown INSIDE the green area */}
        <div className="absolute top-0 left-0 right-0 h-40 md:h-56 opacity-90 pointer-events-none">
          <svg
            viewBox="0 0 800 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin slice"
            className="w-full h-full"
          >
            {/* Large central lotus */}
            <Lotus x={400} y={65} scale={2.2} fill="#E8508A" />

            {/* Flanking paisleys */}
            <Paisley x={270} y={80} scale={1.4} rotate={-30} fill="#4A7EC8" />
            <Paisley x={530} y={80} scale={1.4} rotate={30} fill="#4A7EC8" />

            {/* Large marigolds */}
            <Marigold x={160} y={55} scale={1.8} fill="#E87A4A" />
            <Marigold x={640} y={55} scale={1.8} fill="#E87A4A" />

            {/* Smaller lotuses on far sides */}
            <Lotus x={70} y={70} scale={1.3} fill="#E84545" />
            <Lotus x={730} y={70} scale={1.3} fill="#E84545" />

            {/* Small paisleys at edges */}
            <Paisley x={30} y={45} scale={0.8} rotate={-45} fill="#E8508A" />
            <Paisley x={770} y={45} scale={0.8} rotate={45} fill="#E8508A" />

            {/* Marigold accents */}
            <Marigold x={330} y={30} scale={1} fill="#D4993D" />
            <Marigold x={470} y={30} scale={1} fill="#D4993D" />

            {/* Mango leaves */}
            <MangoLeaf x={130} y={120} scale={1.5} rotate={-20} />
            <MangoLeaf x={230} y={130} scale={1.2} rotate={15} />
            <MangoLeaf x={350} y={115} scale={1.3} rotate={-10} />
            <MangoLeaf x={450} y={115} scale={1.3} rotate={10} />
            <MangoLeaf x={570} y={130} scale={1.2} rotate={-15} />
            <MangoLeaf x={670} y={120} scale={1.5} rotate={20} />

            {/* Mehendi vines draping down */}
            <MehendiVine x={110} y={160} scale={1.2} rotate={10} />
            <MehendiVine x={690} y={160} scale={1.2} rotate={-10} />
            <MehendiVine x={290} y={150} scale={0.9} rotate={5} />
            <MehendiVine x={510} y={150} scale={0.9} rotate={-5} />

            {/* Small blue flowers */}
            <Lotus
              x={200}
              y={35}
              scale={0.6}
              fill="#4A7EC8"
              fillOpacity={0.7}
            />
            <Lotus
              x={600}
              y={35}
              scale={0.6}
              fill="#4A7EC8"
              fillOpacity={0.7}
            />

            {/* Gold dots */}
            <circle cx="100" cy="25" r="2" fill="#D4993D" fillOpacity="0.6" />
            <circle cx="250" cy="15" r="1.5" fill="#D4993D" fillOpacity="0.5" />
            <circle cx="400" cy="10" r="2" fill="#D4993D" fillOpacity="0.6" />
            <circle cx="550" cy="15" r="1.5" fill="#D4993D" fillOpacity="0.5" />
            <circle cx="700" cy="25" r="2" fill="#D4993D" fillOpacity="0.6" />
          </svg>
        </div>

        {/* Bottom floral cluster INSIDE the green area */}
        <div className="absolute bottom-0 left-0 right-0 h-36 md:h-48 opacity-85 pointer-events-none">
          <svg
            viewBox="0 0 800 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax slice"
            className="w-full h-full"
          >
            <Marigold x={400} y={160} scale={2} fill="#E87A4A" />
            <Lotus x={250} y={150} scale={1.5} fill="#E8508A" />
            <Lotus x={550} y={150} scale={1.5} fill="#E8508A" />
            <Paisley x={140} y={170} scale={1.2} rotate={-140} fill="#4A7EC8" />
            <Paisley x={660} y={170} scale={1.2} rotate={140} fill="#4A7EC8" />
            <Marigold
              x={50}
              y={180}
              scale={1.2}
              fill="#E84545"
              fillOpacity={0.8}
            />
            <Marigold
              x={750}
              y={180}
              scale={1.2}
              fill="#E84545"
              fillOpacity={0.8}
            />
            <MangoLeaf x={190} y={120} scale={1.3} rotate={160} />
            <MangoLeaf x={320} y={130} scale={1.1} rotate={170} />
            <MangoLeaf x={480} y={130} scale={1.1} rotate={-170} />
            <MangoLeaf x={610} y={120} scale={1.3} rotate={-160} />
            <MehendiVine x={90} y={130} scale={1} rotate={180} />
            <MehendiVine x={710} y={130} scale={1} rotate={180} />
            <Lotus
              x={340}
              y={190}
              scale={0.6}
              fill="#D4993D"
              fillOpacity={0.7}
            />
            <Lotus
              x={460}
              y={190}
              scale={0.6}
              fill="#D4993D"
              fillOpacity={0.7}
            />
            <circle cx="180" cy="195" r="2" fill="#D4993D" fillOpacity="0.6" />
            <circle cx="620" cy="195" r="2" fill="#D4993D" fillOpacity="0.6" />
          </svg>
        </div>
      </div>

      {/* === CONTENT (centered over everything) === */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-6 py-16 md:py-20">
          {/* Gold circle behind names */}
          <div className="relative inline-block">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%] w-56 h-56 md:w-80 md:h-80 rounded-full bg-[#E8C84A] opacity-90" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[38%] w-52 h-52 md:w-72 md:h-72 rounded-full border-2 border-[#D4993D] opacity-60" />

            <div className="relative z-10">
              {/* "Save the Date" script */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="font-script text-2xl md:text-3xl text-[#E8C84A] mb-4"
              >
                Save the Date
              </motion.p>

              {/* Date banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-6 md:mb-8"
              >
                <div className="inline-block bg-orange px-6 py-2 md:px-8 md:py-3">
                  <span className="font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white">
                    APRIL 24 — 25, 2026
                  </span>
                </div>
              </motion.div>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-4 md:mb-6"
              >
                <motion.h1
                  className="font-script text-6xl md:text-8xl lg:text-9xl text-cream leading-none"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {content.wedding.brideName.split(" ")[0]}
                </motion.h1>

                <motion.div
                  className="my-2 md:my-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <span className="font-display text-3xl md:text-4xl text-[#E8C84A] font-light">
                    &
                  </span>
                </motion.div>

                <motion.h1
                  className="font-script text-6xl md:text-8xl lg:text-9xl text-cream leading-none"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {content.wedding.groomName.split(" ")[0]}
                </motion.h1>
              </motion.div>

              {/* Location */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="font-serif text-lg md:text-xl text-cream/90 italic mb-8 md:mb-10"
              >
                Nashik, Maharashtra
              </motion.p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
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
                    <div className="font-display text-3xl md:text-5xl font-semibold text-[#E8C84A]">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-cream/70 mt-1">
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
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-cream/70 font-semibold">
            Scroll
          </span>
          <svg width="2" height="24" viewBox="0 0 2 24" fill="none">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="24"
              stroke="#FFF5E6"
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
