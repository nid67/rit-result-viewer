const loginForm = document.getElementById('loginForm');
const statusDiv = document.getElementById('status');
const loginBtn = document.getElementById('loginBtn');
const regNumberInput = document.getElementById('regNumber');
const passwordInput = document.getElementById('password');

const IMS_BASE_URL = 'https://ims.ritchennai.edu.in';
const LOGIN_URL = `${IMS_BASE_URL}/login`;
const RESULT_PAGE_URL = `${IMS_BASE_URL}/admin/grade/student/mark/report`;
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy for web version

// Restore saved registration number if available
window.addEventListener('load', () => {
  const savedRegNumber = localStorage.getItem('savedRegNumber');
  if (savedRegNumber) {
    regNumberInput.value = savedRegNumber;
    regNumberInput.focus();
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const regNumber = regNumberInput.value.trim();
  const password = passwordInput.value;
  
  // Validation
  if (!regNumber || !password) {
    showStatus('Please enter both registration number and password', 'error');
    return;
  }
  
  if (regNumber.length !== 13 || !/^\d+$/.test(regNumber)) {
    showStatus('Registration number must be exactly 13 digits', 'error');
    return;
  }
  
  // Save registration number for convenience
  localStorage.setItem('savedRegNumber', regNumber);
  
  // Disable button during login
  loginBtn.disabled = true;
  
  try {
    showStatus('Fetching login page...', 'loading');
    console.log('Starting login process for reg number:', regNumber);
    
    // Step 1: Fetch the login page to get CSRF token
    const loginPageResponse = await fetch(LOGIN_URL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache'
      }
    });
    
    console.log('Login page response status:', loginPageResponse.status);
    
    if (!loginPageResponse.ok) {
      throw new Error(`Failed to fetch login page: HTTP ${loginPageResponse.status}`);
    }
    
    const loginPageHtml = await loginPageResponse.text();
    console.log('Login page HTML length:', loginPageHtml.length);
    
    // Step 2: Extract CSRF token from the HTML
    let csrfToken = null;
    
    // Pattern 1: Standard input field with name="_token"
    let tokenMatch = loginPageHtml.match(/<input[^>]*name=['"_]*_token['"_]*[^>]*value=["']([^"']+)["']/i);
    console.log('Pattern 1 match:', tokenMatch ? 'found' : 'not found');
    
    // Pattern 2: Alternative format
    if (!tokenMatch) {
      tokenMatch = loginPageHtml.match(/<input[^>]*value=["']([^"']+)["'][^>]*name=['"_]*_token['"_]*[^>]*>/i);
      console.log('Pattern 2 match:', tokenMatch ? 'found' : 'not found');
    }
    
    // Pattern 3: Look for any token-like value
    if (!tokenMatch) {
      tokenMatch = loginPageHtml.match(/<input[^>]*type=['"]*hidden['"]*[^>]*name=['"_]*_token['"_]*[^>]*value=["']([^"']+)["']/i);
      console.log('Pattern 3 match:', tokenMatch ? 'found' : 'not found');
    }
    
    // Pattern 4: Very flexible pattern
    if (!tokenMatch) {
      tokenMatch = loginPageHtml.match(/_token[^>]*value=["']([^"']+)["']/i);
      console.log('Pattern 4 match:', tokenMatch ? 'found' : 'not found');
    }
    
    if (!tokenMatch || !tokenMatch[1]) {
      console.error('Full HTML for debugging:', loginPageHtml);
      throw new Error('Could not find CSRF token. The login page structure may have changed.');
    }
    
    csrfToken = tokenMatch[1];
    console.log('CSRF Token extracted successfully');
    
    showStatus('Authenticating...', 'loading');
    
    // Step 3: Submit login form with CSRF token
    const loginFormData = new FormData();
    loginFormData.append('_token', csrfToken);
    loginFormData.append('email', regNumber);
    loginFormData.append('password', password);
    
    console.log('Submitting login request to:', LOGIN_URL);
    
    const loginResponse = await fetch(LOGIN_URL, {
      method: 'POST',
      credentials: 'include',
      body: loginFormData,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    console.log('Login response status:', loginResponse.status);
    console.log('Login response redirected:', loginResponse.redirected);
    
    if (!loginResponse.ok && loginResponse.status !== 302 && loginResponse.status !== 301) {
      throw new Error(`Login request failed: HTTP ${loginResponse.status}`);
    }
    
    // Step 4: Check for error indicators
    const responseHtml = await loginResponse.text();
    const lowerResponseHtml = responseHtml.toLowerCase();
    
    if (lowerResponseHtml.includes('invalid credentials') || 
        lowerResponseHtml.includes('these credentials do not match') ||
        lowerResponseHtml.includes('invalid login') ||
        lowerResponseHtml.includes('authentication failed')) {
      console.error('Login failed - invalid credentials detected');
      throw new Error('Invalid credentials. Please check your registration number and password.');
    }
    
    console.log('Login successful!');
    showStatus('✓ Login successful! Redirecting...', 'success');
    
    // Step 5: Redirect to results page
    setTimeout(() => {
      window.location.href = RESULT_PAGE_URL;
    }, 1000);
    
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    
    // Check if it's a CORS error
    let errorMsg = error.message;
    if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
      errorMsg = 'CORS Error: The browser blocked the request. Try using the Chrome Extension instead, or enable CORS support on your server. For web version, use the Chrome Extension which has full permissions.';
    }
    
    showStatus(`❌ ${errorMsg}`, 'error');
    loginBtn.disabled = false;
  }
});

function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
}

// Clear status message when user starts typing
regNumberInput.addEventListener('focus', () => {
  if (statusDiv.classList.contains('error')) {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }
});

passwordInput.addEventListener('focus', () => {
  if (statusDiv.classList.contains('error')) {
    statusDiv.textContent = '';
    statusDiv.className = 'status';
  }
});
