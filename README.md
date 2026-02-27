# 🎓 RIT Direct Result Viewer

A Chrome extension for instant access to RIT IMS portal results - skip the homepage and jump straight to your marks!

## Features

✨ **Fast Direct Login** - Logs in directly to the RIT IMS portal without the slow homepage
✨ **Auto Results Navigation** - Opens the marks/results page in a new tab automatically
✨ **Secure CSRF Handling** - Properly fetches and uses CSRF tokens for secure authentication
✨ **Credential Storage** - Remembers your registration number for convenience
✨ **Error Handling** - Clear error messages if login fails
✨ **Beautiful UI** - Modern, user-friendly popup interface

## Installation

### Step 1: Download the Extension
- The extension files are already in this folder:
  - `manifest.json`
  - `popup.html`
  - `popup.js`

### Step 2: Load into Chrome
1. Open **Google Chrome**
2. Go to **chrome://extensions/**
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select this folder (`rit-direct-result-viewer`)
6. The extension will appear in your toolbar

### Step 3: Use the Extension
1. Click the extension icon in your Chrome toolbar
2. Enter your **13-digit registration number** (without spaces)
3. Enter your **password**
4. Click **Login & View Results**
5. The extension will:
   - Fetch the login page and extract the CSRF token
   - Authenticate you securely
   - Open the results page in a new tab

## How It Works

### Security
- Uses `credentials: 'include'` to maintain session cookies
- Extracts and includes CSRF `_token` in login request
- Makes requests directly to the server (no third-party services)
- Your credentials are NOT stored; only your registration number is cached locally

### Authentication Flow
1. **Fetch Login Page** - Gets the login form and extracts the CSRF token
2. **Extract Token** - Finds the `_token` field in the HTML
3. **POST Login** - Sends credentials + token to the server
4. **Verify Success** - Checks if authentication succeeded
5. **Open Results** - Navigates to the marks report page

## Troubleshooting

### "Invalid credentials" error
- Double-check your registration number (13 digits)
- Verify your password is correct
- Make sure you're using your IMS login credentials

### "Could not find CSRF token" error
- The IMS login page structure may have changed
- Try accessing the portal directly at: https://ims.ritchennai.edu.in/
- Report the issue if the page looks different

### Extension not appearing
- Make sure Developer mode is enabled (chrome://extensions/)
- Refresh the page if you just added it
- Try clicking the puzzle icon in the top-right to pin the extension

### Console shows errors
- Right-click the extension → **Inspect popup**
- Go to **Console** tab
- Check for any JavaScript errors

## Files Included

```
rit-direct-result-viewer/
├── manifest.json      # Extension configuration (Manifest V3)
├── popup.html         # Login form UI
├── popup.js           # Login logic & CSRF token handling
└── README.md          # This file
```

## File Descriptions

### manifest.json
- Defines extension metadata and permissions
- Specifies popup.html as the default popup
- Grants permissions for tabs, scripting, storage, and the IMS domain

### popup.html
- Beautiful, responsive login form
- Modern gradient design with animations
- Input fields for registration number and password
- Status messages for user feedback

### popup.js
- Handles login flow with proper error handling
- Extracts CSRF token from login page
- Makes authenticated POST request
- Opens results page on successful login
- Stores registration number locally for convenience

## Permissions Used

- **`tabs`** - To create and open the results page in a new tab
- **`scripting`** - Basic extension functionality
- **`storage`** - To remember your registration number locally
- **`https://ims.ritchennai.edu.in/*`** - To access the IMS portal

## Data Privacy

✅ Your credentials are **NEVER stored**
✅ Only your registration number is cached locally for convenience
✅ All login requests go directly to the official IMS server
✅ No data sent to third-party services
✅ Session cookies managed by Chrome

## Updates & Support

To update the extension:
1. Go to chrome://extensions/
2. Click the refresh icon on the extension
3. You'll get the latest version

## Disclaimer

This extension is designed to streamline your access to your marks. Use it responsibly and ensure you only access your own results. Respect RIT's terms of service.

---

**Version:** 1.0  
**Last Updated:** February 2026  
**License:** MIT
