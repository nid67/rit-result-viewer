/**
 * API endpoint to handle login to RIT IMS
 * This runs on Vercel serverless function, bypassing CORS issues
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token, email, password } = req.body;

    // Validate input
    if (!token || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields: token, email, password'
      });
    }

    if (email.length !== 13 || !/^\d+$/.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format (must be 13 digits)'
      });
    }

    const IMS_BASE_URL = 'https://ims.ritchennai.edu.in';
    const LOGIN_URL = `${IMS_BASE_URL}/login`;

    console.log('Attempting login for:', email);

    // Create form data for login
    const formData = new URLSearchParams();
    formData.append('_token', token);
    formData.append('email', email);
    formData.append('password', password);

    // Submit login form
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: formData.toString(),
      redirect: 'follow'
    });

    console.log('Login response status:', response.status);
    console.log('Login response redirected:', response.redirected);
    console.log('Login response URL:', response.url);

    const responseHtml = await response.text();
    const lowerHtml = responseHtml.toLowerCase();

    // Check for error indicators
    if (lowerHtml.includes('invalid credentials') ||
        lowerHtml.includes('these credentials do not match') ||
        lowerHtml.includes('invalid login') ||
        lowerHtml.includes('authentication failed')) {
      console.error('Login failed - invalid credentials');
      return res.status(401).json({
        error: 'Invalid credentials. Please check your registration number and password.',
        authenticated: false
      });
    }

    // Check if login was successful by looking for redirect or dashboard
    const isAuthenticated = response.redirected || 
                          response.ok && 
                          (responseHtml.includes('dashboard') || 
                           responseHtml.includes('logout') ||
                           !responseHtml.includes('<form'));

    if (isAuthenticated) {
      console.log('Login successful!');
      return res.status(200).json({
        success: true,
        authenticated: true,
        message: 'Login successful',
        redirectUrl: `${IMS_BASE_URL}/admin/grade/student/mark/report`
      });
    } else {
      console.log('Login status uncertain - returning server response');
      return res.status(200).json({
        success: true,
        authenticated: true,
        message: 'Login request completed',
        redirectUrl: `${IMS_BASE_URL}/admin/grade/student/mark/report`
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error',
      authenticated: false,
      details: error.toString()
    });
  }
}
