/**
 * Wedding Tracker - Google Apps Script
 *
 * This script receives RSVP submissions from the wedding website
 * and saves them to Google Sheets. It also sends email notifications.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Update the CONFIG section below with your details
 * 5. Save the project (Ctrl+S or Cmd+S)
 * 6. Click Deploy > New deployment
 * 7. Select "Web app" as the type
 * 8. Set "Execute as" to "Me"
 * 9. Set "Who has access" to "Anyone"
 * 10. Click Deploy and authorize when prompted
 * 11. Copy the Web app URL and add it to your GitHub secrets as VITE_GOOGLE_SCRIPT_URL
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const CONFIG = {
  // Email to receive notifications when new RSVPs come in
  NOTIFICATION_EMAIL: 'prerna@example.com',

  // Couple names for email templates
  BRIDE_NAME: 'Prerna',
  GROOM_NAME: 'Idiot',

  // Wedding details
  WEDDING_DATE: 'April 23-24, 2025',
  WEDDING_VENUE: 'Taj Ambad, Nashik',

  // Sheet names (must match exactly)
  RSVP_SHEET_NAME: 'RSVP Submissions',
  GUEST_SHEET_NAME: 'Guest List',

  // Enable/disable features
  SEND_NOTIFICATION_EMAIL: true,
  SEND_CONFIRMATION_EMAIL: true,
};

// ============================================
// WEB APP ENTRY POINT
// ============================================

/**
 * Handle POST requests from the wedding website
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Save to spreadsheet
    const result = saveRSVP(data);

    // Send notification email to couple
    if (CONFIG.SEND_NOTIFICATION_EMAIL) {
      sendNotificationEmail(data);
    }

    // Send confirmation email to guest
    if (CONFIG.SEND_CONFIRMATION_EMAIL && data.email) {
      sendConfirmationEmail(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: result.row }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error processing RSVP:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Wedding RSVP API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// SPREADSHEET FUNCTIONS
// ============================================

/**
 * Save RSVP data to the spreadsheet
 */
function saveRSVP(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.RSVP_SHEET_NAME);

  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = createRSVPSheet(ss);
  }

  // Prepare row data
  const rowData = [
    data.timestamp || new Date().toISOString(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.attendance || '',
    data.guestCount || 1,
    data.events || '',
    data.dietary || '',
    data.message || '',
    data.source || 'website',
    '', // Processed column (empty initially)
    '', // Notes column
  ];

  // Append to sheet
  sheet.appendRow(rowData);

  const lastRow = sheet.getLastRow();

  return { row: lastRow };
}

/**
 * Create the RSVP Submissions sheet with headers
 */
function createRSVPSheet(ss) {
  const sheet = ss.insertSheet(CONFIG.RSVP_SHEET_NAME);

  // Set headers
  const headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Attendance',
    'Guest Count',
    'Events',
    'Dietary',
    'Message',
    'Source',
    'Processed',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');

  // Set column widths
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 130); // Phone
  sheet.setColumnWidth(5, 100); // Attendance
  sheet.setColumnWidth(6, 100); // Guest Count
  sheet.setColumnWidth(7, 250); // Events
  sheet.setColumnWidth(8, 150); // Dietary
  sheet.setColumnWidth(9, 300); // Message
  sheet.setColumnWidth(10, 80); // Source
  sheet.setColumnWidth(11, 80); // Processed
  sheet.setColumnWidth(12, 200); // Notes

  // Freeze header row
  sheet.setFrozenRows(1);

  return sheet;
}

// ============================================
// EMAIL FUNCTIONS
// ============================================

/**
 * Send notification email to the couple when a new RSVP comes in
 */
