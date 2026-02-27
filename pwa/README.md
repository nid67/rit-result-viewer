# RIT Direct Result Viewer 🎓

A fast, lightweight web app for RIT (Rishihood Institute of Technology) students to directly access their results without loading the slow homepage.

## Features

✨ **Fast & Direct** - Skip the slow homepage and go straight to results  
📱 **Installable** - Add to your home screen on mobile and desktop  
🔒 **Secure** - Your credentials go directly to RIT IMS portal  
⚡ **Lightweight** - No offline bloat, just what you need  
💾 **Remember Me** - Saves your registration number locally  
📱 **Responsive** - Works seamlessly on phones, tablets, and desktops  

## How to Use

### Web App (Recommended)

1. Open the app URL in your browser
2. **Install the app:**
   - **Chrome/Edge:** Menu → "Install app" or "Add to home screen"
   - **Safari (iOS):** Share → "Add to Home Screen"
   - **Other browsers:** Bookmark or add shortcut

3. Enter your 13-digit registration number and password
4. Click "Login & View Results"
5. You'll be redirected directly to your results page

### Browser Bookmark (Alternative)

Simply bookmark the app URL for quick access from any device.

## Security Notes

- Your credentials are **never stored** on our servers
- They are sent **directly to RIT IMS portal** (https://ims.ritchennai.edu.in)
- **CSRF token** is automatically handled for you
- Uses **secure HTTPS** connection only
- Your registration number is saved only in your browser's local storage

## FAQ

**Q: Is my password saved?**  
A: No. Only your registration number is saved locally for convenience. Your password is never stored.

**Q: Does it work offline?**  
A: No. You need internet to log in, but the app loads instantly once installed.

**Q: Why does this exist?**  
A: The RIT IMS homepage is slow during high traffic periods (result upload times). This app bypasses it entirely by redirecting straight to the results page.

**Q: Can I use this on mobile?**  
A: Yes! Install it as a home screen app on iOS or Android for the best experience.

**Q: Is this official?**  
A: No. This is an unofficial student project. Use at your own risk and ensure you comply with RIT's terms of service.

## Technical Details

Built with:
- **HTML5** - Semantic markup
- **CSS3** - Responsive design
- **Vanilla JavaScript** - No dependencies
- **Progressive Web App (PWA)** - Installable

### CSRF Token Handling
The app automatically:
1. Fetches the login page to extract the CSRF token
2. Parses the `_token` from the HTML form
3. Submits it along with credentials to the login endpoint

### How the Flow Works

```
User Input
    ↓
Fetch Login Page (Get CSRF Token)
    ↓
Extract _token from HTML
    ↓
Submit Login Form (POST with token, email, password)
    ↓
Verify Authentication
    ↓
Redirect to Results Page
```

## Troubleshooting

**"Could not find CSRF token"**
- The RIT IMS login page structure may have changed
- Try using the official portal directly at https://ims.ritchennai.edu.in

**"Invalid credentials"**
- Verify your 13-digit registration number
- Ensure your password is correct
- Check if CAPS LOCK is on

**"Failed to fetch login page"**
- Check your internet connection
- The RIT server might be temporarily down
- Try again in a few moments

## Browser Support

✅ Chrome/Chromium (Best support)  
✅ Edge  
✅ Firefox  
✅ Safari (macOS & iOS)  
✅ Opera  

## Disclaimer

This tool is provided "as-is" without warranty. The author is not responsible for any issues or data loss. Always verify you're connecting to the official RIT IMS portal (https://ims.ritchennai.edu.in).

## License

MIT License - Use freely, modify, and share.

---

**Made with ❤️ for RIT students**

Need help? Open an issue or contact the repository owner.
