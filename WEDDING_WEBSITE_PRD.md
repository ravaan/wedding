# WEDDING INVITATION WEBSITE - PRODUCT REQUIREMENTS DOCUMENT

**Project:** Digital Wedding Invitation Website  
**Location:** Nashik, India  
**Dates:** April 24-25, 2026  
**Style:** North Indian (Rajasthani + Sindhi Marwadi)  
**Expected Guests:** 150-200  
**Version:** 1.0  
**Last Updated:** December 27, 2025

---

## 1. EXECUTIVE SUMMARY

### 1.1 Product Vision
A clean, minimal, mobile-first wedding invitation website with elegant animations that serves as the primary digital invitation for a 2-day North Indian wedding celebration. The website will facilitate guest communication, RSVP collection, travel planning, and cultural education while maintaining a sophisticated aesthetic aligned with Rajasthani-Sindhi Marwadi wedding traditions.

### 1.2 Target Audience
- **Primary:** 150-200 wedding guests (70 family members, 100-130 friends, <5 international)
- **Demographics:** Mixed age groups (18-80 years), primarily smartphone users
- **Tech Proficiency:** Low to medium; must be intuitive for elders
- **Languages:** Hindi & English bilingual support

### 1.3 Core Objectives
1. Replace physical invitation cards with digital-first approach
2. Collect RSVPs with arrival details and meal preferences
3. Provide comprehensive travel and accommodation information
4. Educate guests about ceremony traditions and cultural significance
5. Create memorable digital experience reflecting couple's personality
6. Minimize guest confusion about complex 2-day itinerary

---

## 2. USER PERSONAS

### Persona 1: "Traditional Aunty" (35% of users)
- **Age:** 50-70 years
- **Tech Level:** Low (uses WhatsApp, basic smartphone)
- **Needs:** Simple navigation, large text, Hindi language, clear timings
- **Pain Points:** Complex interfaces, small fonts, English-only content

### Persona 2: "Young Professional Friend" (45% of users)
- **Age:** 25-35 years
- **Tech Level:** High
- **Needs:** Quick RSVP, travel booking links, Instagram-worthy content, event details
- **Pain Points:** Information overload, difficult-to-find critical info

### Persona 3: "International Guest" (<5% of users)
- **Age:** 30-60 years
- **Tech Level:** Medium-High
- **Needs:** Ceremony explanations, travel logistics, cultural context, English content
- **Pain Points:** Cultural unfamiliarity, travel complexity to Nashik

### Persona 4: "Nuclear Family Member" (20% of users)
- **Age:** All ages
- **Tech Level:** Varied
- **Needs:** All details, multiple touchpoints, ability to share with extended family
- **Pain Points:** Missing any critical information

---

## 3. INFORMATION ARCHITECTURE

### 3.1 Site Structure
```
Homepage (Hero with names/date/countdown)
│
├── Our Story (Optional - TBD with couple)
│
├── Events & Itinerary ★
│   ├── Day 1 (April 24): Sangeet & Party
│   └── Day 2 (April 25): Bhaat → Haldi → Baraat → Jaimala → Shaadi → Reception
│
├── Ceremony Guide ★
│   ├── What is Bhaat?
│   ├── What is Haldi?
│   ├── Baraat Tradition
│   ├── Jaimala Ceremony
│   ├── Shaadi (Wedding Ceremony)
│   └── Reception
│
├── Travel & Stay ★
│   ├── Reaching Nashik
│   │   ├── Flight Options (BLR→Nashik, DEL→Nashik)
│   │   ├── Train Routes
│   │   └── Road Directions
│   ├── Venue Location & Map
│   ├── Accommodation (Booking Links)
│   ├── Local Transport
│   ├── Local Attractions (Things to do)
│   └── Weather & Dress Code
│
├── RSVP ★
│
├── Photo Gallery
│
├── Wishes & Messages (Guest Book)
│
├── FAQ
│
└── Contact
```

★ = Critical Priority Pages

---

## 4. DETAILED FEATURE REQUIREMENTS

### 4.1 HOMEPAGE / LANDING SECTION

#### 4.1.1 Hero Section
**Must Have:**
- Bride & Groom names (typography: elegant serif or traditional Devanagari-style)
- Wedding dates: "24-25 April 2026"
- Location: "Nashik, Maharashtra"
- Live countdown timer to wedding day (in Days:Hours:Minutes:Seconds)
- Tagline/Invitation text in Hindi & English (TBD with couple)
- Hero background: Full-bleed image/illustration (pastel Rajasthani-Sindhi motifs)
- Scroll indicator/CTA: "Scroll to Explore" or "View Invitation"

**Animation Requirements:**
- Fade-in on page load (names appear first, then date, then countdown)
- Parallax scroll effect on background
- Smooth counter animation
- Gentle floating/breathing animation on decorative elements

**Technical Specs:**
- Mobile: Full viewport height (100vh)
- Desktop: Full viewport with centered content
- Optimized images (WebP format, <200KB)
- Fallback for browsers without animation support

---

#### 4.1.2 Quick Navigation Cards
**Must Have:**
- 4 Primary Cards: "Events" | "RSVP" | "Travel Info" | "Ceremony Guide"
- Icon + Label for each card
- Tap/click to navigate to respective sections
- Hover effects (desktop) with subtle elevation

**Design:**
- Card layout: Grid (2x2 mobile, 4x1 desktop)
- Pastel background colors per card
- Minimal iconography (line icons, not filled)
- Card dimensions: Square aspect ratio preferred

---

### 4.2 OUR STORY (OPTIONAL - TBD)

**Contingent Feature:** Couple to provide content

**If Implemented:**
- Timeline-style layout (vertical on mobile, horizontal on desktop)
- Photo placeholders for relationship milestones
- Text snippets for each milestone
- "How We Met" section
- Individual introductions (Bride & Groom)

**Photo Requirements (DEPENDENCY):**
- Pre-wedding photos: 5-10 images
- Individual portraits: 2 (bride + groom)
- Format: High-res JPG/PNG, aspect ratio 4:3 or 1:1

---

### 4.3 EVENTS & ITINERARY ★★★

#### 4.3.1 Event Timeline View
**Must Have:**
- Vertical timeline visualization
- Each event as a timeline node
- Day separators (Day 1 vs Day 2)

**Per Event Information:**
- Event Name (English + Hindi)
- Date & Time (with timezone)
- Venue name and address
- Duration estimate
- Brief description (2-3 lines)
- Dress code for that event
- "Add to Calendar" button (Google Calendar, Apple Calendar, Outlook)
- Google Maps link for venue

**Events to Include:**

**Day 1 - April 24, 2026:**
1. **Sangeet** (TBD timing)
   - Description: TBD with couple
   - Dress Code: TBD

2. **Party** (TBD timing)
   - Description: TBD with couple
   - Dress Code: TBD

**Day 2 - April 25, 2026:**
1. **Bhaat** (TBD timing)
   - Description: Traditional North Indian pre-wedding ritual
   - Dress Code: TBD

2. **Haldi** (TBD timing)
   - Description: Auspicious turmeric ceremony
   - Dress Code: TBD (Yellow recommended)

3. **Baraat** (TBD timing)
   - Description: Groom's wedding procession
   - **Special Feature:** Interactive Baraat Route Map (see 4.3.2)
   - Dress Code: TBD

4. **Jaimala** (TBD timing)
   - Description: Exchange of floral garlands
   - Dress Code: TBD

5. **Shaadi (Wedding Ceremony)** (TBD timing)
   - Description: Sacred wedding rituals
   - Dress Code: TBD (Traditional attire)

