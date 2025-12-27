import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { trackPageView, trackRSVP } from '../services/analytics';

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
      sangeet: true,
      haldi: true,
      ceremony: true,
      reception: true
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Track RSVP submission
    trackRSVP({
      ...formData,
      timestamp: new Date().toISOString()
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center">
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
            className="w-20 h-20 mx-auto mb-8 border border-primary-200 rounded-full flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-primary-600" strokeWidth={1} />
          </motion.div>
          <h2 className="font-display text-4xl font-light tracking-tight mb-4"
              style={{ fontVariationSettings: '"opsz" 48, "wght" 350' }}>
            Thank You
          </h2>
          <p className="text-base font-light text-primary-600 leading-relaxed">
            Your response has been received. We look forward to celebrating with you.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Full height with proper spacing */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-screen-lg mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <span className="text-label tracking-[0.3em] mb-12 block">
              CONFIRM YOUR ATTENDANCE
            </span>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8"
                style={{ fontVariationSettings: '"opsz" 72, "wght" 300' }}>
              RSVP
            </h1>
            <p className="lead">
              <em>Kindly respond by March 1, 2026</em>
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
                    ? 'bg-primary-900 text-white'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100'}
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
                    ? 'bg-primary-900 text-white'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100'}
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
                      className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors placeholder-primary-300"
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
                        className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors placeholder-primary-300"
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
                        className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors placeholder-primary-300"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors"
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
                      { id: 'sangeet', label: 'Sangeet · April 24, Evening' },
                      { id: 'haldi', label: 'Haldi · April 25, Morning' },
                      { id: 'ceremony', label: 'Wedding Ceremony · April 25, Noon' },
                      { id: 'reception', label: 'Reception · April 25, Evening' }
                    ].map(event => (
                      <label
                        key={event.id}
                        className="flex items-center p-4 bg-primary-50 hover:bg-primary-100 transition-colors cursor-pointer"
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
                            ? 'border-primary-900 bg-primary-900'
                            : 'border-primary-300 bg-white'}
                        `}>
                          {formData.events[event.id] && (
                            <Check className="w-3 h-3 text-white" strokeWidth={2} />
                          )}
                        </div>
                        <span className="text-sm font-light text-primary-700">
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
                      className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors placeholder-primary-300"
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
                      className="w-full px-0 py-3 bg-transparent border-b border-primary-200 text-primary-900 font-light text-base focus:outline-none focus:border-primary-400 transition-colors resize-none placeholder-primary-300"
                      placeholder="Optional"
                    />
                  </div>
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