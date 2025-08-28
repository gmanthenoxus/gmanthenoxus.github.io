/**
 * Enhanced Navigation System
 * Handles hamburger menu, mobile navigation, and accessibility
 */

class NavigationManager {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navOverlay = document.querySelector('.nav-overlay');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.body = document.body;
        
        this.isOpen = false;
        this.breakpoint = 768; // Tablet breakpoint
        
        this.init();
    }
    
    init() {
        if (!this.navToggle || !this.navMenu) {
            console.warn('Navigation elements not found');
            return;
        }
        
        this.bindEvents();
        this.handleResize();
        
        // Set initial ARIA states
        this.updateAriaStates();
        
        console.log('Navigation system initialized');
    }
    
    bindEvents() {
        // Toggle button click
        this.navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Overlay click to close
        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
        // Navigation link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close menu when link is clicked on mobile
                if (window.innerWidth < this.breakpoint) {
                    this.closeMenu();
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Focus trap when menu is open
        document.addEventListener('focusin', (e) => {
            this.handleFocusTrap(e);
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
        this.isOpen = true;
        
        // Add classes
        this.navMenu.classList.add('is-open');
        if (this.navOverlay) {
            this.navOverlay.classList.add('is-open');
        }
        this.body.classList.add('nav-open');
        
        // Update ARIA states
        this.navToggle.setAttribute('aria-expanded', 'true');
        this.navMenu.setAttribute('aria-hidden', 'false');
        if (this.navOverlay) {
            this.navOverlay.setAttribute('aria-hidden', 'false');
        }
        
        // Focus first menu item
        const firstLink = this.navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => {
                firstLink.focus();
            }, 300); // Wait for animation
        }
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');
    }
    
    closeMenu() {
        this.isOpen = false;
        
        // Remove classes
        this.navMenu.classList.remove('is-open');
        if (this.navOverlay) {
            this.navOverlay.classList.remove('is-open');
        }
        this.body.classList.remove('nav-open');
        
        // Update ARIA states
        this.navToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');
        if (this.navOverlay) {
            this.navOverlay.setAttribute('aria-hidden', 'true');
        }
        
        // Return focus to toggle button
        this.navToggle.focus();
        
        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');
    }
    
    handleKeydown(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' && this.isOpen) {
            this.closeMenu();
            return;
        }
        
        // Handle arrow key navigation when menu is open
        if (this.isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            this.handleArrowNavigation(e.key);
        }
    }
    
    handleArrowNavigation(key) {
        const focusableElements = Array.from(this.navMenu.querySelectorAll('.nav-link'));
        const currentIndex = focusableElements.indexOf(document.activeElement);
        
        let nextIndex;
        if (key === 'ArrowDown') {
            nextIndex = currentIndex + 1;
            if (nextIndex >= focusableElements.length) {
                nextIndex = 0; // Wrap to first
            }
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) {
                nextIndex = focusableElements.length - 1; // Wrap to last
            }
        }
        
        focusableElements[nextIndex].focus();
    }
    
    handleFocusTrap(e) {
        if (!this.isOpen || window.innerWidth >= this.breakpoint) {
            return;
        }
        
        const focusableElements = this.getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // If focus is outside the menu, bring it back
        if (!this.navMenu.contains(e.target) && e.target !== this.navToggle) {
            firstElement.focus();
        }
    }
    
    getFocusableElements() {
        const selectors = [
            '.nav-toggle',
            '.nav-link:not([disabled])',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        
        return Array.from(document.querySelectorAll(selectors.join(', ')))
            .filter(el => el.offsetParent !== null); // Only visible elements
    }
    
    handleResize() {
        const width = window.innerWidth;
        
        // Close mobile menu if window becomes desktop size
        if (width >= this.breakpoint && this.isOpen) {
            this.closeMenu();
        }
        
        // Update ARIA states based on screen size
        this.updateAriaStates();
    }
    
    updateAriaStates() {
        const isMobile = window.innerWidth < this.breakpoint;
        
        if (isMobile) {
            this.navMenu.setAttribute('aria-hidden', this.isOpen ? 'false' : 'true');
            this.navToggle.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        } else {
            this.navMenu.removeAttribute('aria-hidden');
            this.navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    announceToScreenReader(message) {
        // Create temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Public method to close menu (can be called from other scripts)
    close() {
        if (this.isOpen) {
            this.closeMenu();
        }
    }
    
    // Public method to check if menu is open
    isMenuOpen() {
        return this.isOpen;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.navigationManager && window.navigationManager.isMenuOpen()) {
        window.navigationManager.close();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}
