/**
 * RSVP Service
 * Handles submission of RSVP data to Google Sheets via Google Apps Script
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

/**
 * Submit RSVP data to Google Sheets
 * @param {Object} formData - The RSVP form data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitRSVP(formData) {
  if (!GOOGLE_SCRIPT_URL) {
    console.error('RSVP submission failed: VITE_GOOGLE_SCRIPT_URL is not configured');
    throw new Error('RSVP service is not configured. Please contact the couple.');
  }

  // Transform form data for Google Sheets
  const payload = {
    timestamp: new Date().toISOString(),
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    attendance: formData.attendance === 'yes' ? 'Confirmed' : 'Declined',
    guestCount: parseInt(formData.guests, 10) || 1,
    events: formatEvents(formData.events),
    dietary: formData.dietary || '',
    message: formData.message || '',
    source: 'website',
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors for POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // With no-cors mode, we can't read the response body
    // Google Apps Script will return opaque response
    // We assume success if no network error occurred
    return {
      success: true,
      message: 'RSVP submitted successfully',
    };
  } catch (error) {
    console.error('RSVP submission error:', error);
    throw new Error('Failed to submit RSVP. Please try again or contact the couple directly.');
  }
}

/**
 * Format events object into a readable string
 * @param {Object} events - Events object with boolean values
 * @returns {string} Comma-separated list of events
 */
function formatEvents(events) {
  if (!events) return '';

  const eventLabels = {
    mehendi: 'Bhaat & Mehendi',
    engagement: 'Engagement Party',
    haldi: 'Haldi',
    wedding: 'Baraat, Jaimala & Pheras',
  };

  return Object.entries(events)
    .filter(([, attending]) => attending)
    .map(([event]) => eventLabels[event] || event)
    .join(', ');
}

/**
 * Check if RSVP service is configured
 * @returns {boolean}
 */
export function isRSVPServiceConfigured() {
  return Boolean(GOOGLE_SCRIPT_URL);
}
