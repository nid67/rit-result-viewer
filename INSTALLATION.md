# 📥 Installation Guide - RIT Direct Result Viewer

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/nid67/rit-result-viewer.git
   cd rit-direct-result-viewer
   ```

2. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)

3. **Load the Extension**
   - Click **Load unpacked**
   - Select the `rit-direct-result-viewer` folder
   - The extension will appear in your toolbar

4. **Use the Extension**
   - Click the extension icon
   - Enter your 13-digit registration number
   - Enter your password
   - Click **Login & View Results**

## ✅ What's Included

The extension contains 3 essential files:

| File | Purpose |
|------|---------|
| **manifest.json** | Extension configuration (Manifest V3) |
| **popup.html** | Login UI with beautiful design |
| **popup.js** | Login logic with CSRF token handling |

## 🔒 How It Works

1. **CSRF Token Extraction**: Fetches the login page and extracts the `_token`
2. **Secure Login**: Sends credentials + token using `credentials: 'include'`
3. **Auto Navigation**: Opens results page on successful login
4. **Error Handling**: Shows clear error messages on failure

## 🛡️ Security

✅ Your credentials are **NEVER stored**  
✅ Only registration number cached locally  
✅ Requests sent directly to official IMS server  
✅ No third-party services involved  

## 🐛 Troubleshooting

### Extension not loading?
- Check if Developer mode is enabled
- Try refreshing the page
- Reload the extension (F5 on extensions page)

### Login fails?
- Verify your 13-digit registration number
- Check your password
- Try logging in on the official site first

### Console shows errors?
- Right-click extension → **Inspect popup**
- Check the **Console** tab for error messages

## 📁 GitHub Repository

https://github.com/nid67/rit-result-viewer

## ✨ Version

**v1.0** - February 2026

---

**Ready to use!** Just load it as an unpacked extension in Chrome.