6. **Reception** (TBD timing)
   - Description: Evening celebration
   - Dress Code: TBD

**Animation Requirements:**
- Timeline nodes animate in on scroll (staggered)
- Expand/collapse details on tap
- Smooth accordion transitions

---

#### 4.3.2 Interactive Baraat Route Map ★
**Must Have:**
- Embedded Google Maps with custom route overlay
- Starting point marker
- Venue endpoint marker
- Route path highlighted
- Estimated duration of Baraat

**Enhancement (Nice to Have):**
- Google Earth 3D visualization of route
- If Google Earth integration complex, fallback to Google Maps Satellite View with route

**Technical Implementation:**
- Google Maps JavaScript API
- Custom markers with wedding-themed icons
- Route direction visualization
- Mobile-optimized (pinch-zoom enabled)

**DEPENDENCY:**
- Baraat starting location coordinates (TBD)
- Venue coordinates
- Actual route path (TBD with family)

---

#### 4.3.3 Downloadable Itinerary
**Must Have:**
- "Download Full Schedule" button
- PDF generation with all event details
- Beautiful printable format (A4 size)
- Include QR code linking back to website

**PDF Content:**
- All events with timings
- Venue addresses
- Contact numbers for coordinators
- Dress codes
- Map snapshots

**Technical Implementation:**
- Client-side PDF generation (jsPDF library) OR
- Pre-generated PDF hosted on server (updated manually)
- Format: PDF, <2MB file size

**DEPENDENCY:**
- Finalized timings for all events
- Venue addresses confirmed
- Contact POC details

---

### 4.4 CEREMONY GUIDE ★★

**Purpose:** Educate guests (especially international/unfamiliar) about North Indian wedding traditions

#### 4.4.1 Per Ceremony Page/Section
**Must Have:**
- Ceremony name (English + Hindi/Marwadi/Sindhi translation)
- 2-3 paragraph explanation
- Significance and cultural context
- What guests can expect
- Participation guidelines (if any)
- Photo/illustration representing ceremony (DEPENDENCY: Content)

**Ceremonies to Cover:**
1. Bhaat - Traditional Marwadi/Sindhi pre-wedding ritual
2. Haldi - Turmeric ceremony
3. Baraat - Groom's procession tradition
4. Jaimala - Garland exchange significance
5. Shaadi - Wedding ceremony rituals (Pheras, etc.)
6. Reception - Modern celebration aspect

**Design:**
- Card-based layout
- Expandable sections (accordion) on mobile
- Side-by-side layout on desktop
- Illustrated icons per ceremony (DEPENDENCY: Design asset)

**Content DEPENDENCY:**
- Couple to provide/approve ceremony descriptions
- Cultural expert review for accuracy
- Translation support (Hindi ↔ English)

---

#### 4.4.2 Glossary (Optional Enhancement)
**Nice to Have:**
- Tooltip/pop-up definitions for cultural terms
- Example: Hover/tap on "Pheras" → "Seven sacred circles around holy fire"
- Marwadi & Sindhi terminology with English explanations

---

### 4.5 TRAVEL & STAY ★★★

#### 4.5.1 Reaching Nashik
**Must Have:**

**By Air:**
- Direct flight options:
  - Bangalore (BLR) → Nashik (ISK)
    - Booking link (e.g., Google Flights deep link)
    - Typical duration
    - Airlines operating route
  - Delhi (DEL) → Nashik (ISK)
    - Booking link
    - Duration
    - Airlines

- Alternative: Fly to Mumbai → Drive to Nashik
  - Distance and estimated travel time
  - Taxi/car rental links

**By Train:**
- Major train routes to Nashik
- Station names (Nashik Road, Nashik City)
- Booking link: IRCTC

**By Road:**
- Distance from major cities (Mumbai, Pune, Surat)
- Google Maps directions link
- Highway route numbers

**Design:**
- Tabbed interface (Air | Train | Road)
- Icon-based navigation
- Prominent CTAs for booking links

---

#### 4.5.2 Venue Location ★
**Must Have:**
- Venue name and full address
- Embedded Google Map (interactive)
- "Get Directions" button (opens in Google Maps/Apple Maps)
- Landmark references
- Contact number for venue

**DEPENDENCY:**
- Finalized venue details
- Venue coordinates

---

#### 4.5.3 Accommodation
**Must Have:**
- Curated list of 3-5 hotels near venue
- Per Hotel Information:
  - Hotel name
  - Distance from venue
  - Approximate price range
  - Star rating
  - Direct booking link (hotel website or booking.com)
  - Contact number
  - Brief description (1-2 lines)

**Design:**
- Card layout with hotel images (DEPENDENCY: Hotel photos/logos)
- Filter/sort by distance or price
- "View on Map" option for each hotel

**DEPENDENCY:**
- Hotel partnerships/recommendations finalized
- Booking links obtained
- Hotel willing to provide group discount codes (if any)

---

#### 4.5.4 Local Transport
**Must Have:**
- Taxi/cab options:
  - Ola/Uber availability note
  - Local taxi service numbers
- Auto-rickshaw guidance (typical fares)
- Car rental options (if relevant)

**Nice to Have:**
- Pre-arranged shuttle service info (if couple organizing)
- Parking information at venue

---

#### 4.5.5 Local Attractions
**Purpose:** Help guests explore Nashik (especially if arriving early/staying longer)

**Must Have:**
- List of 5-7 attractions
- Per Attraction:
  - Name
  - Brief description (2-3 lines)
  - Distance from venue
  - Google Maps link
  - Photo (DEPENDENCY: Stock image or sourced photo)

**Suggested Attractions:**
- Sula Vineyards (wine tasting)
- Pandavleni Caves (ancient Buddhist caves)
- Saptashrungi Devi Temple
- Panchavati (religious site)
- Godavari Ghat
- Nashik local markets

---

#### 4.5.6 Weather & Dress Code ★
**Must Have:**

**Weather in April (Nashik):**
- Average temperature range
- Rainfall probability (April is typically dry)
- Packing suggestions (light cotton, sun protection)
- Note: "Weather closer to date will be updated"

**Dress Code:**
- General guidance for North Indian weddings
- Event-specific recommendations:
  - Sangeet: Semi-formal, colors welcome
  - Haldi: Yellow/light colors (will get turmeric stains)
  - Wedding ceremony: Traditional attire (Sarees, Lehengas, Sherwanis, Kurtas)
  - Reception: Formal/cocktail attire

**Optional:** Outfit inspiration gallery (Pinterest board link or image collage)

**DEPENDENCY:**
- Weather API integration (optional - can be static info)
- Couple's dress code preferences

---

### 4.6 RSVP SYSTEM ★★★ (CRITICAL)

#### 4.6.1 RSVP Form
**Must Have Fields:**

1. **Guest Name** (Text input, required)
   - Placeholder: "Full Name"

2. **Contact Number** (Phone input, required)
   - Validation: Indian mobile format (+91)
   - Placeholder: "+91 XXXXX XXXXX"

3. **Email** (Email input, optional but recommended)
   - Validation: Email format
   - Placeholder: "your@email.com"

4. **Number of Guests** (Dropdown, required)
   - Options: 1, 2, 3, 4, 5+ (with text input for 5+)
   - Default: 1
   - Note: "Including yourself"

5. **Meal Preference** (Radio buttons or Dropdown, required)
   - Options:
     - Pure Vegetarian (Jain)
     - Vegetarian
     - Non-Vegetarian
   - Note: "We'll accommodate dietary restrictions"

