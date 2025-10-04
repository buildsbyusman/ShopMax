// Authentication functionality for ShopMax

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});

function initializeAuth() {
    // Check if we're on login or register page
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        window.location.href = 'index.html';
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate input
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate API call
    const loginData = {
        email: email,
        password: password
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate network delay
    setTimeout(() => {
        const result = authenticateUser(email, password);
        
        if (result.success) {
            // Store user data
            const userData = {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
                loginTime: new Date().toISOString()
            };
            
            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(userData));
            }
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect to appropriate page
            setTimeout(() => {
                if (result.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        } else {
            showMessage(result.message, 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1000);
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        agreeTerms: document.getElementById('agreeTerms').checked,
        newsletter: document.getElementById('newsletter').checked
    };
    
    // Validate input
    const validation = validateRegistration(userData);
    if (!validation.valid) {
        showMessage(validation.message, 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const result = registerUser(userData);
        
        if (result.success) {
            showMessage('Account created successfully! Please sign in.', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showMessage(result.message, 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

// Validate registration data
function validateRegistration(userData) {
    // Check required fields
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        return { valid: false, message: 'Please fill in all required fields' };
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    
    // Check password match
    if (userData.password !== userData.confirmPassword) {
        return { valid: false, message: 'Passwords do not match' };
    }
    
    // Check password strength
    if (userData.password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    
    // Check terms agreement
    if (!userData.agreeTerms) {
        return { valid: false, message: 'Please agree to the terms and conditions' };
    }
    
    return { valid: true };
}

// Authenticate user (simulate API call)
function authenticateUser(email, password) {
    // Demo users
    const demoUsers = [
        {
            id: 1,
            name: 'Admin User',
            email: 'admin@shopmax.com',
            password: 'admin123',
            role: 'admin'
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'user@shopmax.com',
            password: 'user123',
            role: 'user'
        }
    ];
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    } else {
        return {
            success: false,
            message: 'Invalid email or password'
        };
    }
}

// Register user (simulate API call)
function registerUser(userData) {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(u => u.email === userData.email);
    
    if (userExists) {
        return {
            success: false,
            message: 'An account with this email already exists'
        };
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        role: 'user',
        createdAt: new Date().toISOString(),
        newsletter: userData.newsletter
    };
    
    // Save user
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
    
    return {
        success: true,
        user: newUser
    };
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthText = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');
    
    if (!password) {
        strengthText.textContent = '';
        strengthBar.className = 'strength-fill';
        return;
    }
    
    let strength = 0;
    let strengthLabel = '';
    
    // Length check
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (strength < 2) {
        strengthLabel = 'Weak';
        strengthBar.className = 'strength-fill strength-weak';
    } else if (strength < 4) {
        strengthLabel = 'Fair';
        strengthBar.className = 'strength-fill strength-fair';
    } else if (strength < 6) {
        strengthLabel = 'Good';
        strengthBar.className = 'strength-fill strength-good';
    } else {
        strengthLabel = 'Strong';
        strengthBar.className = 'strength-fill strength-strong';
    }
    
    strengthText.textContent = `Password strength: ${strengthLabel}`;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
}

// Get current user
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Require authentication for protected pages
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Require admin role
function requireAdmin() {
    if (!requireAuth()) return false;
    
    const user = getCurrentUser();
    if (user.role !== 'admin') {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Message display system
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Position message at top of page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Export functions
window.Auth = {
    logout,
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    requireAdmin,
    showMessage
};

