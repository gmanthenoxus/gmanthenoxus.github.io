// ========================================
// 🧭 NAVIGATION MODULE
// ========================================

window.Navigation = (function() {
    'use strict';

    let isInitialized = false;
    let mobileMenuOpen = false;

    // DOM elements
    let header, navToggle, navMobile, navItems;

    // Configuration
    const config = {
        scrollThreshold: 100,
        mobileBreakpoint: 768,
        animationDuration: 300
    };

    // Initialize navigation
    function init() {
        if (isInitialized) return;

        // Get DOM elements
        header = document.querySelector('.header');
        navToggle = document.querySelector('.nav-toggle');
        navMobile = document.querySelector('.nav-mobile');
        navItems = document.querySelectorAll('.nav-item');

        if (!header) return;

        setupScrollEffect();
        setupMobileMenu();
        setupActiveStates();
        setupKeyboardNavigation();

        isInitialized = true;
        SiteCore.events.dispatch('navigationReady');
    }

    // Setup scroll effect for header
    function setupScrollEffect() {
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            const scrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (scrollY > config.scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll direction
            if (scrollY > lastScrollY && scrollY > config.scrollThreshold) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Setup mobile menu functionality
    function setupMobileMenu() {
        if (!navToggle || !navMobile) return;

        // Toggle button click
        navToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenuOpen && !navMobile.contains(e.target) && !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                closeMobileMenu();
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', SiteCore.utils.debounce(() => {
            if (window.innerWidth > config.mobileBreakpoint && mobileMenuOpen) {
                closeMobileMenu();
            }
        }, 250));

        // Handle mobile menu item clicks
        const mobileNavItems = navMobile.querySelectorAll('.nav-link');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        mobileMenuOpen = true;
        navToggle.classList.add('active');
        navMobile.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item for accessibility
        const firstMenuItem = navMobile.querySelector('.nav-link');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), config.animationDuration);
        }

        SiteCore.events.dispatch('mobileMenuOpened');
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuOpen = false;
        navToggle.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        navToggle.focus();

        SiteCore.events.dispatch('mobileMenuClosed');
    }

    // Setup active navigation states
    function setupActiveStates() {
        const currentPath = window.location.pathname;
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Check if current page matches nav item
            if (href === currentPath || 
                (href !== '/' && currentPath.startsWith(href))) {
                link.classList.add('active');
            }
        });
    }

    // Setup keyboard navigation
    function setupKeyboardNavigation() {
        // Handle tab navigation in mobile menu
        if (navMobile) {
            const focusableElements = navMobile.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );

            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                navMobile.addEventListener('keydown', (e) => {
                    if (!mobileMenuOpen) return;

                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            // Shift + Tab
                            if (document.activeElement === firstElement) {
                                e.preventDefault();
                                lastElement.focus();
                            }
                        } else {
                            // Tab
                            if (document.activeElement === lastElement) {
                                e.preventDefault();
                                firstElement.focus();
                            }
                        }
                    }
                });
            }
        }
    }

    // Smooth scroll to section
    function scrollToSection(sectionId, offset = 80) {
        const section = document.getElementById(sectionId) || 
                      document.querySelector(sectionId);
        
        if (section) {
            SiteCore.utils.scrollToElement(section, offset);
            
            // Close mobile menu if open
            if (mobileMenuOpen) {
                closeMobileMenu();
            }
        }
    }

    // Update active state based on scroll position
    function updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Optimize navigation for mobile devices
    function optimizeForMobile() {
        const isMobile = SiteCore.utils.getDeviceType() === 'mobile';
        
        if (isMobile) {
            // Add touch-friendly classes
            header.classList.add('mobile-optimized');
            
            // Optimize nav item text for mobile
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const originalText = link.textContent.trim();
                
                // Store original text
                if (!link.dataset.originalText) {
                    link.dataset.originalText = originalText;
                }

                // Shorten text for mobile if needed
                if (originalText.length > 12) {
                    const words = originalText.split(' ');
                    if (words.length > 1) {
                        link.textContent = words[0];
                        link.title = originalText; // Show full text on hover/focus
                    }
                }
            });
        } else {
            // Restore original text for desktop
            header.classList.remove('mobile-optimized');
            
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.dataset.originalText) {
                    link.textContent = link.dataset.originalText;
                    link.removeAttribute('title');
                }
            });
        }
    }

    // Public API
    return {
        init: init,
        scrollToSection: scrollToSection,
        updateActiveOnScroll: updateActiveOnScroll,
        optimizeForMobile: optimizeForMobile,
        closeMobileMenu: closeMobileMenu,
        openMobileMenu: openMobileMenu,
        isMenuOpen: () => mobileMenuOpen
    };
})();

// Initialize when core is ready
SiteCore.events.listen('coreReady', Navigation.init);

// Handle window resize
SiteCore.events.listen('windowResize', Navigation.optimizeForMobile);

// Update active states on scroll
window.addEventListener('scroll', SiteCore.utils.throttle(Navigation.updateActiveOnScroll, 100), { passive: true });
