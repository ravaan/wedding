import mixpanel from 'mixpanel-browser';

class Analytics {
  constructor() {
    this.initialized = false;
    this.enabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    this.token = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN;
  }

  init() {
    if (!this.enabled || !this.token || this.initialized) return;

    try {
      mixpanel.init(this.token, {
        debug: import.meta.env.DEV,
        track_pageview: true,
        persistence: 'localStorage',
        ignore_dnt: false,
        api_host: 'https://api-eu.mixpanel.com',
        loaded: (mixpanel) => {
          // Set super properties that will be sent with every event
          mixpanel.register({
            'Wedding Date': '2025-04-23',
            'Platform': 'Web',
            'Device Type': this.getDeviceType(),
            'Browser': this.getBrowserName(),
            'Screen Size': `${window.screen.width}x${window.screen.height}`,
            'Viewport Size': `${window.innerWidth}x${window.innerHeight}`,
          });
        }
      });

      this.initialized = true;

      // Track initial page view
      this.pageView(window.location.pathname);

      // Set up scroll depth tracking
      this.setupScrollDepthTracking();

      console.log('📊 Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  // Identify user (for RSVP tracking)
  identify(userId, traits = {}) {
    if (!this.enabled || !this.initialized) return;

    mixpanel.identify(userId);
    mixpanel.people.set({
      $name: traits.name,
      $email: traits.email,
      $phone: traits.phone,
      'Guest Count': traits.guestCount,
      'RSVP Status': traits.rsvpStatus,
      'Events Attending': traits.eventsAttending,
      ...traits
    });
  }

  // Track page views
  pageView(page, properties = {}) {
    if (!this.enabled || !this.initialized) return;

    mixpanel.track('Page View', {
      page,
      url: window.location.href,
      referrer: document.referrer,
      title: document.title,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  // Track custom events
  track(eventName, properties = {}) {
    if (!this.enabled || !this.initialized) return;

    mixpanel.track(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  }

  // Track user interactions
  trackClick(element, properties = {}) {
    if (!this.enabled || !this.initialized) return;

    this.track('Button Clicked', {
      element,
      ...properties
    });
  }

  // Track form interactions
  trackFormStart(formName) {
    if (!this.enabled || !this.initialized) return;

    this.track('Form Started', {
      'Form Name': formName,
      'Start Time': new Date().toISOString()
    });
  }

  trackFormField(formName, fieldName, value) {
    if (!this.enabled || !this.initialized) return;

    this.track('Form Field Completed', {
      'Form Name': formName,
      'Field Name': fieldName,
      'Has Value': !!value
    });
  }

  trackFormSubmit(formName, data = {}) {
    if (!this.enabled || !this.initialized) return;

    this.track('Form Submitted', {
      'Form Name': formName,
      'Submission Time': new Date().toISOString(),
      ...data
    });
  }

  trackFormError(formName, error) {
    if (!this.enabled || !this.initialized) return;

    this.track('Form Error', {
      'Form Name': formName,
      'Error Message': error,
      'Error Time': new Date().toISOString()
    });
  }

  // Track RSVP specific events
  trackRSVP(action, data = {}) {
    if (!this.enabled || !this.initialized) return;

    const eventMap = {
      start: 'RSVP Started',
      complete: 'RSVP Completed',
      update: 'RSVP Updated',
      cancel: 'RSVP Cancelled'
    };

    this.track(eventMap[action] || action, {
      'Guest Count': data.guestCount,
      'Meal Preference': data.mealPreference,
      'Events Attending': data.eventsAttending,
      'Accommodation Needed': data.accommodationNeeded,
      ...data
    });
  }

  // Track gallery interactions
  trackGalleryView(imageIndex, imageUrl) {
    if (!this.enabled || !this.initialized) return;

    this.track('Gallery Image Viewed', {
      'Image Index': imageIndex,
      'Image URL': imageUrl
    });
  }

  // Track travel/hotel link clicks
  trackExternalLink(linkType, destination) {
    if (!this.enabled || !this.initialized) return;

    this.track('External Link Clicked', {
      'Link Type': linkType,
      'Destination': destination
    });
  }

  // Track language change
  trackLanguageChange(fromLang, toLang) {
    if (!this.enabled || !this.initialized) return;

    this.track('Language Changed', {
      'From Language': fromLang,
      'To Language': toLang
    });
  }

  // Track ceremony guide views
  trackCeremonyView(ceremonyName) {
    if (!this.enabled || !this.initialized) return;

    this.track('Ceremony Guide Viewed', {
      'Ceremony Name': ceremonyName
    });
  }

  // Track FAQ interactions
  trackFAQView(question) {
    if (!this.enabled || !this.initialized) return;

    this.track('FAQ Viewed', {
      'Question': question
    });
  }

  // Track countdown interaction
  trackCountdownView(daysRemaining) {
    if (!this.enabled || !this.initialized) return;

    this.track('Countdown Viewed', {
      'Days Remaining': daysRemaining
    });
  }

  // Track errors
  trackError(errorMessage, errorStack, componentName) {
    if (!this.enabled || !this.initialized) return;

    mixpanel.track('Error Occurred', {
      'Error Message': errorMessage,
      'Error Stack': errorStack,
      'Component': componentName,
      'URL': window.location.href,
      'User Agent': navigator.userAgent
    });
  }

  // Time tracking
  timeEvent(eventName) {
    if (!this.enabled || !this.initialized) return;

    mixpanel.time_event(eventName);
  }

  // Setup scroll depth tracking
  setupScrollDepthTracking() {
    if (!this.enabled || !this.initialized) return;

    const depths = [25, 50, 75, 100];
    const tracked = new Set();

    const checkScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;

      depths.forEach(depth => {
        if (scrolled >= depth && !tracked.has(depth)) {
          tracked.add(depth);
          this.track('Scroll Depth', {
            'Depth Percentage': depth,
            'Page': window.location.pathname
          });
        }
      });
    };

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollDepth, 100);
    });
  }

  // Helper functions
  getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width < 1024) return 'Tablet';
    return 'Desktop';
  }

  getBrowserName() {
    const agent = navigator.userAgent;
    if (agent.indexOf('Firefox') > -1) return 'Firefox';
    if (agent.indexOf('Opera') > -1 || agent.indexOf('OPR') > -1) return 'Opera';
    if (agent.indexOf('Trident') > -1) return 'Internet Explorer';
    if (agent.indexOf('Edge') > -1) return 'Edge';
    if (agent.indexOf('Chrome') > -1) return 'Chrome';
    if (agent.indexOf('Safari') > -1) return 'Safari';
    return 'Unknown';
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export instance and methods
export default analytics;

// Export convenient methods
export const initAnalytics = () => analytics.init();
export const trackEvent = (name, props) => analytics.track(name, props);
export const trackPageView = (page, props) => analytics.pageView(page, props);
export const trackClick = (element, props) => analytics.trackClick(element, props);
export const trackRSVP = (action, data) => analytics.trackRSVP(action, data);
export const trackError = (msg, stack, component) => analytics.trackError(msg, stack, component);
export const identifyUser = (id, traits) => analytics.identify(id, traits);
export const trackExternalLink = (type, dest) => analytics.trackExternalLink(type, dest);
export const trackCountdownView = (days) => analytics.trackCountdownView(days);