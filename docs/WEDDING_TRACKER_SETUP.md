# Wedding Tracker Setup Guide

This guide will help you set up the Google Sheets-based Wedding Tracker and connect it to your wedding website's RSVP form.

## Overview

The tracker consists of:
1. **Google Sheets** - Your central database for guests, rooms, and RSVPs
2. **Google Apps Script** - Receives RSVP submissions from your website
3. **Wedding Website** - Already updated to submit RSVPs to Google Sheets

## Step 1: Create Google Sheets Tracker

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding Tracker - Prerna & Idiot"

## Step 2: Set Up Google Apps Script

1. In your new Google Sheet, go to **Extensions > Apps Script**
2. Delete any code in the default `Code.gs` file
3. Open `docs/google-apps-script.js` from this repository
4. Copy the entire contents
5. Paste it into the Apps Script editor
6. **Important**: Update the CONFIG section at the top:

```javascript
const CONFIG = {
  NOTIFICATION_EMAIL: 'your-email@example.com',  // Your email
  BRIDE_NAME: 'Prerna',
  GROOM_NAME: 'Idiot',
  WEDDING_DATE: 'April 23-24, 2025',
  WEDDING_VENUE: 'Taj Ambad, Nashik',
  // ... rest of config
};
```

7. Save the project (Ctrl+S or Cmd+S)

## Step 3: Initialize the Tracker Sheets

1. In Apps Script, select `initializeTracker` from the function dropdown
2. Click **Run**
3. Grant permissions when prompted (this is safe - it's your own script)
4. Go back to your Google Sheet - you should see 4 new sheets:
   - **RSVP Submissions** - Raw data from website
   - **Guest List** - Your master guest list
   - **Rooms** - Hotel room assignments
   - **Dashboard** - Summary statistics

## Step 4: Deploy as Web App

1. In Apps Script, click **Deploy > New deployment**
2. Click the gear icon and select **Web app**
3. Configure:
   - **Description**: "Wedding RSVP Handler"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web app URL** (looks like `https://script.google.com/macros/s/xxx/exec`)

## Step 5: Add URL to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings > Secrets and variables > Actions**
3. Click **New repository secret**
4. Name: `VITE_GOOGLE_SCRIPT_URL`
5. Value: Paste the Web app URL from Step 4
6. Click **Add secret**

## Step 6: Test the Connection

1. Run the GitHub Actions workflow to redeploy with the new secret
2. Go to your wedding website's RSVP page
3. Submit a test RSVP
4. Check your Google Sheet - you should see the submission in "RSVP Submissions"

## Step 7: Import Your Guest List

If you have an existing guest list spreadsheet:

1. Open your existing spreadsheet
2. Copy the guest data
3. Go to the "Guest List" sheet in your Wedding Tracker
4. Paste the data (make sure columns align with the headers)

### Guest List Column Reference

| Column | Description | Valid Values |
|--------|-------------|--------------|
| Name | Guest full name | Text |
| Phone | Contact number | Text |
| Email | Email address | Text |
| Guest Type | How they're grouped | Single / Couple / Family |
| Group Name | Links families together | Text (e.g., "Sharma Family") |
| Adult/Child | Age category | Adult / Child |
| Child Age | Age if child | Number |
| Stay Status | Hotel stay info | Check-in 23rd / Check-in 24th / Meals Only |
| RSVP Status | Response status | Waiting / Confirmed / Declined |
| Food Preference | Dietary needs | Regular Veg / Jain |
| Allergies | Food allergies | Text |
| Events | Which events | Text |
| Room Number | Assigned room | Text |
| Notes | Any notes | Text |

## Using the Tracker

### Processing RSVPs

When someone submits an RSVP on your website:
1. It appears in "RSVP Submissions" sheet
2. You (optionally) receive an email notification
3. The guest receives a confirmation email

To process into Guest List:
1. Review the submission in "RSVP Submissions"
2. Find/add the guest in "Guest List"
3. Update their RSVP Status to "Confirmed" or "Declined"
4. Mark the submission as "Processed" in column K

### Room Assignments

1. Go to the "Rooms" sheet
2. Enter room numbers and types
3. In "Assigned Guests" column, enter guest names
4. Update Adult/Child counts
5. The Dashboard will show room statistics

### Viewing Statistics

The "Dashboard" sheet automatically calculates:
- Total RSVP submissions
- Confirmed vs Declined counts
- Total expected guests
- Food preference breakdown
- Room assignment status

## Troubleshooting

### RSVPs not appearing in sheet

1. Check the Web app URL in GitHub secrets is correct
2. Verify the Apps Script is deployed (Deploy > Manage deployments)
3. Check Apps Script logs: View > Logs

### Email notifications not working

1. Verify the NOTIFICATION_EMAIL in CONFIG is correct
2. Check your spam folder
3. Apps Script has daily email limits (100/day for free accounts)

### Permission errors

1. Re-run the Apps Script and grant permissions
2. Make sure "Execute as" is set to "Me" in deployment settings

## Local Development

For testing locally:

1. Create a `.env` file in the project root
2. Add: `VITE_GOOGLE_SCRIPT_URL=your_web_app_url`
3. Run `npm run dev`

## Support

If you have issues:
1. Check the browser console for errors
2. Check Apps Script execution logs
3. Verify all environment variables are set

---

*Last updated: January 2026*
