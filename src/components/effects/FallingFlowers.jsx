import React, { useEffect, useRef } from "react";

const basePath = import.meta.env.BASE_URL || "/";

const FLOWER_SRCS = [
  "flower-coral.png",
  "flower-cream.png",
  "flower-pink.png",
  "flower-peach.png",
  "flower-purple.png",
];

const rand = (min, max) => Math.random() * (max - min) + min;

const GRAVITY = 120; // px/s^2 — gentle real-world feel
const DRAG = 0.3; // air resistance factor

const createParticle = (w, h, isBurst) => ({
  x: rand(0, w),
  y: rand(-80, -20),
  vy: isBurst ? rand(60, 180) : rand(20, 60), // initial downward speed
  vx: rand(-30, 30), // horizontal drift
  rotation: rand(0, 360),
  rotationSpeed: rand(-90, 90), // degrees/s
  size: isBurst ? rand(22, 50) : rand(16, 34),
  opacity: isBurst ? rand(0.6, 0.95) : rand(0.35, 0.75),
  imgIndex: Math.floor(Math.random() * FLOWER_SRCS.length),
  swayPhase: rand(0, Math.PI * 2),
  swaySpeed: rand(1.5, 3),
  swayAmount: rand(15, 40),
  delay: isBurst ? rand(0, 0.6) : rand(0.8, 6),
  started: false,
  done: false,
});

const FallingFlowers = ({ triggered }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const imagesRef = useRef([]);
  const triggeredRef = useRef(false);

  // Preload images once
  useEffect(() => {
    const imgs = FLOWER_SRCS.map((src) => {
      const img = new Image();
      img.src = `${basePath}florals/${src}`;
      return img;
    });
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    if (!triggered || triggeredRef.current) return;
    triggeredRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const burstCount = isMobile ? 35 : 60;
    const trickleCount = isMobile ? 15 : 25;

    const particles = [
      ...Array.from({ length: burstCount }, () =>
        createParticle(canvas.width, canvas.height, true),
      ),
      ...Array.from({ length: trickleCount }, () =>
        createParticle(canvas.width, canvas.height, false),
      ),
    ];

    const startTime = performance.now();
    let lastTime = startTime;

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta to avoid jumps
      const elapsed = (now - startTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDone = true;

      for (const p of particles) {
        if (p.done) continue;

        if (!p.started) {
          if (elapsed >= p.delay) {
            p.started = true;
          } else {
            allDone = false;
            continue;
          }
        }

        // Physics
        p.vy += GRAVITY * dt;
        p.vy *= 1 - DRAG * dt; // air resistance
        p.vx *= 1 - DRAG * 0.5 * dt;

        p.y += p.vy * dt;
        p.x +=
          p.vx * dt +
          Math.sin(p.swayPhase + elapsed * p.swaySpeed) * p.swayAmount * dt;
        p.rotation += p.rotationSpeed * dt;

        // Fade out near bottom
        let alpha = p.opacity;
        if (p.y > canvas.height * 0.8) {
          alpha *= Math.max(
            0,
            1 - (p.y - canvas.height * 0.8) / (canvas.height * 0.3),
          );
        }

        if (p.y > canvas.height + 60) {
          p.done = true;
          continue;
        }

        allDone = false;

        const img = imagesRef.current[p.imgIndex];
        if (!img || !img.complete) continue;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      if (!allDone) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [triggered]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default FallingFlowers;