function sendNotificationEmail(data) {
  const subject = `New RSVP: ${data.name} - ${data.attendance}`;

  const body = `
New RSVP Received!

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Attendance: ${data.attendance}
Number of Guests: ${data.guestCount}
Events: ${data.events || 'All events'}
Dietary Restrictions: ${data.dietary || 'None specified'}

Message:
${data.message || 'No message'}

---
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();

  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}

/**
 * Send confirmation email to the guest
 */
function sendConfirmationEmail(data) {
  if (!data.email) return;

  const isAttending = data.attendance === 'Confirmed';

  const subject = isAttending
    ? `We're excited to see you! - ${CONFIG.BRIDE_NAME} & ${CONFIG.GROOM_NAME}'s Wedding`
    : `Thank you for letting us know - ${CONFIG.BRIDE_NAME} & ${CONFIG.GROOM_NAME}'s Wedding`;

  const body = isAttending ? `
Dear ${data.name},

Thank you for confirming your attendance at our wedding celebration!

Here are the details we have recorded:
- Number of guests: ${data.guestCount}
- Events attending: ${data.events || 'All events'}
- Dietary requirements: ${data.dietary || 'None specified'}

Wedding Details:
Date: ${CONFIG.WEDDING_DATE}
Venue: ${CONFIG.WEDDING_VENUE}

We will be in touch with more details as the date approaches.

With love,
${CONFIG.BRIDE_NAME} & ${CONFIG.GROOM_NAME}
  `.trim() : `
Dear ${data.name},

Thank you for letting us know that you won't be able to attend our wedding.

We're sorry you can't make it, but we appreciate you taking the time to respond.

You'll be in our thoughts on our special day!

With love,
${CONFIG.BRIDE_NAME} & ${CONFIG.GROOM_NAME}
  `.trim();

  try {
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: body,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize the spreadsheet with all required sheets
 * Run this function once to set up your tracker
 */
function initializeTracker() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create RSVP Submissions sheet
  if (!ss.getSheetByName(CONFIG.RSVP_SHEET_NAME)) {
    createRSVPSheet(ss);
  }

  // Create Guest List sheet
  if (!ss.getSheetByName(CONFIG.GUEST_SHEET_NAME)) {
    createGuestListSheet(ss);
  }

  // Create Rooms sheet
  if (!ss.getSheetByName('Rooms')) {
    createRoomsSheet(ss);
  }

  // Create Dashboard sheet
  if (!ss.getSheetByName('Dashboard')) {
    createDashboardSheet(ss);
  }

  SpreadsheetApp.getUi().alert('Tracker initialized successfully!');
}

/**
 * Create the Guest List sheet
 */
function createGuestListSheet(ss) {
  const sheet = ss.insertSheet(CONFIG.GUEST_SHEET_NAME);

  const headers = [
    'Name',
    'Phone',
    'Email',
    'Guest Type',      // Single / Couple / Family
    'Group Name',      // Links families together
    'Adult/Child',
    'Child Age',
    'Stay Status',     // Check-in 23rd / Check-in 24th / Meals Only
    'RSVP Status',     // Waiting / Confirmed / Declined
    'Food Preference', // Regular Veg / Jain
    'Allergies',
    'Events',
    'Room Number',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');

  sheet.setFrozenRows(1);

  // Add data validation for dropdowns
  const guestTypeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Single', 'Couple', 'Family'], true)
    .build();
  sheet.getRange('D2:D1000').setDataValidation(guestTypeRule);

  const adultChildRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Adult', 'Child'], true)
    .build();
  sheet.getRange('F2:F1000').setDataValidation(adultChildRule);

  const stayStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Check-in 23rd', 'Check-in 24th', 'Meals Only'], true)
    .build();
  sheet.getRange('H2:H1000').setDataValidation(stayStatusRule);

  const rsvpStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Waiting', 'Confirmed', 'Declined'], true)
    .build();
  sheet.getRange('I2:I1000').setDataValidation(rsvpStatusRule);

  const foodPrefRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Regular Veg', 'Jain'], true)
    .build();
  sheet.getRange('J2:J1000').setDataValidation(foodPrefRule);

  return sheet;
}

/**
 * Create the Rooms sheet
 */
function createRoomsSheet(ss) {
  const sheet = ss.insertSheet('Rooms');

  const headers = [
    'Room Number',
    'Room Type',       // Suite / Deluxe / Standard
    'Max Adults',
    'Assigned Guests', // Names comma-separated
    'Adult Count',
    'Child Count',
    'Check-in Date',   // 23rd / 24th
    'Status',          // Not Arrived / Checked In / Checked Out
    'Special Requests',
    'Notes'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');

  sheet.setFrozenRows(1);

  // Add data validation
  const roomTypeRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Suite', 'Deluxe', 'Standard'], true)
    .build();
  sheet.getRange('B2:B1000').setDataValidation(roomTypeRule);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Not Arrived', 'Checked In', 'Checked Out'], true)
    .build();
  sheet.getRange('H2:H1000').setDataValidation(statusRule);

  return sheet;
}

/**
 * Create the Dashboard sheet with summary formulas
 */
function createDashboardSheet(ss) {
  const sheet = ss.insertSheet('Dashboard');

  // Title
  sheet.getRange('A1').setValue('Wedding Tracker Dashboard');
  sheet.getRange('A1').setFontSize(18).setFontWeight('bold');

  // Stats section
  const stats = [
    ['', '', ''],
    ['RSVP Summary', '', ''],
    ['Total Submissions', `=COUNTA('${CONFIG.RSVP_SHEET_NAME}'!A:A)-1`, ''],
    ['Confirmed', `=COUNTIF('${CONFIG.RSVP_SHEET_NAME}'!E:E,"Confirmed")`, ''],
    ['Declined', `=COUNTIF('${CONFIG.RSVP_SHEET_NAME}'!E:E,"Declined")`, ''],
    ['Total Guests (Confirmed)', `=SUMIF('${CONFIG.RSVP_SHEET_NAME}'!E:E,"Confirmed",'${CONFIG.RSVP_SHEET_NAME}'!F:F)`, ''],
    ['', '', ''],
    ['Guest List Summary', '', ''],
    ['Total Guests', `=COUNTA('${CONFIG.GUEST_SHEET_NAME}'!A:A)-1`, ''],
    ['RSVP Waiting', `=COUNTIF('${CONFIG.GUEST_SHEET_NAME}'!I:I,"Waiting")`, ''],
    ['RSVP Confirmed', `=COUNTIF('${CONFIG.GUEST_SHEET_NAME}'!I:I,"Confirmed")`, ''],
    ['RSVP Declined', `=COUNTIF('${CONFIG.GUEST_SHEET_NAME}'!I:I,"Declined")`, ''],
    ['', '', ''],
    ['Food Preferences', '', ''],
    ['Regular Veg', `=COUNTIF('${CONFIG.GUEST_SHEET_NAME}'!J:J,"Regular Veg")`, ''],
    ['Jain', `=COUNTIF('${CONFIG.GUEST_SHEET_NAME}'!J:J,"Jain")`, ''],
    ['', '', ''],
    ['Room Summary', '', ''],
    ['Total Rooms', `=COUNTA('Rooms'!A:A)-1`, ''],
    ['Rooms Assigned', `=COUNTIF('Rooms'!D:D,"<>")`, ''],
    ['Rooms Available', `=COUNTA('Rooms'!A:A)-1-COUNTIF('Rooms'!D:D,"<>")`, ''],
  ];

  sheet.getRange(1, 1, stats.length, 3).setValues(stats);

  // Format headers
  sheet.getRange('A3').setFontWeight('bold').setBackground('#e0f2fe');
  sheet.getRange('A8').setFontWeight('bold').setBackground('#e0f2fe');
  sheet.getRange('A14').setFontWeight('bold').setBackground('#e0f2fe');
  sheet.getRange('A18').setFontWeight('bold').setBackground('#e0f2fe');

  // Set column widths
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 100);

  return sheet;
}

/**
 * Test function - run this to verify the script is working
 */
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test Guest',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    attendance: 'Confirmed',
    guestCount: 2,
    events: 'Sangeet, Haldi, Wedding Ceremony, Reception',
    dietary: 'Jain',
    message: 'This is a test submission',
    source: 'test',
  };

  const result = saveRSVP(testData);
  console.log('Test submission saved to row:', result.row);
}
