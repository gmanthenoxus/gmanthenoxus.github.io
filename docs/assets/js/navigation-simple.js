/**
 * Simple & Reliable Navigation System
 * Bulletproof hamburger menu with smooth animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍔 Navigation: Initializing...');
    
    // Get navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    // Check if elements exist
    if (!navToggle || !navMenu) {
        console.error('❌ Navigation: Required elements not found');
        console.log('navToggle:', navToggle);
        console.log('navMenu:', navMenu);
        return;
    }
    
    console.log('✅ Navigation: Elements found, setting up...');
    
    let isMenuOpen = false;
    
    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        console.log('🍔 Navigation: Toggling menu, isOpen:', isMenuOpen);
        
        // Update button state
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        
        // Update menu state
        if (isMenuOpen) {
            navMenu.classList.add('is-open');
            if (navOverlay) navOverlay.classList.add('is-visible');
            body.classList.add('nav-open');
        } else {
            navMenu.classList.remove('is-open');
            if (navOverlay) navOverlay.classList.remove('is-visible');
            body.classList.remove('nav-open');
        }
    }
    
    // Close menu function
    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }
    
    // Event Listeners
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Navigation: Button clicked');
        toggleMenu();
    });
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            console.log('🍔 Navigation: Overlay clicked');
            closeMenu();
        });
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🍔 Navigation: Link clicked');
            closeMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('🍔 Navigation: Escape pressed');
            closeMenu();
        }
    });
    
    // Close menu on window resize (desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            console.log('🍔 Navigation: Window resized to desktop');
            closeMenu();
        }
    });
    
    console.log('🎉 Navigation: Setup complete!');
});

// Simple fallback for older browsers
if (!document.addEventListener) {
    console.warn('Navigation: Browser not supported');
}
