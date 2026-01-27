import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { trackPageView, trackRSVP } from '../services/analytics';
import { submitRSVP, isRSVPServiceConfigured } from '../services/rsvp';
import FloralDecoration from '../components/ui/FloralDecoration';

const RSVPPage = () => {
  useEffect(() => {
    trackPageView('RSVP');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attendance: 'yes',
    dietary: '',
    message: '',
    events: {
      mehendi: true,
      engagement: true,
      haldi: true,
      wedding: true
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('event_')) {
      const eventName = name.replace('event_', '');
      setFormData(prev => ({
        ...prev,
        events: {
          ...prev.events,
          [eventName]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Track RSVP submission attempt
    trackRSVP('start', {
      ...formData,
      timestamp: new Date().toISOString()
    });

    try {
      // Submit to Google Sheets
      await submitRSVP(formData);

      // Track successful submission
      trackRSVP('complete', {
        ...formData,
        timestamp: new Date().toISOString()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('RSVP submission failed:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');

      // Track error
      trackRSVP('error', {
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 md:w-48 h-auto pointer-events-none">
          <FloralDecoration variant="corner-left" className="w-full h-auto" />
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-48 h-auto pointer-events-none">
          <FloralDecoration variant="corner-right" className="w-full h-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-md mx-auto px-6"
        >
          <FloralDecoration variant="small-flower" className="w-12 h-12 mx-auto mb-6" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-8 border-2 border-gold rounded-full flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-gold-light" strokeWidth={1} />
          </motion.div>
          <h2 className="font-display text-4xl font-light tracking-tight mb-4 text-white"
              style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
            Thank You
          </h2>
          <p className="text-base font-light text-white/70 leading-relaxed">
            Your response has been received. We look forward to celebrating with you.
          </p>
          <FloralDecoration variant="divider" className="w-48 h-auto mx-auto mt-8" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header - Full height with proper spacing */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 h-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <FloralDecoration variant="corner-left" className="w-full h-auto" />
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 h-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <FloralDecoration variant="corner-right" className="w-full h-auto" />
          </motion.div>
        </div>

        <div className="max-w-screen-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <span className="text-label tracking-[0.3em] mb-12 block text-white/80">
              CONFIRM YOUR ATTENDANCE
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 text-white"
                style={{ fontVariationSettings: '"opsz" 72, "wght" 300' }}>
              RSVP
            </h1>
            <FloralDecoration variant="divider" className="w-48 md:w-64 h-auto mx-auto mb-6" />
            <p className="lead text-white/80">
              <em>Kindly respond by March 15, 2025</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form - Minimal Editorial */}
      <section className="py-20 md:py-32">
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
              <div className="flex gap-px">
                <label className={`
                  flex-1 py-4 px-6 text-center cursor-pointer transition-all duration-300
                  ${formData.attendance === 'yes'
                    ? 'bg-gold text-primary-900'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'}
                `}>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === 'yes'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-light">
                    Joyfully Accept
                  </span>
                </label>
                <label className={`
                  flex-1 py-4 px-6 text-center cursor-pointer transition-all duration-300
                  ${formData.attendance === 'no'
                    ? 'bg-gold text-primary-900'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'}
                `}>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === 'no'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-light">
                    Regretfully Decline
                  </span>
                </label>
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Personal Information */}
                <div className="space-y-8">
                  <div>
                    <label htmlFor="name" className="text-label text-xs block mb-3">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors placeholder-white/40"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="email" className="text-label text-xs block mb-3">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors placeholder-white/40"
                        placeholder="you@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="text-label text-xs block mb-3">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors placeholder-white/40"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="guests" className="text-label text-xs block mb-3">
                      NUMBER OF GUESTS
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Events Selection */}
                <div>
                  <label className="text-label text-xs block mb-6">
                    WHICH EVENTS WILL YOU ATTEND?
                  </label>
                  <div className="space-y-px">
                    {[
                      { id: 'mehendi', label: 'Bhaat & Mehendi · April 23, Afternoon' },
                      { id: 'engagement', label: 'Engagement Party · April 23, Evening' },
                      { id: 'haldi', label: 'Haldi · April 24, Morning' },
                      { id: 'wedding', label: 'Baraat, Jaimala & Pheras · April 24, Evening' }
                    ].map(event => (
                      <label
                        key={event.id}
                        className="flex items-center p-4 bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={`event_${event.id}`}
                          checked={formData.events[event.id]}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`
                          w-4 h-4 border transition-all duration-200 mr-4
                          ${formData.events[event.id]
                            ? 'border-gold bg-gold'
                            : 'border-white/30 bg-transparent'}
                        `}>
                          {formData.events[event.id] && (
                            <Check className="w-3 h-3 text-primary-900" strokeWidth={2} />
                          )}
                        </div>
                        <span className="text-sm font-light text-white/80">
                          {event.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-8">
                  <div>
                    <label htmlFor="dietary" className="text-label text-xs block mb-3">
                      DIETARY RESTRICTIONS
                    </label>
                    <input
                      type="text"
                      id="dietary"
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors placeholder-white/40"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-label text-xs block mb-3">
                      MESSAGE FOR THE COUPLE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white font-light text-base focus:outline-none focus:border-gold transition-colors resize-none placeholder-primary-300"
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
                className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700">{submitError}</p>
                  <p className="text-xs text-red-500 mt-1">
                    You can also contact us directly at{' '}
                    <a href="tel:+919876543210" className="underline">+91 98765 43210</a>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting || (formData.attendance === 'yes' && !formData.name)}
                className="btn-primary min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Submitting...' : 'Submit Response'}
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