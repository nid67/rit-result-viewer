/**
 * API endpoint to fetch CSRF token from RIT IMS login page
 * This runs on Vercel serverless function, bypassing CORS issues
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const IMS_BASE_URL = 'https://ims.ritchennai.edu.in';
    const LOGIN_URL = `${IMS_BASE_URL}/login`;

    console.log('Fetching login page from:', LOGIN_URL);

    // Fetch the login page
    const response = await fetch(LOGIN_URL, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error('Login page fetch failed:', response.status);
      return res.status(response.status).json({
        error: `Failed to fetch login page: HTTP ${response.status}`
      });
    }

    const html = await response.text();
    console.log('Login page HTML length:', html.length);

    // Extract CSRF token from HTML
    let csrfToken = null;

    // Pattern 1: Standard input field with name="_token"
    let tokenMatch = html.match(/<input[^>]*name=['"_]*_token['"_]*[^>]*value=["']([^"']+)["']/i);

    // Pattern 2: Alternative format
    if (!tokenMatch) {
      tokenMatch = html.match(/<input[^>]*value=["']([^"']+)["'][^>]*name=['"_]*_token['"_]*[^>]*>/i);
    }

    // Pattern 3: Hidden input format
    if (!tokenMatch) {
      tokenMatch = html.match(/<input[^>]*type=['"]*hidden['"]*[^>]*name=['"_]*_token['"_]*[^>]*value=["']([^"']+)["']/i);
    }

    // Pattern 4: Very flexible pattern
    if (!tokenMatch) {
      tokenMatch = html.match(/_token[^>]*value=["']([^"']+)["']/i);
    }

    if (!tokenMatch || !tokenMatch[1]) {
      console.error('Could not extract CSRF token from HTML');
      console.error('HTML snippet:', html.substring(0, 2000));
      return res.status(400).json({
        error: 'Could not find CSRF token in login page. The login page structure may have changed.'
      });
    }

    csrfToken = tokenMatch[1];
    console.log('CSRF token extracted successfully');

    // Return the token
    res.status(200).json({
      token: csrfToken,
      success: true
    });

  } catch (error) {
    console.error('Token fetch error:', error);
    res.status(500).json({
      error: error.message || 'Internal server error',
      details: error.toString()
    });
  }
}
