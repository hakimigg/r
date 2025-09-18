class AdminAuth {
    constructor() {
        this.credentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.sessionKey = 'adminSession';
        this.init();
    }

    init() {
        if (this.isLoggedIn() && window.location.pathname.includes('admin-login.html')) {
            window.location.href = 'admin-dashboard.html';
        }

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        this.hideError();
        
        if (this.validateCredentials(username, password)) {
            this.createSession(rememberMe);
            window.location.href = 'admin-dashboard.html';
        } else {
            this.showError('Invalid username or password');
        }
    }

    validateCredentials(username, password) {
        return username === this.credentials.username && password === this.credentials.password;
    }

    createSession(rememberMe) {
        const sessionData = {
            username: this.credentials.username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        if (rememberMe) {
            localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        }
    }

    isLoggedIn() {
        const session = localStorage.getItem(this.sessionKey) || sessionStorage.getItem(this.sessionKey);
        return session !== null;
    }

    getSession() {
        const session = localStorage.getItem(this.sessionKey) || sessionStorage.getItem(this.sessionKey);
        return session ? JSON.parse(session) : null;
    }

    logout() {
        localStorage.removeItem(this.sessionKey);
        sessionStorage.removeItem(this.sessionKey);
        window.location.href = 'admin-login.html';
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorDiv && errorMessage) {
            errorMessage.textContent = message;
            errorDiv.classList.remove('hidden');
        }
    }

    hideError() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    }
}

const adminAuth = new AdminAuth();

window.adminAuth = adminAuth;
