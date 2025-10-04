/**
 * Draggable Appearance/Theme Toggle
 * Allows users to switch between light and dark themes
 */

class AppearanceToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.position = JSON.parse(localStorage.getItem('appearanceTogglePosition') || '{"x": 20, "y": 100}');
        
        this.init();
    }
    
    init() {
        this.createToggleButton();
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }
    
    createToggleButton() {
        // Create the draggable toggle button
        this.toggleButton = document.createElement('div');
        this.toggleButton.className = 'appearance-toggle';
        this.toggleButton.id = 'appearanceToggle';
        this.toggleButton.innerHTML = `
            <div class="toggle-icon">
                <i class="fas fa-palette"></i>
            </div>
            <div class="toggle-tooltip">Theme Toggle</div>
        `;
        
        // Set initial position
        this.toggleButton.style.left = this.position.x + 'px';
        this.toggleButton.style.top = this.position.y + 'px';
        
        // Add to body
        document.body.appendChild(this.toggleButton);
        
        // Add CSS styles
        this.addStyles();
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .appearance-toggle {
                position: fixed;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #8b4513, #a0522d);
                border-radius: 50%;
                cursor: move;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
            }
            
            .appearance-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            }
            
            .appearance-toggle.dragging {
                transform: scale(1.1);
                z-index: 10000;
            }
            
            .toggle-icon {
                color: white;
                font-size: 18px;
                pointer-events: none;
            }
            
            .toggle-tooltip {
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
            }
            
            .toggle-tooltip::after {
                content: '';
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                border: 5px solid transparent;
                border-left-color: rgba(0,0,0,0.8);
            }
            
            .appearance-toggle:hover .toggle-tooltip {
                opacity: 1;
                visibility: visible;
            }
            
            /* Theme styles */
            [data-theme="dark"] {
                --bg-primary: #1a1a1a;
                --bg-secondary: #2d2d2d;
                --text-primary: #ffffff;
                --text-secondary: #cccccc;
                --border-color: #404040;
                --shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            
            [data-theme="dark"] body {
                background-color: var(--bg-primary);
                color: var(--text-primary);
            }
            
            [data-theme="dark"] .container,
            [data-theme="dark"] .product-card,
            [data-theme="dark"] .category-card {
                background-color: var(--bg-secondary);
                border-color: var(--border-color);
                color: var(--text-primary);
            }
            
            [data-theme="dark"] .header {
                background-color: var(--bg-secondary);
                border-bottom-color: var(--border-color);
            }
            
            [data-theme="dark"] .main-nav a {
                color: var(--text-primary);
            }
            
            [data-theme="dark"] .main-nav a:hover {
                color: #8b4513;
            }
            
            [data-theme="dark"] .hero {
                background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
            }
            
            [data-theme="dark"] .footer {
                background-color: var(--bg-secondary);
                border-top-color: var(--border-color);
            }
            
            [data-theme="dark"] .cart-sidebar {
                background-color: var(--bg-secondary);
                border-left-color: var(--border-color);
            }
            
            [data-theme="dark"] input,
            [data-theme="dark"] textarea,
            [data-theme="dark"] select {
                background-color: var(--bg-primary);
                border-color: var(--border-color);
                color: var(--text-primary);
            }
            
            /* Theme transition */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        // Mouse events for dragging
        this.toggleButton.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Click event for theme toggle
        this.toggleButton.addEventListener('click', (e) => {
            if (!this.isDragging) {
                this.toggleTheme();
            }
        });
        
        // Touch events for mobile
        this.toggleButton.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        document.addEventListener('touchend', () => this.endDrag());
        
        // Keyboard accessibility
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        this.toggleButton.setAttribute('tabindex', '0');
        this.toggleButton.setAttribute('role', 'button');
        this.toggleButton.setAttribute('aria-label', 'Toggle theme');
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.toggleButton.classList.add('dragging');
        
        const rect = this.toggleButton.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        
        e.preventDefault();
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        
        // Keep button within viewport
        const maxX = window.innerWidth - this.toggleButton.offsetWidth;
        const maxY = window.innerHeight - this.toggleButton.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        this.toggleButton.style.left = constrainedX + 'px';
        this.toggleButton.style.top = constrainedY + 'px';
        
        this.position = { x: constrainedX, y: constrainedY };
    }
    
    endDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.toggleButton.classList.remove('dragging');
            
            // Save position
            localStorage.setItem('appearanceTogglePosition', JSON.stringify(this.position));
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.showThemeNotification();
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update icon based on theme
        const icon = this.toggleButton.querySelector('.toggle-icon i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            this.toggleButton.querySelector('.toggle-tooltip').textContent = 'Switch to Light';
        } else {
            icon.className = 'fas fa-palette';
            this.toggleButton.querySelector('.toggle-tooltip').textContent = 'Switch to Dark';
        }
    }
    
    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }
    
    showThemeNotification() {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = `Switched to ${this.currentTheme} theme`;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .theme-notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #8b4513;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10001;
                font-size: 14px;
                font-weight: 500;
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    // Public methods
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme();
        }
    }
    
    resetPosition() {
        this.position = { x: 20, y: 100 };
        this.toggleButton.style.left = this.position.x + 'px';
        this.toggleButton.style.top = this.position.y + 'px';
        localStorage.setItem('appearanceTogglePosition', JSON.stringify(this.position));
    }
}

// Initialize appearance toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.appearanceToggle = new AppearanceToggle();
});

// Export for use in other files
window.AppearanceToggle = AppearanceToggle;
