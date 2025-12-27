# Technical Dependencies & Requirements

## Overview
This document outlines all technical dependencies, API keys, third-party services, and configurations required for the wedding website. Items marked with 🔄 are using placeholders/mocks until the actual service is set up.

## 1. Domain & Hosting

### Domain Name
- **Status**: 🔄 PLACEHOLDER - Using GitHub Pages initially
- **Required Action**: Purchase custom domain (e.g., `[names]wedding.com`)
- **Suggested Registrars**:
  - Namecheap
  - GoDaddy
  - Google Domains
- **Cost**: ~₹500-1500/year
- **Timeline**: Needed before final launch

### Hosting
- **Current**: GitHub Pages (free)
- **Production**: Netlify (recommended) or Vercel
- **Requirements**:
  - SSL certificate (auto-provided by host)
  - Custom domain support
  - Continuous deployment from Git
- **Configuration Needed**:
  - DNS records (A and CNAME)
  - SSL provisioning
  - Build commands

## 2. API Keys & Services

### Google Maps API
- **Status**: 🔄 PLACEHOLDER - Using embedded maps without API key
- **Required For**:
  - Venue location map
  - Baraat route visualization
  - Hotel locations
  - Local attractions
- **Setup Steps**:
  1. Create Google Cloud Project
  2. Enable Maps JavaScript API
  3. Generate API key
  4. Restrict key to domain
- **Cost**: Free tier usually sufficient (28,000 loads/month)
- **Environment Variable**: `VITE_GOOGLE_MAPS_API_KEY`

### Google Sheets API
- **Status**: 🔄 PLACEHOLDER - Using localStorage for now
- **Required For**: RSVP form submissions
- **Setup Options**:

  **Option 1: Google Apps Script (Recommended)**
  - No API key needed
  - Create web app endpoint
  - Script URL needed
  - **Environment Variable**: `VITE_GOOGLE_SCRIPT_URL`

  **Option 2: Direct API**
  - Service account needed
  - Credentials JSON file
  - Sheet ID required
  - **Environment Variables**:
    - `VITE_GOOGLE_SHEETS_API_KEY`
    - `VITE_GOOGLE_SHEET_ID`
    - `VITE_GOOGLE_SERVICE_ACCOUNT`

### Email Service (Optional)
- **Status**: 🔄 PLACEHOLDER - No email notifications yet
- **Options**:
  1. **SendGrid** (Free: 100 emails/day)
  2. **Mailgun** (Free: 5,000 emails/month for 3 months)
  3. **AWS SES** (Pay as you go)
  4. **EmailJS** (Free: 200 emails/month, no backend needed)
- **Required For**: RSVP confirmation emails
- **Environment Variables**:
  - `VITE_EMAIL_API_KEY`
  - `VITE_EMAIL_FROM_ADDRESS`
  - `VITE_EMAIL_SERVICE_ID` (for EmailJS)
  - `VITE_EMAIL_TEMPLATE_ID` (for EmailJS)

### SMS Service (Optional)
- **Status**: 🔄 NOT IMPLEMENTED - Low priority
- **Options**:
  1. **Twilio** (~$0.0079/SMS to India)
  2. **MSG91** (India-specific, better rates)
- **Required For**: SMS confirmations
- **Environment Variables**:
  - `VITE_SMS_API_KEY`
  - `VITE_SMS_ACCOUNT_SID`
  - `VITE_SMS_FROM_NUMBER`

### Analytics - Mixpanel
- **Status**: ✅ REQUIRED - Will implement comprehensive tracking
- **Service**: **Mixpanel** (Preferred for detailed event tracking)
- **Free Tier**: 20M events/month, 12 month data history
- **Required For**:
  - Page views tracking
  - User journey analysis
  - RSVP form analytics
  - Button click tracking
  - Scroll depth tracking
  - Feature usage metrics
  - Error tracking
