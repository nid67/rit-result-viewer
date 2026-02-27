# RIT Direct Result Viewer 🎓

> **Fast, Direct Access to RIT Results - Skip the Slow Homepage!**

A Chrome extension and Progressive Web App (PWA) that lets RIT (Rishihood Institute of Technology) students login directly and jump straight to their results page, completely bypassing the slow homepage.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Type: Chrome Extension + PWA](https://img.shields.io/badge/Type-Extension%20%2B%20PWA-green)
![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen)

---

## 🚀 Quick Start

Choose your preferred way to use:

### Option 1: Chrome Extension (Desktop) ✅ **RECOMMENDED**
Best for desktop users. **No CORS issues - works perfectly!**

1. Clone this repository
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the root folder of this repo
6. Click the extension icon → enter credentials → done!

### Option 2: Progressive Web App (PWA) (Mobile + Desktop)
Works on all devices, installable as homescreen app. **Note: May have CORS restrictions depending on your network.**

Simply visit: `https://nid67.github.io/rit-result-viewer/`

Then:
- **Chrome/Edge:** Menu → "Install app"
- **Safari (iOS):** Share → "Add to Home Screen"
- **Other browsers:** Bookmark for quick access

---

## ✨ Features

| Feature | Extension | PWA |
|---------|-----------|-----|
| Direct result access | ✅ | ✅ |
| CSRF token auto-handling | ✅ | ✅ |
| Remember registration number | ✅ | ✅ |
| Fast & lightweight | ✅ | ✅ |
| Mobile support | ❌ | ✅ |
| Installable homescreen app | ❌ | ✅ |
| No extension approval needed | ❌ | ✅ |
| Toolbar access | ✅ | ❌ |
| **CORS-free (works everywhere)** | ✅ | ⚠️ |

---

## 🔐 How It Works

```
User enters credentials
        ↓
App fetches login page
        ↓
Extracts CSRF token from HTML
        ↓
Submits login form with token
        ↓
Verifies successful authentication
        ↓
Redirects to results page
```

### Security

✅ Credentials sent **directly to official RIT IMS portal**  
✅ **CSRF token** automatically handled  
✅ Uses **HTTPS only**  
✅ Registration number saved only in **browser storage** (never on servers)  
✅ **Password never stored** anywhere  

---

## 📱 Usage

### Via Chrome Extension

1. Click the extension icon in the toolbar
2. Enter your **13-digit registration number**
3. Enter your **password**
4. Click **"Login & View Results"**
5. Results page opens in a new tab

### Via PWA

1. Visit: https://nid67.github.io/rit-result-viewer/pwa/
2. Install as homescreen app (recommended)
3. Enter your credentials
4. Click **"Login & View Results"**
5. Redirected to results page in the same window

---

## 📂 Project Structure

```
rit-result-viewer/
├── manifest.json              # Chrome Extension manifest (V3)
├── popup.html                 # Extension popup UI
├── popup.js                   # Extension login logic
├── README.md                  # This file
│
└── pwa/                       # Progressive Web App
    ├── index.html             # PWA page
    ├── app.js                 # PWA login logic
    ├── styles.css             # Styling
    ├── manifest.json          # PWA manifest
    └── README.md              # PWA documentation
```

---

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with animations
- **Vanilla JavaScript** - Zero dependencies
- **Progressive Web App** - Installable & fast
- **Manifest V3** - Modern Chrome extension standard

### Key Technologies

| Component | Tech |
|-----------|------|
| Token Extraction | Regex pattern matching |
| CORS | Credentials included |
| Form Submission | FormData API |
| Storage | localStorage (PWA) / chrome.storage (Extension) |
| Styling | CSS3 Flexbox & Gradient |

---

## ❓ FAQ

**Q: Is my password safe?**  
A: Yes! Your password is never stored. It's sent directly to the official RIT IMS server over HTTPS with CSRF protection.

**Q: Will this work on mobile?**  
A: Yes! Use the **PWA version** on mobile. Download it as a homescreen app for the best experience.

**Q: Does it work offline?**  
A: No. You need internet to login. We intentionally skipped offline caching to keep the app lightweight.

**Q: Why does this exist?**  
A: The RIT IMS homepage becomes extremely slow during result uploads when many students access it simultaneously. This app bypasses the homepage entirely.

**Q: Is this official?**  
A: No. This is an unofficial student project. Use at your own risk and comply with RIT's terms of service.

**Q: Can I use both extension and PWA?**  
A: Yes! They're completely separate and can be used alongside each other.

**Q: How often is the app updated?**  
A: As needed. If the RIT IMS login page structure changes, we'll update the token extraction logic.

---

## 🐛 Troubleshooting

### "Could not find CSRF token"
- The RIT IMS login page structure may have changed
- Try using the official portal: https://ims.ritchennai.edu.in

### "Invalid credentials"
- Double-check your 13-digit registration number
- Verify your password (check CAPS LOCK)
- Try resetting your password on the official portal

### "Failed to fetch login page"
- Check your internet connection
- RIT servers might be temporarily down
- Wait a few moments and try again

### "Failed to fetch"
- This is a **CORS (Cross-Origin) error**
- The browser blocked the request because the PWA is on GitHub Pages
- **Solution:** Use the **Chrome Extension instead** - it has full permissions
- Alternatively, if RIT enables CORS headers, this will be fixed automatically

### Extension not showing results
- Refresh the extension: Go to `chrome://extensions/` → click refresh icon
- Clear browser cache and cookies
- Try disabling and re-enabling the extension

### PWA not installing
- Make sure you're using Chrome, Edge, or Safari
- Try using HTTPS (GitHub Pages provides this)
- Check that your browser supports PWA installation

---

## 🌐 Browser Support

| Browser | Extension | PWA |
|---------|-----------|-----|
| Chrome | ✅ Full | ✅ Full |
| Edge | ✅ Full | ✅ Full |
| Firefox | ❌ | ✅ |
| Safari | ❌ | ✅ |
| Opera | ❌ | ✅ |

---

## 📝 License

MIT License - Feel free to use, modify, and share.

See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Found a bug? Have a suggestion?

1. Check if it's already reported in Issues
2. Create a new Issue with details
3. Feel free to submit Pull Requests

---

## ⚠️ Disclaimer

This tool is provided **"as-is"** without warranty. The author is not responsible for:
- Loss of access to your account
- Data loss or misuse of credentials
- Violations of RIT's terms of service
- Changes to the RIT IMS portal that break this tool

**Always verify you're connecting to the official RIT IMS portal:** https://ims.ritchennai.edu.in

---

## 🎓 For RIT Students

This project is built **by students, for students**. It's designed to make your life easier during result season when the portal gets hammered with traffic.

Stay ethical. Don't share credentials. Don't use this for anything other than accessing your own results.

---

## 📧 Support

- **Issues:** Use the GitHub Issues tab
- **Questions:** Open a Discussion (if enabled)
- **Security:** Please don't disclose security issues publicly; email privately first

---

## 🎉 Made with ❤️ for RIT Students

**Problems Solved:**
- ⚡ Eliminates slow homepage loading
- 🔒 Secure direct authentication
- 📱 Works on all devices
- 🚀 Instant results access

**Live Links:**
- 🌐 PWA: https://nid67.github.io/rit-result-viewer/pwa/
- 📦 Extension: Load unpacked from this repo
- 📚 Docs: Check individual README files

---

### Version Info
- **Current Version:** 1.0
- **Last Updated:** February 2026
- **Status:** Active & Maintained

Happy result checking! 🎊
