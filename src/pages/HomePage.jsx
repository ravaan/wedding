import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";
import Hero from "../components/sections/Hero";
import Divider from "../components/ui/Divider";
import content from "../data/content.json";
import { trackPageView, trackClick, trackEvent } from "../services/analytics";

const DEFAULT_REGISTRIES = [
  {
    name: "Amazon Wish List",
    url: "https://www.amazon.in/hz/wishlist/ls/25M96EYB8ASKR?ref_=wl_share",
  },
];

const HomePage = () => {
  const [digits, setDigits] = useState(["", "", ""]);
  const [shake, setShake] = useState(false);
  const digitRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];

  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 2) {
      digitRefs[index + 1].current?.focus();
    }
  };

  const handleDigitKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      digitRefs[index - 1].current?.focus();
    }
  };

  const riddleAnswer = digits.join("");
  const registries = DEFAULT_REGISTRIES;
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView("Home");
  }, []);

  return (
    <>
      <Hero />

      {/* Schedule Section */}
      <section className="pt-20 pb-20 md:pb-32">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl tracking-tight mb-16 text-center text-[var(--theme-gold)]">
              Functions & Ceremonies
            </h2>

            {/* Day 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <Divider motif="floral" className="mb-8" />
              <h2 className="font-script text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-primary-500">
                Day One
              </h2>
              <p className="text-label text-xs">APRIL 23, 2026</p>
            </motion.div>

            <div className="space-y-8 mb-16 md:mb-24">
              {content.events.day1.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white p-6 border border-orange"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-semibold text-orange">
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-primary-500">
                        {event.name}
                      </h3>

                      <div className="space-y-2">
                        {event.dressCode && (
                          <p className="text-sm md:text-base font-semibold italic text-[var(--theme-green)]">
                            {event.dressCode}
                          </p>
                        )}
                        <p className="flex items-center justify-center md:justify-start gap-2 text-sm">
                          <MapPin
                            size={14}
                            strokeWidth={2}
                            className="text-orange"
                          />
                          <span className="text-xs font-semibold text-primary-500">
                            {event.venue}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Day 2 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <Divider motif="floral" className="mb-8" />
              <h2 className="font-script text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-primary-500">
                Day Two
              </h2>
              <p className="text-label text-xs">APRIL 24, 2026</p>
            </motion.div>

            <div className="space-y-8 mb-16 md:mb-24">
              {content.events.day2.events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white p-6 border border-orange"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
                    <div className="md:text-right">
                      <p className="font-display text-2xl md:text-3xl font-semibold text-orange">
                        {event.time}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-4 text-primary-500">
                        {event.name}
                      </h3>

                      <div className="space-y-2">
                        {event.dressCode && (
                          <p className="text-sm md:text-base font-semibold italic text-[var(--theme-green)]">
                            {event.dressCode}
                          </p>
                        )}
                        <p className="flex items-center justify-center md:justify-start gap-2 text-sm">
                          <MapPin
                            size={14}
                            strokeWidth={2}
                            className="text-orange"
                          />
                          <span className="text-xs font-semibold text-primary-500">
                            {event.venue}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gift Registry Section */}
      <section className="py-20 md:py-32 bg-batik-cream batik-bg border-y-4 border-[var(--theme-gold)]">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl lg:text-6xl text-[var(--theme-gold)] mb-4"
              style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 600 }}
            >
              Gift Registry
            </h2>
            <Divider motif="floral" className="my-6" />
            <p
              className="text-lg text-primary-500 leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your presence at our wedding is the greatest gift of all. However,
              if you wish to honour us with a gift, please use our Amazon
              Wishlist.
            </p>
          </motion.div>

          <div className="space-y-4">
            {registries.map((registry, index) => (
              <motion.a
                key={registry.name}
                href={registry.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackClick("Gift Registry Link", { registry: registry.name })
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex items-center justify-center gap-2 bg-white border border-orange px-8 py-4 transition-all duration-300 hover:border-[var(--theme-gold)]/50 hover:shadow-sm"
              >
                <h3 className="text-xl font-display font-semibold text-primary-600 group-hover:text-[var(--theme-gold)] transition-colors mb-0">
                  {registry.name}
                </h3>
                <ExternalLink
                  size={18}
                  className="text-primary-300 group-hover:text-[var(--theme-gold)] transition-colors flex-shrink-0"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Riddle Section */}
      <section className="hero-panel py-32 relative overflow-hidden">
        <div className="absolute inset-0 batik-bg opacity-20" />
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 text-center relative z-10">
          <h2
            className="text-5xl lg:text-6xl text-[var(--theme-gold-light)] mb-4"
            style={{ fontFamily: "'Cormorant SC', serif", fontWeight: 600 }}
          >
            A Little Riddle
          </h2>
          <Divider motif="floral" className="mb-12" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xl lg:text-2xl font-display font-semibold leading-relaxed text-white/80 mb-10 italic">
              The answer to life, the universe, and everything -
              <br />
              just add a whiff of nothing and you'll have it...
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const isCorrect = riddleAnswer.trim() === "420";
                trackEvent("Riddle Attempted", {
                  answer: riddleAnswer,
                  correct: isCorrect,
                });
                if (isCorrect) {
                  window.scrollTo(0, 0);
                  navigate("/party");
                } else {
                  setShake(true);
                  setTimeout(() => setShake(false), 500);
                }
              }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="flex items-center justify-center gap-3"
                animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={digitRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleDigitKeyDown(i, e)}
                    className="w-14 h-16 text-center bg-transparent border-2 border-[var(--theme-gold)] text-white font-display text-3xl font-semibold focus:outline-none focus:border-[var(--theme-gold-light)] transition-colors rounded"
                  />
                ))}
              </motion.div>
              <button
                type="submit"
                className="mt-2 bg-[var(--theme-gold)] text-white font-sans text-xs font-bold tracking-[0.2em] uppercase px-8 py-3 border-2 border-[var(--theme-gold-light)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--theme-gold)]/40 cursor-pointer"
              >
                Enter
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