- **Events to Track**:
  - Page View (all pages)
  - RSVP Form Started
  - RSVP Form Field Completed
  - RSVP Form Submitted
  - RSVP Form Error
  - Gallery Photo Viewed
  - Event Details Expanded
  - Add to Calendar Clicked
  - Hotel Link Clicked
  - Travel Option Selected
  - Contact Method Used
  - Language Changed
  - FAQ Item Viewed
  - Guest Message Submitted
  - Scroll Depth (25%, 50%, 75%, 100%)
- **Environment Variables**:
  - `VITE_MIXPANEL_PROJECT_TOKEN`
  - `VITE_MIXPANEL_API_KEY` (for server-side)
  - `VITE_ENABLE_ANALYTICS=true`

## 3. Content Dependencies

### Photography
- **Status**: 🔄 PLACEHOLDER - Using gradients and stock images
- **Required**:
  - Hero image (couple photo or illustration)
  - 15-30 gallery photos
  - Individual portraits
  - Ceremony photos/illustrations
- **Current Solution**: Placeholder images with "Coming Soon" labels
- **Storage**: Local `/assets` folder initially, CDN later

### Logo/Monogram
- **Status**: 🔄 PLACEHOLDER - Using text logo
- **Required Formats**:
  - SVG (primary)
  - PNG (various sizes)
  - Favicon (16x16, 32x32, 192x192, 512x512)
- **Current Solution**: Simple text-based logo with couple initials

### Wedding Content
- **Status**: 🔄 PLACEHOLDER - Using sample content
- **Required**:
  - Couple names
  - Event timings (8 events)
  - Venue addresses
  - Ceremony descriptions
  - Dress codes
  - Contact information
- **Current Solution**: JSON file with `isPlaceholder: true` flags

## 4. Environment Variables

### Current .env Structure
```env
# API Keys
VITE_GOOGLE_MAPS_API_KEY=placeholder_key_maps
VITE_GOOGLE_SCRIPT_URL=placeholder_script_url
VITE_EMAIL_SERVICE_ID=placeholder_email_service
VITE_EMAIL_TEMPLATE_ID=placeholder_email_template
VITE_EMAIL_USER_ID=placeholder_email_user
VITE_GA_MEASUREMENT_ID=placeholder_ga_id

# Configuration
VITE_RSVP_DEADLINE=2026-03-24
VITE_WEDDING_DATE=2026-04-25
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_EMAIL_NOTIFICATIONS=false
VITE_ENABLE_SMS_NOTIFICATIONS=false

# Content Flags
VITE_SHOW_GALLERY=false
VITE_SHOW_OUR_STORY=false
VITE_ENABLE_GUEST_MESSAGES=true
VITE_ENABLE_BACKGROUND_MUSIC=false
```

## 5. NPM Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.48.0",
    "lucide-react": "^0.294.0",
    "dayjs": "^1.11.10",
    "canvas-confetti": "^1.9.0",
    "react-intersection-observer": "^9.5.3"
  }
}
```

### Dev Dependencies
```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "gh-pages": "^6.1.0",
    "@types/canvas-confetti": "^1.6.3"
  }
}
```

### Optional Dependencies (Phase 2)
```json
{
  "dependencies": {
    "@emailjs/browser": "^3.11.0",  // For email without backend
    "react-photo-gallery": "^8.0.0", // For photo gallery
    "yet-another-react-lightbox": "^3.15.0", // For lightbox
    "react-lazy-load-image-component": "^1.6.0", // For lazy loading
    "js-cookie": "^3.0.5", // For language preference
    "react-helmet-async": "^2.0.0", // For SEO
    "react-hot-toast": "^2.4.1" // For notifications
  }
}
```

## 6. Third-Party Services Configuration

### Google Sheets Setup
1. **Create Spreadsheet**:
   - Name: `Wedding_RSVP_2026`
   - Columns: As specified in PRD Appendix B

2. **Apps Script Setup** (if using):
   ```javascript
   // Deploy as Web App with these permissions:
   // Execute as: Me
   // Who has access: Anyone
   ```

3. **Share Settings**:
   - Couple: Editor access
   - Script: Editor access
   - Others: No access

### Google Calendar
- **Event Templates**: Create .ics file templates for each ceremony
- **Calendar ID**: For embedded calendar (optional)

### WhatsApp
- **Groups to Create**:
  - All Guests
  - Family Members
  - Friends
  - Out-of-town Guests
- **Invite Links**: Generate and store in content.json

## 7. Build & Deployment Configuration

### Vite Configuration
```javascript
// vite.config.js
export default {
  base: '/wedding/', // For GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        }
      }
    }
  }
}
```

### GitHub Actions (CI/CD)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
```

