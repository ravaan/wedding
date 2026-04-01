import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WeedEffects = () => {
  const [leaves, setLeaves] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate premium cannabis leaves
    const generateLeaves = () => {
      const newLeaves = [];
      // Create multiple waves of leaves for depth
      for (let wave = 0; wave < 3; wave++) {
        for (let i = 0; i < 8; i++) {
          newLeaves.push({
            id: `${wave}-${i}`,
            x: Math.random() * window.innerWidth,
            delay: wave * 7 + Math.random() * 10,
            duration: 25 + wave * 5 + Math.random() * 10,
            size: 30 + wave * 10 + Math.random() * 20,
            rotation: Math.random() * 360,
            opacity: 0.08 - wave * 0.02,
            zIndex: 10 - wave * 2,
          });
        }
      }
      setLeaves(newLeaves);

      // Generate sparkle effects
      const newSparkles = [];
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          delay: Math.random() * 10,
        });
      }
      setSparkles(newSparkles);
    };

    generateLeaves();
    window.addEventListener("resize", generateLeaves);
    return () => window.removeEventListener("resize", generateLeaves);
  }, []);

  // Premium Cannabis Leaf SVG Component
  const CannabisLeaf = ({ color = "#4ade80", opacity = 1 }) => (
    <svg viewBox="0 0 200 200" className="w-full h-full" style={{ opacity }}>
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
          <stop offset="100%" stopColor="#bbf7d0" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Cannabis Leaf Shape - 7 Points */}
      <g transform="translate(100, 100)" filter="url(#glow)">
        {/* Center leaf */}
        <path
          d="M 0,-80 Q -10,-60 -8,-40 L -3,-20 L 0,0 L 3,-20 L 8,-40 Q 10,-60 0,-80"
          fill="url(#leafGradient)"
        />

        {/* Left leaves */}
        <path
          d="M -3,-20 Q -25,-35 -45,-40 Q -50,-35 -45,-30 Q -25,-25 -3,-20"
          fill="url(#leafGradient)"
        />
        <path
          d="M -5,-35 Q -30,-50 -50,-55 Q -55,-50 -50,-45 Q -30,-40 -5,-35"
          fill="url(#leafGradient)"
        />
        <path
          d="M -4,-50 Q -25,-65 -40,-70 Q -45,-65 -40,-60 Q -25,-55 -4,-50"
          fill="url(#leafGradient)"
        />

        {/* Right leaves */}
        <path
          d="M 3,-20 Q 25,-35 45,-40 Q 50,-35 45,-30 Q 25,-25 3,-20"
          fill="url(#leafGradient)"
        />
        <path
          d="M 5,-35 Q 30,-50 50,-55 Q 55,-50 50,-45 Q 30,-40 5,-35"
          fill="url(#leafGradient)"
        />
        <path
          d="M 4,-50 Q 25,-65 40,-70 Q 45,-65 40,-60 Q 25,-55 4,-50"
          fill="url(#leafGradient)"
        />

        {/* Stem */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="30"
          stroke="url(#leafGradient)"
          strokeWidth="3"
        />
      </g>
    </svg>
  );

  return (
    <>
      {/* Premium Floating Cannabis Leaves */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {leaves.map((leaf) => (
            <motion.div
              key={leaf.id}
              className="absolute cannabis-leaf"
              initial={{
                x: leaf.x,
                y: window.innerHeight + 100,
                rotate: leaf.rotation,
                scale: 0,
              }}
              animate={{
                y: -200,
                rotate: leaf.rotation + 360,
                scale: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: leaf.duration,
                delay: leaf.delay,
                repeat: Infinity,
                ease: "linear",
                scale: {
                  times: [0, 0.1, 0.5, 0.9, 1],
                  ease: "easeInOut",
                },
              }}
              style={{
                width: leaf.size,
                height: leaf.size,
                zIndex: leaf.zIndex,
              }}
            >
              <CannabisLeaf opacity={leaf.opacity} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Premium Sparkle Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x,
              top: sparkle.y,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
          </motion.div>
        ))}
      </div>

      {/* Premium Haze Effect with Gradient Animation */}
      <div className="fixed inset-0 pointer-events-none z-15">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(74, 222, 128, 0.08) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 60%, rgba(250, 204, 21, 0.06) 0%, transparent 40%)
            `,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Premium Smoke Wisps */}
        <motion.div
          className="absolute w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(74, 222, 128, 0.03) 50%, transparent 100%)",
          }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 420 Premium Easter Egg */}
      <div className="weed-420">420</div>

      {/* Floating Particles for Depth */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-green-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              y: -10,
              x: Math.sin(i) * 50,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              delay: Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Premium Corner Badge */}
      <motion.div
        className="fixed top-8 left-8 z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="relative">
          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-green-400/20 backdrop-blur-md border border-green-400/30 rounded-full">
            <span className="text-xs font-light tracking-widest text-green-300">
              420 MODE ACTIVE
            </span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border border-green-400/50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default WeedEffects;