6. **Attending Events** (Checkboxes, required at least one)
   - Day 1: Sangeet & Party
   - Day 2: All Ceremonies (Bhaat → Reception)
   - Day 2: Wedding Ceremony & Reception only
   - Note: "Select all that apply"

7. **Arrival Details** (Multi-part, required)
   
   a. **Coming From** (Text input)
      - Placeholder: "City/Location"
      - Example: "Bangalore", "Delhi", "Mumbai"
   
   b. **Mode of Travel** (Dropdown)
      - Options: Flight, Train, Car/Road, Other
   
   c. **Approximate Arrival Date & Time** (Date-time picker)
      - Date range: Allow from 2 weeks before to 1 day before wedding
      - Time: Hours and minutes
      - Note: "Helps us arrange transport if needed"

8. **Accommodation Needed** (Radio, required)
   - Options: Yes / No / Already Arranged
   - If "Yes" → Show follow-up question:
     - **Number of Rooms:** (Number input)
     - **Check-in Date:** (Date picker)
     - **Check-out Date:** (Date picker)
     - Note: "We'll send you hotel recommendations"

9. **Special Requests / Dietary Restrictions** (Textarea, optional)
   - Placeholder: "Any specific requirements, allergies, or needs we should know about?"
   - Max characters: 500

10. **WhatsApp Updates** (Checkbox, optional)
    - Label: "Send me updates via WhatsApp"
    - Default: Checked
    - Sub-text: "Get reminders and last-minute updates"

**Form Behavior:**
- Real-time validation
- Error messages below each field
- Success message on submission
- Confetti animation on successful RSVP 🎉
- Submit button: "Confirm My Attendance" or "Send RSVP"
- Loading state on submit button

---

#### 4.6.2 RSVP Deadline System
**Must Have:**
- Configurable RSVP deadline date (Admin setting - TBD)
- Display deadline prominently on RSVP page
  - Example: "Please RSVP by March 24, 2026"
- After deadline:
  - Show message: "RSVP deadline has passed. Please contact us directly."
  - Disable form submission
  - Provide contact number/email for late RSVPs

**Technical Implementation:**
- Deadline stored in config file (easily editable)
- Client-side date check
- Server-side validation (if backend exists)

---

#### 4.6.3 RSVP Confirmation
**Must Have:**

**On-Screen Confirmation:**
- Thank you message with names
- Summary of their RSVP details
- Next steps / what to expect
- "Add to Calendar" button for wedding date

**Email Confirmation (Optional but Recommended):**
- Automated email sent to guest's email
- Subject: "RSVP Confirmed - [Bride & Groom Names] Wedding"
- Body includes:
  - Thank you message
  - RSVP summary
  - Wedding dates and venue
  - Link back to website
  - Contact information for queries

**SMS Confirmation (Optional):**
- SMS to guest's mobile number
- Message: "Thank you for your RSVP! We can't wait to celebrate with you on April 24-25, 2026 in Nashik. - [Names]"

**DEPENDENCY:**
- Email service: SendGrid / Mailgun / AWS SES
- SMS service: Twilio / MSG91 / AWS SNS
- API keys and setup

---

#### 4.6.4 RSVP Data Management ★
**Must Have:**
- All RSVP submissions saved to **Google Sheets**
- Google Sheets structure:

| Timestamp | Name | Phone | Email | No. of Guests | Meal Pref | Events Attending | Coming From | Mode of Travel | Arrival DateTime | Accommodation | Rooms | Check-in | Check-out | Special Requests | WhatsApp Updates |
|-----------|------|-------|-------|---------------|-----------|------------------|--------------|----------------|------------------|---------------|-------|----------|-----------|------------------|------------------|

**Technical Implementation:**
- Google Sheets API integration OR
- Google Apps Script web app endpoint OR
- Third-party form service (Tally, Typeform) with Google Sheets integration

**Access Control:**
- Couple (and designated family member) have view/edit access to sheet
- Sheet not publicly accessible

**DEPENDENCY:**
- Google account for sheet ownership
- Google Sheets API credentials (if direct integration)

---

#### 4.6.5 RSVP Analytics Dashboard (Nice to Have)
**Optional Feature:**
- Simple dashboard showing:
  - Total RSVPs received
  - Total guests count
  - Meal preference breakdown (pie chart)
  - Event attendance breakdown
  - Geographic distribution (coming from which cities)
  - Accommodation requests count
- Can be separate admin page or embedded Google Data Studio dashboard

---

### 4.7 PHOTO GALLERY

#### 4.7.1 Gallery Types
**Must Have:**

1. **Pre-Wedding Photoshoot** (If available)
   - Grid gallery layout
   - Lightbox/modal view on click
   - Swipe/arrow navigation in lightbox
   - 10-20 curated images

2. **Engagement/Couple Photos** (If available)
   - Same layout as above

3. **Individual Portraits** (Bride & Groom)
   - Featured prominently
   - 2-4 images each

**Design:**
- Masonry grid layout (Pinterest-style) OR
- Uniform grid (Instagram-style)
- Lazy loading for performance
- Image optimization (WebP, progressive JPG)

**Animation:**
- Fade-in on scroll
- Smooth lightbox transitions
- Zoom animation on hover (desktop)

**DEPENDENCY - CRITICAL:**
- Professional photos from couple
- Minimum 15-20 high-res images required
- Photo editing/retouching (if not already done)
- Image optimization service

**BLOCKER:** If photos not available at launch, show placeholder section:
- "Gallery Coming Soon"
- Estimated date for update
- OR remove section entirely until photos available

---

#### 4.7.2 Social Media Integration (Optional)
**Nice to Have:**
- Instagram feed embed (if couple has wedding-specific hashtag)
- Live wedding hashtag wall (aggregates guest posts)
- Example hashtag: #[Names]Wedding2026

**Technical:**
- Instagram Graph API or third-party widget (e.g., EmbedSocial, Taggbox)

---

### 4.8 WISHES & MESSAGES (GUEST BOOK)

**Purpose:** Allow guests to leave congratulatory messages

#### 4.8.1 Message Submission Form
**Must Have:**
- Guest Name (Text input, required)
- Message (Textarea, required)
  - Max characters: 500
  - Placeholder: "Share your wishes for the couple..."
- Submit button: "Send Your Wishes"

**Optional:**
- Guest location/city (Text input)
- Character counter

---

#### 4.8.2 Message Display
**Must Have:**
- Display all approved messages
- Card-based layout
- Show: Name, Message, Date submitted
- Newest messages first

**Moderation (Recommended):**
- Messages require approval before displaying
- Admin moderation panel (can be Google Sheets with approval column)
- OR auto-approve all (risk of spam/inappropriate content)

**Animation:**
- Messages fade in when scrolling into view
- Smooth height transitions when new messages load

---

#### 4.8.3 Data Storage
**Technical Implementation:**
- Save to Google Sheets (similar to RSVP)
- OR Firebase Realtime Database (for live updates)
- OR Simple JSON file (static site)

**Sheet Structure:**
| Timestamp | Name | Location | Message | Approved (Y/N) | Displayed (Y/N) |
|-----------|------|----------|---------|----------------|-----------------|

---

### 4.9 FAQ SECTION

**Must Have:**
- Accordion-style layout (expand/collapse)
- 8-12 common questions answered