## 8. Security Considerations

### API Key Security
- ✅ Use environment variables
- ✅ Never commit .env files
- ✅ Restrict API keys by domain
- ✅ Use server-side proxy for sensitive operations

### Form Security
- ✅ Client-side validation
- ✅ Rate limiting (if using backend)
- ✅ Honeypot fields for spam prevention
- ✅ HTTPS only

### Data Privacy
- ✅ No password storage
- ✅ Minimal data collection
- ✅ Clear privacy policy
- ✅ Secure data transmission

## 9. Monitoring & Maintenance

### Error Tracking (Optional)
- **Sentry** (Free tier available)
- **LogRocket** (For session replay)
- **Environment Variable**: `VITE_SENTRY_DSN`

### Uptime Monitoring
- **UptimeRobot** (Free: 50 monitors)
- **Better Uptime** (Free tier available)

### Backup Strategy
- **Code**: GitHub repository
- **Data**: Google Sheets auto-backup
- **Assets**: Google Drive backup

## 10. Development Tools

### VS Code Extensions
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier
- ESLint
- Auto Rename Tag

### Chrome Extensions
- React Developer Tools
- Lighthouse
- WAVE Evaluation Tool

## 11. Testing Requirements

### Browser Testing
- **BrowserStack** (Free for open source)
- **LambdaTest** (Free tier available)
- **Manual Testing Devices**:
  - iPhone (Safari)
  - Android (Chrome)
  - iPad
  - Desktop (Chrome, Firefox, Safari)

### Performance Testing
- Google Lighthouse
- GTmetrix
- WebPageTest

## 12. Content Management

### JSON Structure for Dynamic Content
All content stored in `/src/data/content.json`:
```json
{
  "meta": {
    "lastUpdated": "2024-12-28",
    "version": "1.0.0"
  },
  "wedding": {
    "brideNameisPlaceholder": true,
    "brideName": "[Bride Name]",
    "groomName": "[Groom Name]",
    "groomNameIsPlaceholder": true,
    "date": "2026-04-25",
    "location": "Nashik, Maharashtra"
  },
  "events": {
    "day1": [...],
    "day2": [...]
  },
  "venue": {
    "name": "Radisson Nashik",
    "nameIsPlaceholder": false,
    "address": "Mumbai-Agra Road, Nashik",
    "addressIsPlaceholder": true
  }
}
```

## 13. Immediate Action Items

### Before Development
1. ✅ Set up Git repository
2. ✅ Create project structure plan
3. ⬜ Decide on color palette
4. ⬜ Create placeholder content

### Week 1 Priorities
1. ⬜ Set up React + Vite
2. ⬜ Implement core components
3. ⬜ Create RSVP form
4. ⬜ Deploy to GitHub Pages

### Blockers to Resolve
1. **Critical**: None (can start with placeholders)
2. **High Priority**:
   - Couple names for proper branding
   - Basic color preferences
3. **Medium Priority**:
   - Google Sheets access
   - Hero image/gradient choice
   - Event timings

## 14. Fallback Solutions

### If Google Sheets API fails
- Use EmailJS to email CSV data
- Store in localStorage with export function
- Use Netlify Forms as backup

### If Custom Domain unavailable
- Use GitHub Pages URL
- Use Netlify subdomain
- Register alternative domain

### If Photos unavailable at launch
- Use gradient backgrounds
- Use illustration library (unDraw)
- Display "Gallery Coming Soon" section

---

## Status Legend
- ✅ Completed/Ready
- 🔄 Using Placeholder/Mock
- ⬜ Not Started/Pending
- ⚠️ Blocker/Critical

## Next Steps
1. Start development with placeholders
2. Gradually replace placeholders with real content
3. Add services as credentials become available
4. Test thoroughly before each deployment