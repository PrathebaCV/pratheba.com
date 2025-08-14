// Floating Menu Component for Pratheba.com
// Note: This menu only activates on mobile devices (≤768px) to avoid 
// conflicts with the existing desktop navigation system
class FloatingMenu {
    constructor() {
        this.isOpen = false;
        this.currentPath = window.location.pathname;
        this.menuInitialized = false;
        this.init();
        this.handleResize();
    }

    init() {
        // Only initialize on mobile devices to avoid conflicts with existing nav
        if (this.isMobile()) {
            this.createMenuHTML();
            this.attachEventListeners();
            this.handleKeyboardNavigation();
            this.menuInitialized = true;
        }
    }

    isMobile() {
        return window.innerWidth <= 768;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            if (this.isMobile() && !this.menuInitialized) {
                // Initialize menu when resizing to mobile
                this.createMenuHTML();
                this.attachEventListeners();
                this.handleKeyboardNavigation();
                this.menuInitialized = true;
            } else if (!this.isMobile() && this.menuInitialized) {
                // Remove menu when resizing to desktop
                this.removeMenu();
                this.menuInitialized = false;
            }
        });
    }

    removeMenu() {
        const menuContainer = document.querySelector('.floating-menu-container');
        const styles = document.getElementById('floating-menu-styles');
        
        if (menuContainer) {
            menuContainer.remove();
        }
        if (styles) {
            styles.remove();
        }
        
        // Reset body overflow if menu was open
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    createMenuHTML() {
        // Create floating menu container
        const menuContainer = document.createElement('div');
        menuContainer.className = 'floating-menu-container';
        
        menuContainer.innerHTML = `
            <button class="floating-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <span class="menu-icon">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </span>
            </button>
            
            <nav class="floating-menu" role="navigation" aria-hidden="true">
                <div class="menu-header">
                    <h3>Pratheba.com</h3>
                </div>
                <ul class="menu-list">
                    <li><a href="${this.getRelativePath('')}" class="menu-item" data-section="home">🏠 முகப்பு</a></li>
                    <li><a href="${this.getRelativePath('about-me.html')}" class="menu-item" data-section="about">👤 என்னைப் பற்றி</a></li>
                    <li><a href="${this.getRelativePath('en_pakkam/index.html')}" class="menu-item" data-section="en-pakkam">✍️ என் பக்கம்</a></li>
                    <li><a href="${this.getRelativePath('book_reviews/index.html')}" class="menu-item" data-section="reviews">📚 வாசகர் பக்கம்</a></li>
                </ul>
                <div class="menu-footer">
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" class="social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </nav>
            
            <div class="menu-overlay"></div>
        `;

        // Insert the menu into the document
        document.body.appendChild(menuContainer);
        
        // Add the CSS
        this.addMenuStyles();
        
        // Set active menu item
        this.setActiveMenuItem();
    }

    getRelativePath(path) {
        // Determine the current directory depth to create relative paths
        const currentPath = window.location.pathname;
        let relativePath = '';

        if (currentPath.includes('/en_pakkam/')) {
            relativePath = '../';
        } else if (currentPath.includes('/book_reviews/')) {
            relativePath = '../';
        }

        // Handle empty path for home page
        if (path === '') {
            return relativePath + 'index.html';
        }

        return relativePath + path;
    }

    setActiveMenuItem() {
        const menuItems = document.querySelectorAll('.menu-item');
        const currentPath = window.location.pathname;

        menuItems.forEach(item => {
            const section = item.dataset.section;
            let isActive = false;

            switch (section) {
                case 'home':
                    isActive = currentPath === '/' || currentPath.endsWith('index.html') && !currentPath.includes('/en_pakkam/') && !currentPath.includes('/book_reviews/');
                    break;
                case 'about':
                    isActive = currentPath.includes('about-me.html');
                    break;
                case 'en-pakkam':
                    isActive = currentPath.includes('/en_pakkam/');
                    break;
                case 'reviews':
                    isActive = currentPath.includes('/book_reviews/');
                    break;
            }

            if (isActive) {
                item.classList.add('active');
            }
        });
    }

    attachEventListeners() {
        const toggle = document.querySelector('.floating-menu-toggle');
        const menu = document.querySelector('.floating-menu');
        const overlay = document.querySelector('.menu-overlay');
        const menuItems = document.querySelectorAll('.menu-item');

        if (!toggle || !menu || !overlay) {
            console.warn('Floating menu elements not found');
            return;
        }

        // Toggle menu
        toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => this.closeMenu());
        
        // Close menu when clicking menu items (allow navigation to complete)
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't prevent default - let the link navigate normally
                // Close menu after navigation starts
                setTimeout(() => this.closeMenu(), 150);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
    }

    handleKeyboardNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % menuItems.length;
                    menuItems[nextIndex].focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
                    menuItems[prevIndex].focus();
                }
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const toggle = document.querySelector('.floating-menu-toggle');
        const menu = document.querySelector('.floating-menu');
        const overlay = document.querySelector('.menu-overlay');

        this.isOpen = true;
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('active');
        menu.setAttribute('aria-hidden', 'false');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first menu item
        const firstMenuItem = document.querySelector('.menu-item');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 300);
        }
    }

    closeMenu() {
        const toggle = document.querySelector('.floating-menu-toggle');
        const menu = document.querySelector('.floating-menu');
        const overlay = document.querySelector('.menu-overlay');

        this.isOpen = false;
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    addMenuStyles() {
        if (document.getElementById('floating-menu-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'floating-menu-styles';
        styles.textContent = `
            .floating-menu-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                pointer-events: none;
            }

            .floating-menu-toggle {
                position: fixed;
                top: 1.5rem;
                right: 1.5rem;
                width: 60px;
                height: 60px;
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
                pointer-events: auto;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .floating-menu-toggle:hover {
                background: rgba(0, 0, 0, 0.9);
                border-color: rgba(255, 255, 255, 0.4);
                transform: scale(1.05);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
            }

            .floating-menu-toggle:focus {
                outline: 2px solid #4f46e5;
                outline-offset: 2px;
            }

            .menu-icon {
                width: 24px;
                height: 18px;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .line {
                width: 100%;
                height: 2px;
                background: white;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 1px;
            }

            .floating-menu-toggle.active .line1 {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .floating-menu-toggle.active .line2 {
                opacity: 0;
                transform: translateX(-20px);
            }

            .floating-menu-toggle.active .line3 {
                transform: rotate(-45deg) translate(6px, -6px);
            }

            .floating-menu {
                position: fixed;
                top: 0;
                right: -350px;
                width: 320px;
                height: 100vh;
                background: rgba(17, 24, 39, 0.95);
                backdrop-filter: blur(20px);
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
            }

            .floating-menu.active {
                right: 0;
            }

            .menu-header {
                padding: 2rem 1.5rem 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .menu-header h3 {
                color: white;
                font-size: 1.4rem;
                font-weight: 600;
                background: linear-gradient(135deg, #4f46e5, #10b981);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0;
                text-align: center;
            }

            .menu-list {
                flex: 1;
                list-style: none;
                padding: 1rem 0;
                margin: 0;
            }

            .menu-list li {
                margin: 0;
            }

            .menu-item {
                display: flex;
                align-items: center;
                padding: 1rem 1.5rem;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-size: 1.1rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border-radius: 0;
                position: relative;
                font-family: 'Noto Sans Tamil', system-ui, sans-serif;
            }

            .menu-item:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                transform: translateX(5px);
            }

            .menu-item:focus {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                outline: 2px solid #4f46e5;
                outline-offset: -2px;
            }

            .menu-item.active {
                background: rgba(79, 70, 229, 0.2);
                color: #4f46e5;
                border-right: 3px solid #4f46e5;
            }

            .menu-item.active::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 3px;
                background: #4f46e5;
            }

            .menu-footer {
                padding: 1.5rem;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .social-links {
                display: flex;
                justify-content: center;
                gap: 1rem;
            }

            .social-link {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, 0.7);
                text-decoration: none;
                transition: all 0.3s ease;
            }

            .social-link:hover {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                transform: translateY(-2px);
            }

            .social-link:focus {
                outline: 2px solid #4f46e5;
                outline-offset: 2px;
            }

            .menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
                z-index: 9998;
            }

            .menu-overlay.active {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            /* Mobile responsive */
            @media (min-width: 769px) {
                /* Hide floating menu completely on desktop to avoid conflicts */
                .floating-menu-container {
                    display: none !important;
                }
            }

            @media (max-width: 768px) {
                .floating-menu-toggle {
                    top: 1rem;
                    right: 1rem;
                    width: 50px;
                    height: 50px;
                }

                .floating-menu {
                    width: 280px;
                    right: -280px;
                }

                .menu-item {
                    padding: 0.8rem 1.2rem;
                    font-size: 1rem;
                }

                .menu-header {
                    padding: 1.5rem 1.2rem 0.8rem;
                }

                .menu-header h3 {
                    font-size: 1.2rem;
                }
            }

            @media (max-width: 480px) {
                .floating-menu {
                    width: 100vw;
                    right: -100vw;
                }
            }

            /* Animations */
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }

            @keyframes slideOutRight {
                from { transform: translateX(0); }
                to { transform: translateX(100%); }
            }

            /* Reduced motion preference */
            @media (prefers-reduced-motion: reduce) {
                .floating-menu-toggle,
                .menu-item,
                .social-link,
                .menu-overlay,
                .floating-menu {
                    transition: none;
                }
            }
        `;

        document.head.appendChild(styles);
    }
}

// Initialize the floating menu when DOM is loaded (mobile only)
document.addEventListener('DOMContentLoaded', () => {
    // Only create floating menu on mobile devices to avoid conflicts with desktop nav
    if (window.innerWidth <= 768) {
        new FloatingMenu();
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingMenu;
}
