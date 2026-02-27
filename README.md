# 🎓 RIT Direct Result Viewer

A Chrome extension for instant access to RIT IMS portal results - skip the homepage and jump straight to your marks!

## ✨ Features

- **Fast Direct Login** - Logs in directly without the slow homepage
- **Auto Results Navigation** - Opens marks page automatically in new tab
- **Secure CSRF Handling** - Properly fetches and uses CSRF tokens
- **Error Handling** - Clear error messages if login fails
- **Beautiful UI** - Modern, user-friendly popup interface

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nid67/rit-result-viewer.git
   cd rit-direct-result-viewer
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (top-right toggle)

4. Click **Load unpacked** and select this folder

5. Click the extension icon and login with your credentials

## 📖 How It Works

1. Fetches login page from `https://ims.ritchennai.edu.in/login`
2. Extracts CSRF token (`_token`) from the HTML
3. Sends POST request with email (registration number), password, and token
4. Authenticates using secure session cookies
5. Opens results page automatically: `https://ims.ritchennai.edu.in/admin/grade/student/mark/report`

## 🔒 Security

- ✅ Your credentials are **NEVER stored** - only registration number cached locally
- ✅ Requests sent directly to official IMS server (no third-party services)
- ✅ Uses `credentials: 'include'` for secure session handling
- ✅ CSRF tokens properly extracted and included

## 📁 Files Included

| File | Purpose |
|------|---------|
| **manifest.json** | Manifest V3 extension configuration |
| **popup.html** | Login form UI with modern design |
| **popup.js** | Login logic and CSRF token handling |
| **README.md** | This documentation |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension won't load | Check Developer mode is enabled, refresh page |
| Login fails | Verify 13-digit registration number and password |
| CSRF token error | Try logging in at https://ims.ritchennai.edu.in/ directly |
| Console errors | Right-click extension → Inspect popup → Console tab |

## 🔧 Requirements

- Google Chrome (latest version)
- 13-digit RIT registration number
- Valid IMS account credentials

## 📝 Permissions Used

- `tabs` - To open results page in new tab
- `scripting` - Extension functionality
- `storage` - To cache your registration number locally
- `https://ims.ritchennai.edu.in/*` - Access to IMS portal

## 📄 License

MIT License - Feel free to use and modify

---

**Version:** 1.0  
**Last Updated:** February 2026