**Suggested FAQs:**
1. What is the dress code for different events?
2. Is there parking available at the venue?
3. Can I bring a +1?
4. Are children welcome?
5. What is the best way to reach Nashik?
6. Will food cater to dietary restrictions?
7. Is there accommodation available nearby?
8. What time should I arrive for [specific ceremony]?
9. Will there be transportation from hotel to venue?
10. Can I take photos during the ceremonies?
11. What are the COVID-19 safety protocols? (If relevant)
12. Who can I contact for more information?

**Design:**
- Question in bold, answer hidden initially
- Click/tap to expand
- Only one answer open at a time OR multiple can be open
- Search/filter functionality (optional)

**DEPENDENCY:**
- Couple to provide/approve FAQ answers
- Update based on common guest queries received

---

### 4.10 CONTACT SECTION

**Must Have:**

1. **Wedding Coordinators / Points of Contact**
   - Name(s) of designated POCs
   - Relationship to couple (e.g., "Bride's Brother", "Groom's Friend")
   - Contact numbers (clickable for mobile)
   - Email addresses (clickable mailto links)
   - WhatsApp links (optional but recommended)

2. **For Specific Queries:**
   - Travel & Accommodation: [POC Name + Contact]
   - RSVP Issues: [POC Name + Contact]
   - General Queries: [POC Name + Contact]

3. **Venue Contact** (Optional)
   - Venue manager contact (if couple arranges)

**Design:**
- Card layout for each POC
- Icons for phone/email/WhatsApp
- Click-to-call, click-to-email, click-to-WhatsApp functionality

**DEPENDENCY:**
- POC details from couple
- Permission from POCs to share contact info publicly

---

### 4.11 NAVIGATION & FOOTER

#### 4.11.1 Header Navigation
**Must Have:**
- Logo/Monogram (once designed) OR Couple names
- Navigation menu
  - Desktop: Horizontal menu bar (sticky on scroll)
  - Mobile: Hamburger menu (side drawer)
- Menu Items: Home | Events | Ceremony Guide | Travel | RSVP | Gallery | Contact
- Active state indicator
- Language toggle (English ⟷ Hindi) - affects specific text elements

**Animation:**
- Smooth slide-in for mobile menu
- Fade navigation bar background on scroll

---

#### 4.11.2 Footer
**Must Have:**
- Couple names or wedding logo
- Tagline: "We can't wait to celebrate with you!"
- Social media links (if couple has wedding-specific accounts)
- Quick links: Privacy Policy (if collecting data), Contact
- Copyright: "© 2026 [Names] Wedding. All Rights Reserved."
- "Made with ❤️ in [Location]" (optional personal touch)

**Design:**
- Minimal, single row layout
- Pastel background matching theme
- Small text, elegant typography

---

### 4.12 ADDITIONAL FEATURES

#### 4.12.1 Live Countdown Timer ★
**Location:** Homepage hero section + fixed floating element (optional)

**Must Have:**
- Countdown to wedding ceremony (Day 2, April 25, 2026)
- Format: "X Days, Y Hours, Z Minutes, W Seconds"
- Updates every second
- Visual: Elegant display with minimal styling

**Post-Wedding:**
- Changes to: "Thank you for celebrating with us!"
- OR "The celebration was [X] days ago"

---

#### 4.12.2 WhatsApp Group Links (Optional)
**Purpose:** Share WhatsApp group links for guest coordination

**Implementation:**
- Section on RSVP confirmation page OR Travel page
- "Join our WhatsApp Group for Updates"
- Direct WhatsApp group invite link
- Note: "Stay updated on last-minute changes and connect with other guests"

**Options:**
- Single group for all guests OR
- Separate groups (Family, Friends, etc.)

**DEPENDENCY:**
- WhatsApp groups created by couple
- Group links obtained

---

#### 4.12.3 Background Music (Optional)
**Must Have:**
- Classic instrumental wedding music (Bollywood romantic instrumentals)
- Auto-play on page load (with mute option)
- Mute/Unmute toggle button (fixed position)
- Low volume by default
- Music loops continuously

**Recommendations:**
- Instrumental versions of popular Bollywood wedding songs
- OR classical Indian instrumental (sitar, tabla)
- Duration: 2-3 minute loop

**Technical:**
- HTML5 audio element
- Compress audio file (<1MB)
- Format: MP3 (universal support)

**DEPENDENCY:**
- Audio file sourcing/licensing
- Couple's music preference

**Important:** Many users dislike auto-play music. Consider:
- Default muted, user must unmute
- OR skip this feature entirely

---

#### 4.12.4 Progressive Web App (PWA) Features (Nice to Have)
**Optional Enhancement:**
- Add to Home Screen capability
- Offline access to key information
- Push notifications for reminders (if permission granted)

**Technical:**
- Service worker
- Web app manifest
- Offline cache of essential pages

---

### 4.13 ACCESSIBILITY REQUIREMENTS

**Must Have:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Alt text for all images
- Sufficient color contrast (especially with pastel colors)
- Readable font sizes (minimum 16px body text)
- Touch targets minimum 44x44px (mobile)
- Reduced motion option (respects `prefers-reduced-motion`)

---

### 4.14 SEO & METADATA

**Must Have:**
- Page title: "[Bride Name] & [Groom Name] - Wedding Invitation | April 24-25, 2026"
- Meta description: "Join us in celebrating our wedding in Nashik on April 24-25, 2026. RSVP, view event details, and plan your visit."
- Open Graph tags (for WhatsApp/Facebook shares)
  - og:title
  - og:description
  - og:image (hero image or couple photo)
  - og:url
- Twitter Card tags
- Favicon (once logo designed)

**robots.txt:**
- Allow indexing OR
- Disallow if couple wants privacy (prevents search engine indexing)

**DEPENDENCY:**
- Decide on indexing preference
- Hero image for social shares

---

## 5. DESIGN SYSTEM & VISUAL SPECIFICATIONS

### 5.1 Design Philosophy
**Core Principles:**
- **Clean & Minimal:** No clutter, generous white space, breathable layouts
- **Elegant Animations:** Subtle, purposeful, enhancing UX (not distracting)
- **Pastel Palette:** Soft, sophisticated colors reflecting Rajasthani-Sindhi aesthetic
- **Mobile-First:** Majority of users on smartphones, optimize for small screens

---

### 5.2 Color Palette (DEPENDENCY: Designer)
**Status:** TBD - Awaiting designer

