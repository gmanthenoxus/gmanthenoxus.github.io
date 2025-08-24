// Navigation Module
// Mobile navigation optimization and responsive behavior

import { ready, $, $$, isMobile, truncateText } from '../utils/dom.js';
import { debounce } from '../utils/animations.js';
import { addTooltip } from '../utils/accessibility.js';

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    ready(() => {
        initMobileNavigation();
        initPostNavigation();
        initNavigationTooltips();
    });
}

/**
 * Initialize mobile navigation optimization
 */
function initMobileNavigation() {
    optimizeNavigationForMobile();
    
    // Re-optimize on window resize with debouncing
    window.addEventListener('resize', debounce(optimizeNavigationForMobile, 250));
}

/**
 * Optimize navigation for mobile devices
 */
function optimizeNavigationForMobile() {
    const navItems = $$('.post-navigation .nav-prev, .post-navigation .nav-next');
    const mobile = isMobile(768);
    
    navItems.forEach(item => {
        optimizeNavItem(item, mobile);
    });
}

/**
 * Optimize individual navigation item
 * @param {Element} navItem - Navigation item element
 * @param {boolean} mobile - Whether device is mobile
 */
function optimizeNavItem(navItem, mobile) {
    // Get the original text (without arrows)
    let originalText = navItem.textContent.trim();
    
    // Remove arrow characters to get clean title
    originalText = originalText.replace(/^←\s*/, '').replace(/\s*→$/, '');
    
    // Store original text if not already stored
    if (!navItem.dataset.originalTitle) {
        navItem.dataset.originalTitle = originalText;
    }
    
    const originalTitle = navItem.dataset.originalTitle;
    let displayTitle = originalTitle;
    
    // Apply truncation based on device type
    if (mobile) {
        if (originalTitle.length > 30) {
            displayTitle = truncateText(originalTitle, 30);
        }
    } else {
        if (originalTitle.length > 50) {
            displayTitle = truncateText(originalTitle, 50);
        }
    }
    
    // Update the navigation item content
    updateNavItemContent(navItem, displayTitle);
}

/**
 * Update navigation item content with proper structure
 * @param {Element} navItem - Navigation item element
 * @param {string} title - Title to display
 */
function updateNavItemContent(navItem, title) {
    const isNext = navItem.classList.contains('nav-next');
    const isPrev = navItem.classList.contains('nav-prev');
    
    // Create structured content with spans for better styling
    if (isPrev) {
        navItem.innerHTML = `<span class="nav-arrow">←</span> <span class="nav-title">${title}</span>`;
    } else if (isNext) {
        navItem.innerHTML = `<span class="nav-title">${title}</span> <span class="nav-arrow">→</span>`;
    }
}

/**
 * Initialize post navigation functionality
 */
function initPostNavigation() {
    const navItems = $$('.post-navigation a');
    
    navItems.forEach(item => {
        // Add smooth transition effects
        item.style.transition = 'all 0.3s ease';
        
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
            item.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '';
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
}

/**
 * Initialize navigation tooltips
 */
function initNavigationTooltips() {
    // Add tooltips after content is set
    setTimeout(() => {
        addTitleTooltips();
    }, 100);
}

/**
 * Add tooltips to show full titles on hover
 */
function addTitleTooltips() {
    const navItems = $$('.post-navigation .nav-prev, .post-navigation .nav-next');
    
    navItems.forEach(item => {
        const originalTitle = item.dataset.originalTitle;
        const currentTitle = item.querySelector('.nav-title')?.textContent || '';
        
        // Only add tooltip if title is truncated
        if (originalTitle && originalTitle !== currentTitle.replace('...', '')) {
            item.title = originalTitle;
            item.setAttribute('aria-label', `Navigate to: ${originalTitle}`);
            
            // Add custom tooltip for better styling
            addTooltip(item, originalTitle, {
                position: 'top',
                delay: 300
            });
        }
    });
}

/**
 * Initialize main site navigation
 */
export function initMainNavigation() {
    const navToggle = $('.nav-toggle');
    const navMenu = $('.nav-menu, .nav-links');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('nav-open');
        
        if (isOpen) {
            closeNavigation();
        } else {
            openNavigation();
        }
    });
    
    // Close navigation on outside click
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeNavigation();
        }
    });
    
    // Close navigation on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNavigation();
        }
    });
    
    // Handle navigation links
    const navLinks = $$('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeNavigation();
        });
    });
}

/**
 * Open mobile navigation
 */
function openNavigation() {
    const navToggle = $('.nav-toggle');
    const navMenu = $('.nav-menu, .nav-links');
    
    navMenu.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close mobile navigation
 */
function closeNavigation() {
    const navToggle = $('.nav-toggle');
    const navMenu = $('.nav-menu, .nav-links');
    
    navMenu.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Initialize breadcrumb navigation
 */
export function initBreadcrumbs() {
    const breadcrumbs = $('.breadcrumbs');
    if (!breadcrumbs) return;
    
    const links = breadcrumbs.querySelectorAll('a');
    
    links.forEach((link, index) => {
        // Add keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && index < links.length - 1) {
                e.preventDefault();
                links[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                links[index - 1].focus();
            }
        });
        
        // Add hover effects
        link.addEventListener('mouseenter', () => {
            link.style.textDecoration = 'underline';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textDecoration = 'none';
        });
    });
}

// Auto-initialize if this module is loaded directly
if (typeof window !== 'undefined') {
    initNavigation();
}
