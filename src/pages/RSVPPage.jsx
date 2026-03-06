import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { trackPageView, trackRSVP } from "../services/analytics";
import { submitRSVP } from "../services/rsvp";

const RSVPPage = () => {
  useEffect(() => {
    trackPageView("RSVP");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    attendance: "yes",
    dietary: "",
    message: "",
    events: {
      mehendi: true,
      engagement: true,
      haldi: true,
      wedding: true,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("event_")) {
      const eventName = name.replace("event_", "");
      setFormData((prev) => ({
        ...prev,
        events: {
          ...prev.events,
          [eventName]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    trackRSVP("start", {
      ...formData,
      timestamp: new Date().toISOString(),
    });

    try {
      await submitRSVP(formData);

      trackRSVP("complete", {
        ...formData,
        timestamp: new Date().toISOString(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("RSVP submission failed:", error);
      setSubmitError(
        error.message || "Something went wrong. Please try again.",
      );

      trackRSVP("error", {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-batik-cream pt-32 pb-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-8 border-3 border-orange rounded-full flex items-center justify-center bg-[var(--theme-green)]"
          >
            <Check
              className="w-8 h-8 text-[var(--theme-gold-light)]"
              strokeWidth={2}
            />
          </motion.div>
          <h2 className="font-script text-5xl tracking-tight mb-4 text-primary-500">
            Thank You
          </h2>
          <p className="text-base text-primary-400 leading-relaxed">
            Your response has been received. We look forward to celebrating with
            you.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-batik-cream">
      {/* Form */}
      <section className="pt-28 pb-20 md:pb-32">
        <div className="max-w-screen-sm mx-auto px-6 lg:px-12">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onSubmit={handleSubmit}
            className="space-y-12"
          >
            {/* Attendance */}
            <div>
              <label className="text-label text-xs block mb-6">
                WILL YOU BE JOINING US?
              </label>
              <div className="flex gap-1">
                <label
                  className={`
                  flex-1 py-4 px-6 text-center cursor-pointer transition-all duration-300 border-2
                  ${
                    formData.attendance === "yes"
                      ? "bg-[var(--theme-green)] text-cream border-orange"
                      : "bg-white text-primary-400 border-orange/30 hover:border-orange"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">Joyfully Accept</span>
                </label>
                <label
                  className={`
                  flex-1 py-4 px-6 text-center cursor-pointer transition-all duration-300 border-2
                  ${
                    formData.attendance === "no"
                      ? "bg-[var(--theme-green)] text-cream border-orange"
                      : "bg-white text-primary-400 border-orange/30 hover:border-orange"
                  }
                `}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            {formData.attendance === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Personal Information */}
                <div className="space-y-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-label text-xs block mb-3"
                    >
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors placeholder-primary-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-label text-xs block mb-3"
                      >
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors placeholder-primary-300"
                        placeholder="you@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-label text-xs block mb-3"
                      >
                        PHONE
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors placeholder-primary-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="text-label text-xs block mb-3"
                    >
                      NUMBER OF GUESTS
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Events Selection */}
                <div>
                  <label className="text-label text-xs block mb-6">
                    WHICH EVENTS WILL YOU ATTEND?
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        id: "mehendi",
                        label: "Bhaat & Mehendi · April 23, Afternoon",
                      },
                      {
                        id: "engagement",
                        label: "Engagement Party · April 23, Evening",
                      },
                      { id: "haldi", label: "Haldi · April 24, Morning" },
                      {
                        id: "wedding",
                        label: "Baraat, Jaimala & Pheras · April 24, Evening",
                      },
                    ].map((event) => (
                      <label
                        key={event.id}
                        className="flex items-center p-4 bg-white border-2 border-orange/30 hover:border-orange transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={`event_${event.id}`}
                          checked={formData.events[event.id]}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`
                          w-5 h-5 border-3 transition-all duration-200 mr-4
                          ${
                            formData.events[event.id]
                              ? "border-orange bg-[var(--theme-green)]"
                              : "border-orange/40 bg-white"
                          }
                        `}
                        >
                          {formData.events[event.id] && (
                            <Check
                              className="w-3.5 h-3.5 text-[var(--theme-gold-light)]"
                              strokeWidth={3}
                            />
                          )}
                        </div>
                        <span className="text-sm font-semibold text-primary-600">
                          {event.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-8">
                  <div>
                    <label
                      htmlFor="dietary"
                      className="text-label text-xs block mb-3"
                    >
                      DIETARY RESTRICTIONS
                    </label>
                    <input
                      type="text"
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors placeholder-primary-300"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-label text-xs block mb-3"
                    >
                      MESSAGE FOR THE COUPLE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-0 py-3 bg-transparent border-b-3 border-orange text-primary-800 font-semibold text-base focus:outline-none focus:border-primary-500 transition-colors resize-none placeholder-primary-300"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-400"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-700">
                    {submitError}
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    You can also contact us directly at{" "}
                    <a href="tel:+919876543210" className="underline">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  (formData.attendance === "yes" && !formData.name)
                }
                className="btn-primary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Submitting..." : "Submit Response"}
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default RSVPPage;