**Suggested Direction:**
- **Primary:** Soft pastel pink or peach (#FFD6E8, #FFE5D9)
- **Secondary:** Pastel gold or beige (#F4E4C1, #E8DCC4)
- **Accent:** Muted coral or terracotta (#E8A598, #D4A5A5)
- **Neutrals:** Off-white (#FAFAFA), light gray (#E0E0E0), charcoal (#333333)
- **Success (RSVP):** Soft mint green (#B8E6D5)
- **Error:** Soft red (#F4A5A5)

**Requirements:**
- Minimum contrast ratio 4.5:1 for text
- Avoid pure white backgrounds (use warm off-white)
- Consistency across all components

**BLOCKER:** Final color palette must be approved before full design implementation.

---

### 5.3 Typography (DEPENDENCY: Designer)
**Status:** TBD - Awaiting designer

**Suggested Direction:**

**Headings:**
- Font: Elegant serif (Cormorant Garamond, Playfair Display, Lora)
- OR Devanagari-style decorative font for Indian aesthetic
- Weights: 300 (Light), 400 (Regular), 600 (SemiBold)

**Body Text:**
- Font: Clean sans-serif (Inter, Montserrat, Nunito Sans)
- Weight: 400 (Regular), 500 (Medium for emphasis)
- Size: 16-18px base (mobile), 18-20px (desktop)

**Specialty Elements:**
- Couple names: Decorative serif or script font (not overused elsewhere)
- Numbers (countdown, dates): Lining figures, tabular for alignment

**Language Support:**
- Hindi: Devanagari Unicode fonts (Noto Sans Devanagari, Poppins supports Devanagari)

**Technical:**
- Google Fonts for easy implementation
- Font loading optimization (font-display: swap)
- Fallback fonts specified

**BLOCKER:** Typography choices needed before content creation.

---

### 5.4 Logo/Monogram (DEPENDENCY: Designer)
**Status:** NOT CREATED - Critical blocker

**Requirements:**
- Wedding monogram or logo featuring couple's initials or names
- Style: Minimal, elegant, fits with Rajasthani-Sindhi aesthetic
- Formats needed:
  - SVG (primary - scalable)
  - PNG with transparency (fallback)
  - Favicon sizes (16x16, 32x32, 180x180, 512x512)
- Color versions: Primary color, white (for dark backgrounds), black (for light)

**Usage:**
- Website header/navigation
- Favicon
- Email templates
- Social media share image
- Downloadable invitation PDF

**Timeline:** Needed ASAP for brand consistency throughout site

**BLOCKER:** Cannot finalize header design without logo.

---

### 5.5 Iconography (DEPENDENCY: Designer/Icon Set)
**Status:** TBD

**Requirements:**
- Consistent icon style: Line icons, minimal, 2px stroke
- Icons needed for:
  - Navigation (Home, Calendar, Map, Camera, Envelope, Phone)
  - Events (Each ceremony - custom icons ideal)
  - Travel (Plane, Train, Car, Hotel, Map Pin)
  - Social (WhatsApp, Instagram, Facebook)
  - UI (Arrow, Close, Menu, Download, Add to Calendar)

**Sources:**
- Custom designed OR
- Icon libraries: Feather Icons, Heroicons, Lucide (free, open source)

**Format:** SVG (inline or sprite sheet)

---

### 5.6 Photography & Imagery (DEPENDENCY: Couple/Photographer)
**Status:** TBD - Critical content dependency

**Required Photos:**

**High Priority:**
1. **Hero/Header Image:**
   - Couple photo or Rajasthani-Sindhi themed illustration
   - Dimensions: 2400x1600px minimum (landscape)
   - High quality, professional

2. **Gallery Photos:** (15-30 images)
   - Pre-wedding shoot
   - Engagement
   - Individual portraits
   - Candid couple photos

**Medium Priority:**
3. **Ceremony Illustrations/Stock Photos:**
   - Representing each ceremony (Bhaat, Haldi, Baraat, etc.)
   - Can be stock images initially, custom illustrations ideal

4. **Local Attractions Photos:**
   - 5-7 images of Nashik sights
   - Can be stock/royalty-free

**Format & Optimization:**
- Original: High-res JPEG/PNG
- Web: Convert to WebP (fallback JPG)
- Responsive sizes: Generate 320w, 640w, 1024w, 1920w versions
- Compression: TinyPNG or similar (maintain quality)

**Timeline:**
- Hero image: Needed before launch
- Gallery: Can be added post-launch if not ready
- Other photos: 2 weeks before launch

**BLOCKER:** Hero image is critical for homepage. Site can launch without gallery but looks incomplete.

---

### 5.7 Decorative Elements & Motifs
**Status:** TBD - Designer to create

**Requirements:**
- Rajasthani patterns: Paisley, mandalas, geometric patterns
- Sindhi elements: Traditional Sindhi embroidery-inspired motifs
- Subtle, background decorative elements (not overwhelming)

**Usage:**
- Page dividers
- Section backgrounds (low opacity)
- Corner embellishments
- Border patterns

**Format:** SVG for scalability and performance

**BLOCKER:** Not critical for launch but enhances aesthetic significantly.

---

### 5.8 Animation & Transition Specifications

**Core Principles:**
- **Subtle & Purposeful:** Enhance UX, not distract
- **Performance:** 60fps, no jank
- **Duration:** 200-400ms for micro-interactions, 600-800ms for page transitions
- **Easing:** Ease-out for entering, ease-in for exiting, ease-in-out for movement

**Specific Animations:**

1. **Page Load (Homepage Hero):**
   - Sequence: Background fade in (300ms) → Names slide up + fade in (600ms, delay 200ms) → Date fade in (400ms, delay 400ms) → Countdown fade in (400ms, delay 600ms)
   - Total: ~1.6s animation sequence

2. **Scroll Animations:**
   - Elements fade in + slight upward movement when 20% in viewport
   - Stagger child elements by 100ms
   - Library: AOS (Animate On Scroll) or Intersection Observer API

3. **Navigation Menu (Mobile):**
   - Hamburger → X icon morph (300ms)
   - Slide drawer from right (400ms, ease-out)
   - Menu items stagger fade-in (100ms per item)

4. **Timeline Nodes:**
   - Expand/collapse accordion (300ms, ease-in-out)
   - Icon rotation (300ms)

5. **RSVP Form Submission:**
   - Button loading state (spinner)
   - Success: Confetti animation (JS Confetti library, 3s duration)
   - Form slide out, confirmation slide in (500ms)

6. **Photo Gallery Lightbox:**
   - Fade background overlay (200ms)
   - Image zoom from thumbnail position (400ms, ease-out)
   - Swipe gesture support (mobile)

7. **Countdown Timer:**
   - Number flip animation on each second change (100ms)
   - OR smooth fade transition

8. **Hover Effects (Desktop):**
   - Buttons: Slight elevation + color shift (200ms)
   - Cards: Shadow depth increase (300ms)
   - Links: Underline slide-in (200ms)

9. **Parallax (Optional):**
   - Hero background slow scroll (0.5x scroll speed)
   - Decorative elements subtle float (3-5s loop, ease-in-out)

**Performance Considerations:**
- Use CSS transforms (translateX, scale) over position changes
- Use opacity over visibility
- GPU acceleration: `will-change` property sparingly
- Reduce motion for users with `prefers-reduced-motion: reduce`

**Libraries:**
- GSAP (GreenSock) for complex animations (optional, adds ~50KB)
- AOS (Animate On Scroll): ~15KB
- Framer Motion (if using React): Built-in
- CSS transitions + keyframes for simple animations (preferred)

---

## 6. TECHNICAL SPECIFICATIONS

### 6.1 Technology Stack

**Recommendation: Static Site with Minimal Backend**

#### 6.1.1 Frontend
**Suggested Stack:**

**Option 1: React (Vite)**
- **Framework:** React 18+
- **Build Tool:** Vite (fast development, optimized builds)
- **Routing:** React Router
- **Styling:** Tailwind CSS + CSS Modules (for component-specific styles)
- **Animations:** Framer Motion OR GSAP
- **Form Handling:** React Hook Form
- **Icons:** Lucide React or Heroicons

**Pros:**
- Component reusability
- Rich ecosystem
- Developer familiarity
- Easy state management for RSVP form

**Cons:**
- Slightly heavier than pure HTML/CSS/JS
- SEO requires SSR/SSG (use Vite SSG plugin)

---

**Option 2: Next.js (React Framework)**
- **Framework:** Next.js 14+
- **Rendering:** Static Site Generation (SSG)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

**Pros:**
- Built-in SSG for performance + SEO
- Image optimization
- API routes for backend (RSVP submission)

**Cons:**
- More complex than Vite
- Overkill for simple static site

---

**Option 3: Pure HTML/CSS/JS (Vanilla)**
- **Structure:** HTML5
- **Styling:** CSS3 (CSS Grid, Flexbox)
- **Interactivity:** Vanilla JavaScript or Alpine.js (lightweight)
- **Build:** Parcel or Webpack (optional)

**Pros:**
- Lightest weight
- No framework overhead
- Fastest load times

**Cons:**
- More code for interactivity
- Manual DOM manipulation

---

**RECOMMENDATION:** **React (Vite)** for balance of developer experience, component reusability, and performance. If developer prefers simpler approach, **Pure HTML/CSS/JS** works well for this project.

---

#### 6.1.2 Backend (Minimal)

**RSVP & Form Submissions:**

**Option 1: Google Sheets API + Google Apps Script**
- RSVP form submits to Google Apps Script Web App
- Script appends data to Google Sheets
- **Pros:** Free, no server required, couple can view/edit easily
- **Cons:** 20 requests/second limit (sufficient for this scale)

**Option 2: Serverless Functions (Netlify/Vercel)**
- Form submits to serverless function
- Function writes to Google Sheets API OR Airtable
- **Pros:** More control, faster than Apps Script
- **Cons:** Requires API key management

**Option 3: Third-Party Form Service**
- Tally.so, Typeform, Google Forms (embedded)
- Auto-integrates with Google Sheets
- **Pros:** No coding, built-in validation
- **Cons:** Less design control, external dependency

**RECOMMENDATION:** **Google Sheets API via Google Apps Script** (Option 1) for simplicity and couple's direct access.

---

**Email/SMS Notifications:**

**Email:**
- **Service:** SendGrid (free tier: 100 emails/day) OR Mailgun OR AWS SES
- Trigger: On RSVP submission, call serverless function → send email

**SMS:**
- **Service:** Twilio (pay-as-you-go, ~$0.0079/SMS to India) OR MSG91 (India-specific)
- Implementation: Optional, adds complexity and cost

**RECOMMENDATION:** Email notifications only. SMS optional if budget allows.

---

#### 6.1.3 Hosting & Deployment

**Static Hosting (Recommended):**

**Option 1: Netlify**
- Free tier (100GB bandwidth/month - more than sufficient)
- Continuous deployment from Git
- Custom domain support
- Serverless functions
- Form handling built-in
- **Pros:** Easy setup, generous free tier
- **Cons:** None for this use case

**Option 2: Vercel**
- Similar to Netlify
- Optimized for Next.js
- Free tier
- **Pros:** Fast global CDN, excellent DX
- **Cons:** None for this use case

**Option 3: GitHub Pages**
- Free hosting for static sites
- Custom domain support
- **Pros:** Free, simple
- **Cons:** No serverless functions, CI/CD requires setup

**Option 4: Firebase Hosting**
- Free tier (10GB storage, 360MB/day bandwidth)
- Can use Firestore for data (instead of Google Sheets)
- **Pros:** Real-time database option
- **Cons:** More complex setup

**RECOMMENDATION:** **Netlify** for ease of use and built-in features.

---

#### 6.1.4 Domain

**Domain Name:**
- Couple to purchase custom domain
- Suggested format: `[names]wedding.com` or `[names]2026.com`
- Registrar: Namecheap, GoDaddy, Google Domains
- Cost: ~₹500-1500/year

**DNS Configuration:**
- Point domain to hosting provider (Netlify/Vercel)
- SSL certificate: Auto-provisioned by host

**DEPENDENCY:** Couple to decide on and purchase domain.

---

### 6.2 Performance Requirements

**Target Metrics:**
- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint (FCP):** <1.5s
- **Time to Interactive (TTI):** <3s
- **Total Page Size:** <2MB (including images)
- **Mobile Page Speed:** 80+ (Google PageSpeed Insights)

**Optimization Strategies:**
1. **Image Optimization:**
   - WebP format with JPG fallback
   - Responsive images (`srcset`, `sizes`)
   - Lazy loading (`loading="lazy"`)
   - Image CDN (Cloudinary free tier OR Netlify image CDN)

2. **Code Splitting:**
   - Route-based code splitting (if using React Router)
   - Lazy load non-critical components

3. **Minification:**
   - CSS, JS, HTML minification (build tool handles)

4. **Caching:**
   - Static assets: Long cache (1 year)
   - HTML: Short cache (5 minutes)

5. **Compression:**
   - Gzip/Brotli enabled on hosting

6. **Font Loading:**
   - `font-display: swap` for web fonts
   - Preload critical fonts

7. **Third-Party Scripts:**
   - Defer non-critical scripts
   - Async load analytics (if any)

---

### 6.3 Browser & Device Support

**Browsers:**
- Chrome/Edge (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Mobile browsers: Chrome Android, Safari iOS

**Graceful Degradation:**
- Older browsers: Basic functionality, reduced animations
- IE11: Not supported (inform users to upgrade)

**Devices:**
- Mobile: 320px width minimum
- Tablet: 768px+
- Desktop: 1024px+

**Testing:**
- BrowserStack OR manual testing on physical devices
- Priority: iPhone (Safari), Android (Chrome)

---

### 6.4 Data Privacy & Security

**RSVP Data:**
- No storage of sensitive data (passwords, SSN, etc.)
- Phone and email: Encrypted in transit (HTTPS)
- Google Sheets: Access limited to couple only

**Privacy Policy (Optional but Recommended):**
- Simple page explaining data collection
- "We collect name, phone, email for RSVP purposes only. Data not shared with third parties."

**GDPR Compliance:**
- Not required (guests are India-based, not EU)
- But good practice to include privacy notice

**HTTPS:**
- Mandatory (free with Netlify/Vercel)

---

### 6.5 Analytics (Optional)

**Recommendation:** Google Analytics 4 (GA4)

**Tracking:**
- Page views
- RSVP submissions (event tracking)
- Button clicks (CTA tracking)
- Scroll depth

**Privacy:**
- Anonymize IPs
- Cookie consent banner (optional, low priority for wedding site)

**Alternative:** Plausible Analytics (privacy-friendly, paid)

**DECISION:** Optional - couple to decide if they want analytics.

---

### 6.6 Backup & Version Control

**Version Control:**
- Git + GitHub/GitLab
- Branching strategy: `main` (production), `dev` (development)
- Commit messages: Conventional Commits

**Backups:**
- Google Sheets: Auto-backup by Google
- Code: GitHub repository (remote backup)
- Images: Cloud storage (Google Drive OR Cloudinary)

**Disaster Recovery:**
- Hosting platform handles redundancy
- Can re-deploy from Git in minutes

---

## 7. CONTENT DEPENDENCIES & REQUIREMENTS

### 7.1 Text Content (Couple to Provide)

**CRITICAL - Needed Before Launch:**

1. **Names:**
   - Bride full name
   - Groom full name
   - Name format preference (First Last OR Full Name)

2. **Tagline/Invitation Text:**
   - Homepage hero text (1-2 lines)
   - Example: "Together with our families, we invite you to celebrate our union"
   - In Hindi and English

3. **Event Timings & Venues:**
   - Exact date and time for EACH ceremony (6 events on Day 2 + 2 on Day 1 = 8 events)
   - Venue names and addresses
   - Duration estimates

4. **Ceremony Descriptions:**
   - 2-3 paragraph explanation for each ceremony (Bhaat, Haldi, Baraat, etc.)
   - Cultural significance
   - What guests should expect

5. **FAQ Answers:**
   - Responses to all FAQ questions

6. **Dress Code Details:**
   - Specific for each event

7. **Contact POC Details:**
   - Names, relationships, phone, email

8. **Accommodation Recommendations:**
   - List of 3-5 hotels

9. **Message for "Our Story" section (if including):**
   - How you met, relationship timeline, proposal story

**SECONDARY - Can Be Added Later:**
10. Special requests/notes for RSVP form
11. Local attractions descriptions
12. Welcome message for RSVP confirmation

---

### 7.2 Visual Content (Couple/Designer/Photographer to Provide)

**CRITICAL:**
1. Hero image (couple photo or illustration)
2. Logo/Monogram design
3. Color palette finalization
4. Typography selection

**HIGH PRIORITY:**
5. Pre-wedding photoshoot (15-30 images)
6. Individual portraits (bride & groom)

**MEDIUM PRIORITY:**
7. Ceremony illustrations/icons
8. Decorative motifs (Rajasthani-Sindhi patterns)
9. Hotel photos (can use stock initially)
10. Local attractions photos (can use stock)

**NICE TO HAVE:**
11. Engagement photos
12. Childhood/family photos (for "Our Story")
13. Save-the-date video (if embedding)

---

### 7.3 Technical Content (Couple to Decide/Provide)

1. **Domain name preference** (for registration)
2. **Google account** for Sheets access
3. **RSVP deadline date**
4. **Email/SMS notification** preference (yes/no)
5. **Analytics** preference (yes/no)
6. **Password protection** preference (yes/no)
7. **Background music** preference (song/instrumental choice)
8. **WhatsApp group links** (if using)
9. **Baraat route details** (start/end points, path)
10. **Wedding hashtag** (if using for social media)

---

## 8. USER STORIES & ACCEPTANCE CRITERIA

### Story 1: Guest Views Invitation
**As a** wedding guest,  
**I want to** view a beautiful, informative wedding invitation online,  
**So that** I know when and where the wedding is happening.

**Acceptance Criteria:**
- Homepage loads in <3 seconds
- Names, date, location clearly visible
- Countdown timer is accurate
- Design is visually appealing on mobile
- Hindi/English toggle works

---

### Story 2: Guest RSVPs
**As a** guest,  
**I want to** easily RSVP with my attendance details,  
**So that** the couple knows I'm coming and can plan accordingly.

**Acceptance Criteria:**
- RSVP form is easy to find (max 2 clicks from homepage)
- All fields have clear labels and validation
- Error messages are helpful
- Success confirmation is immediate and clear
- Confetti animation plays on success
- Email confirmation sent (if feature enabled)
- Data appears in Google Sheet within 30 seconds

---

### Story 3: Guest Plans Travel
**As a** guest from another city,  
**I want to** find flight and hotel information easily,  
**So that** I can book my travel and accommodation.

**Acceptance Criteria:**
- Travel section easily accessible from main navigation
- Flight booking links work correctly (open in new tab)
- Hotel information includes distance, price, contact
- Google Maps directions work for venue
- Weather information is visible

---

### Story 4: Guest Learns About Ceremonies
**As an** international guest unfamiliar with Indian weddings,  
**I want to** understand what each ceremony means,  
**So that** I can appreciate the cultural significance.

**Acceptance Criteria:**
- Ceremony Guide section exists
- Each ceremony has clear explanation (2-3 paragraphs)
- Explanations are in simple English
- Optional Hindi translation available
- Illustrations/photos accompany each ceremony

---

### Story 5: Guest Views Photo Gallery
**As a** guest,  
**I want to** see photos of the couple,  
**So that** I can get excited about the wedding.

**Acceptance Criteria:**
- Gallery loads progressively (lazy loading)
- Images are high quality but load quickly
- Lightbox works smoothly (click to enlarge)
- Can navigate between photos easily
- Mobile swipe gestures work

---

### Story 6: Guest Leaves Message
**As a** guest,  
**I want to** leave a congratulatory message for the couple,  
**So that** I can share my well-wishes.

**Acceptance Criteria:**
- Message form is easy to find
- Character limit is clear (500 chars)
- Submission is instant
- Message appears on site after approval (if moderation)
- OR appears immediately (if auto-approve)

---

### Story 7: Guest Finds Contact Info
**As a** guest with questions,  
**I want to** easily find who to contact,  
**So that** I can get my questions answered.

**Acceptance Criteria:**
- Contact section in footer OR dedicated page
- Phone numbers are clickable (click-to-call)
- Email addresses are clickable (mailto)
- WhatsApp links work (if provided)
- FAQ section answers common questions

---

### Story 8: Couple Views RSVP Data
**As the** couple,  
**We want to** see all RSVP responses in one place,  
**So that** we can plan seating, food, and logistics.

**Acceptance Criteria:**
- Google Sheet contains all RSVP data
- Data is structured and readable
- Timestamped entries
- Can filter/sort easily
- Real-time updates (within 30 seconds of submission)

---

### Story 9: Couple Updates Website
**As the** couple,  
**We want to** update event timings or add last-minute information,  
**So that** guests have the most current details.

**Acceptance Criteria:**
- Code is well-commented and organized
- Content changes don't require deep technical knowledge (change text in config file)
- OR simple admin panel exists
- Changes reflect on live site within 5 minutes (after Git push + build)

---

### Story 10: Elder Family Member Navigates Site
**As an** elder family member (60+ years),  
**I want to** read the website without strain,  
**So that** I know what's happening and can RSVP.

**Acceptance Criteria:**
- Text is large (18px+ on mobile)
- High contrast between text and background
- Buttons are large (48px+ height)
- Navigation is simple (no hidden menus if possible)
- Hindi language option available
- No complex interactions required

---

## 9. DEPENDENCIES & BLOCKERS

### 9.1 CRITICAL BLOCKERS (Cannot Launch Without)

1. **COUPLE CONTENT:**
   - Event timings and venues (all 8 events) ⚠️
   - Names and basic invitation text ⚠️
   - Contact POC details ⚠️

2. **DESIGN ASSETS:**
   - Hero image OR placeholder ⚠️
   - Color palette finalized ⚠️
   - Typography selected ⚠️

3. **TECHNICAL:**
   - Domain purchased and configured ⚠️
   - Hosting account created (Netlify/Vercel) ⚠️
   - Google Sheets setup for RSVP ⚠️

### 9.2 HIGH PRIORITY (Launch Soon After, Within 1-2 Weeks)

4. **LOGO/BRANDING:**
   - Wedding logo/monogram designed
   - Affects: Header, favicon, social shares, PDFs

5. **PHOTOS:**
   - Pre-wedding photoshoot (15-30 images)
   - Can launch with placeholder "Coming Soon" in gallery

6. **CEREMONY DESCRIPTIONS:**
   - Cultural explanations written and approved
   - Can launch with basic descriptions, refine later

7. **TRAVEL INFO:**
   - Hotel recommendations finalized
   - Flight booking links (generic can work initially)

### 9.3 MEDIUM PRIORITY (Can Add Post-Launch)

8. **ENHANCED FEATURES:**
   - WhatsApp group links
   - Background music file
   - Social media hashtag wall
   - Video embeds (if any)

9. **DECORATIVE ELEMENTS:**
   - Custom Rajasthani-Sindhi motifs
   - Ceremony-specific icons
   - Can launch with simpler design, enhance later

10. **ADDITIONAL CONTENT:**
    - "Our Story" section (optional)
    - Local attractions detailed descriptions
    - Gift registry (if applicable)

### 9.4 LOW PRIORITY (Nice to Have)

11. **ANALYTICS:**
    - Google Analytics setup
    - Dashboard for tracking

12. **EMAIL/SMS:**
    - Automated confirmations
    - Reminder notifications

13. **PWA:**
    - Service worker for offline access
    - Push notifications

---

### 9.5 External Dependencies

| Dependency | Owner | Status | Required By | Impact if Delayed |
|------------|-------|--------|-------------|-------------------|
| Event Timings | Couple/Family | TBD | Launch | CRITICAL - Cannot launch |
| Hero Image | Photographer/Couple | TBD | Launch | HIGH - Can use placeholder |
| Logo Design | Designer | Not Started | Launch + 1 week | MEDIUM - Affects branding |
| Pre-wedding Photos | Photographer | TBD | Launch + 2 weeks | LOW - Can add later |
| Color Palette | Designer | Not Started | Launch | HIGH - Affects all styling |
| Typography | Designer | Not Started | Launch | HIGH - Affects readability |
| Domain Purchase | Couple | TBD | Launch -1 week | CRITICAL - Needed for DNS setup |
| Hotel Partnerships | Couple | TBD | Launch | MEDIUM - Can use generic links |
| Ceremony Descriptions | Couple/Cultural Expert | TBD | Launch + 1 week | MEDIUM - Can use brief descriptions |
| Google Account | Couple | TBD | Launch | CRITICAL - Needed for RSVP |
| Baraat Route | Family | TBD | Launch + 1 week | LOW - Can add later |

---

## 10. OUT OF SCOPE (V1)

The following features are **NOT** included in the initial launch:

1. **Guest Login/Authentication System**
   - Reason: Adds complexity, not necessary for this use case

2. **Online Gift Registry**
   - Reason: Can provide external links if needed (Amazon wishlist, etc.)

3. **Live Streaming of Ceremonies**
   - Reason: Requires separate technical setup (Zoom, YouTube Live). Can provide links separately.

4. **Real-Time Guest Chat/Messaging**
   - Reason: WhatsApp groups serve this purpose better

5. **Interactive Seating Chart**
   - Reason: Complex feature, family handles manually

6. **Calorie/Nutrition Info for Menu**
   - Reason: Not critical, unlikely guest need

7. **Multi-Currency for International Gifts**
   - Reason: Out of scope, handle offline

8. **Wedding Registry Scanning (QR codes for gifts)**
   - Reason: Not applicable

9. **Guest Transportation Booking Integration**
   - Reason: Provide links, but no direct booking system

10. **Post-Wedding Photo Upload by Guests**
    - Reason: Use Google Photos shared album or similar (external)

**Future Considerations (Post-Wedding):**
- Thank you page/message
- Post-wedding photo gallery
- Highlight reel video embed

---

## 11. GLOSSARY OF TERMS

**For Engineers & Designers:**

- **Bhaat:** Traditional Marwadi pre-wedding ritual where the bride is bathed in turmeric water and oil.
- **Haldi:** Turmeric ceremony where paste is applied to bride and groom for auspicious glow.
- **Baraat:** Groom's wedding procession, typically with dancing, music, and celebration.
- **Jaimala:** Exchange of floral garlands between bride and groom, symbolizing acceptance.
- **Shaadi:** Main wedding ceremony with rituals like Pheras (seven circles around sacred fire).
- **Pheras:** Seven sacred vows taken while circling the holy fire during wedding ceremony.
- **Reception:** Post-wedding celebration, typically evening party with dinner and dancing.
- **Sangeet:** Musical night with singing, dancing, performances by both families.
- **Marwadi:** Culture/language from Marwar region of Rajasthan.
- **Sindhi:** Culture/ethnicity from Sindh region (now in Pakistan), many settled in India.

---

## 12. APPENDICES

### Appendix A: Recommended Tools & Libraries

**Development:**
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- React Hook Form: https://react-hook-form.com

**Design:**
- Figma (design mockups)
- Coolors (color palette generator)
- Google Fonts
- Unsplash (stock photos)

**Utilities:**
- TinyPNG (image compression)
- SVGOMG (SVG optimization)
- Lighthouse (performance testing)
- WAVE (accessibility testing)

**Hosting:**
- Netlify: https://www.netlify.com
- Vercel: https://vercel.com

**Forms & Data:**
- Google Sheets API
- Google Apps Script
- SendGrid (email)
- Twilio (SMS)

---

### Appendix B: Sample Google Sheets Structure

**Sheet Name:** Wedding_RSVP

| Column | Data Type | Example |
|--------|-----------|---------|
| A - Timestamp | Datetime | 2025-12-27 14:30:15 |
| B - Name | Text | Rahul Sharma |
| C - Phone | Text | +91 98765 43210 |
| D - Email | Email | rahul@email.com |
| E - No. of Guests | Number | 2 |
| F - Meal Preference | Text | Vegetarian |
| G - Events Attending | Text | Day 1: Sangeet, Day 2: All |
| H - Coming From | Text | Bangalore |
| I - Mode of Travel | Text | Flight |
| J - Arrival DateTime | Datetime | 2026-04-23 16:00 |
| K - Accommodation | Text | Yes |
| L - Rooms Needed | Number | 1 |
| M - Check-in Date | Date | 2026-04-23 |
| N - Check-out Date | Date | 2026-04-26 |
| O - Special Requests | Text | Wheelchair accessible room |
| P - WhatsApp Updates | Text | Yes |

---

### Appendix C: Sample RSVP Confirmation Email Template

**Subject:** RSVP Confirmed - [Bride] & [Groom] Wedding 🎊

**Body:**

```
Dear [Guest Name],

Thank you for your RSVP! We're thrilled you'll be joining us for our wedding celebration.

Your RSVP Details:
- Number of Guests: [X]
- Meal Preference: [Preference]
- Events Attending: [List]
- Arriving From: [City]
- Arrival: [Date & Time]

Wedding Dates: April 24-25, 2026
Location: [Venue Name], Nashik, Maharashtra

Important Links:
- View Full Itinerary: [Website URL]/events
- Travel & Accommodation: [Website URL]/travel
- Contact Us: [Website URL]/contact

Need to update your RSVP? Please contact [POC Name] at [Phone/Email].

We can't wait to celebrate with you!

With love,
[Bride] & [Groom]

---
P.S. Visit our website for updates: [Website URL]
```

---

### Appendix D: Mobile Wireframe Notes

**Homepage (Mobile View):**
```
[Hero Image - Full viewport]
  Bride & Groom Names (Large)
  April 24-25, 2026
  [Countdown Timer]
  "Scroll to Explore" ↓

[Navigation Cards - 2x2 Grid]
  [Events] [RSVP]
  [Travel] [Ceremonies]

[Quick Info Section]
  Location: Nashik
  RSVP By: March 24

[CTA Button: "RSVP Now"]

[Footer]
```

**RSVP Page (Mobile View):**
```
[Page Header]
  "We'd Love to See You There!"

[Form Fields - Stacked]
  [Name Input]
  [Phone Input]
  [Email Input]
  [No. of Guests Dropdown]
  [Meal Preference Radio]
  [Events Checkboxes]
  [Coming From Input]
  [Travel Mode Dropdown]
  [Arrival DateTime Picker]
  [Accommodation Radio]
    [Conditional: Rooms, Dates]
  [Special Requests Textarea]
  [WhatsApp Checkbox]

[Submit Button - Full Width]
  "Confirm My Attendance"

[RSVP Deadline Notice]
  "Please RSVP by March 24, 2026"
```

---

**END OF PRD**
