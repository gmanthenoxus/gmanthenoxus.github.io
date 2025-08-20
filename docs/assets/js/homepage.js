// ========================================
// 🏠 HOMEPAGE MODULE
// ========================================

window.Homepage = (function() {
    'use strict';

    let isInitialized = false;

    // Configuration
    const config = {
        floatingElements: {
            count: 7,
            emojis: ['🏀', '💻', '🎌', '📊', '🔧', '🇳🇬', '🇬🇧'],
            minSize: 3,
            maxSize: 8,
            minDuration: 10,
            maxDuration: 20
        },
        tabSwitching: {
            animationDuration: 300,
            fadeDelay: 150
        }
    };

    // Initialize homepage functionality
    function init() {
        if (isInitialized) return;
        if (!document.querySelector('.hero')) return; // Only run on homepage

        setupFloatingElements();
        setupScrollArrow();
        setupTabbedRoadmap();
        setupChapterHoverEffects();

        isInitialized = true;
        SiteCore.events.dispatch('homepageReady');
    }

    // Create floating background elements
    function setupFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero || SiteCore.utils.prefersReducedMotion()) return;

        // Remove existing floating elements
        const existingElements = hero.querySelectorAll('.floating-bg');
        existingElements.forEach(el => el.remove());

        // Create new floating elements
        for (let i = 0; i < config.floatingElements.count; i++) {
            createFloatingElement(hero, i);
        }
    }

    // Create individual floating element
    function createFloatingElement(container, index) {
        const element = document.createElement('div');
        element.className = 'floating-bg';
        element.textContent = getRandomEmoji();
        
        // Random positioning and styling
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.fontSize = `${getRandomSize()}rem`;
        element.style.animationDuration = `${getRandomDuration()}s`;
        element.style.animationDelay = `-${Math.random() * 10}s`;
        
        // Add staggered animation delay for initial load
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '0.1';
            element.style.transition = 'opacity 1s ease';
        }, index * 200);

        container.appendChild(element);
    }

    // Get random emoji from config
    function getRandomEmoji() {
        const emojis = config.floatingElements.emojis;
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    // Get random size within range
    function getRandomSize() {
        const { minSize, maxSize } = config.floatingElements;
        return Math.random() * (maxSize - minSize) + minSize;
    }

    // Get random duration within range
    function getRandomDuration() {
        const { minDuration, maxDuration } = config.floatingElements;
        return Math.random() * (maxDuration - minDuration) + minDuration;
    }

    // Setup scroll arrow functionality
    function setupScrollArrow() {
        const scrollArrow = document.querySelector('.scroll-down');
        if (!scrollArrow) return;

        scrollArrow.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = document.querySelector('.tabbed-roadmap') || 
                                document.querySelector('main > section:nth-child(2)');
            
            if (targetSection) {
                SiteCore.utils.scrollToElement(targetSection, 20);
            }
        });

        // Hide arrow when user scrolls past hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrollArrow.style.opacity = '1';
                        scrollArrow.style.pointerEvents = 'auto';
                    } else {
                        scrollArrow.style.opacity = '0';
                        scrollArrow.style.pointerEvents = 'none';
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(hero);
        }
    }

    // Setup tabbed roadmap functionality
    function setupTabbedRoadmap() {
        const tabButtons = document.querySelectorAll('.roadmap-nav .nav-item');
        const tabPanes = document.querySelectorAll('.content-pane');
        
        if (tabButtons.length === 0 || tabPanes.length === 0) return;

        // Set initial active state
        if (!document.querySelector('.nav-item.active')) {
            tabButtons[0].classList.add('active');
            tabPanes[0].classList.add('active');
        }

        // Add click handlers
        tabButtons.forEach(button => {
            button.addEventListener('click', () => switchTab(button, tabButtons, tabPanes));
        });

        // Add keyboard navigation
        setupTabKeyboardNavigation(tabButtons, tabPanes);
    }

    // Switch between tabs
    function switchTab(activeButton, allButtons, allPanes) {
        const targetId = activeButton.dataset.target;
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return;

        // Remove active classes with animation
        allButtons.forEach(btn => btn.classList.remove('active'));
        allPanes.forEach(pane => {
            pane.classList.remove('active');
            pane.style.opacity = '0';
        });

        // Add active class to clicked button
        activeButton.classList.add('active');

        // Show target pane with fade effect
        setTimeout(() => {
            targetPane.classList.add('active');
            targetPane.style.opacity = '1';
        }, config.tabSwitching.fadeDelay);

        // Dispatch custom event
        SiteCore.events.dispatch('tabSwitched', {
            activeTab: targetId,
            activeButton: activeButton
        });
    }

    // Setup keyboard navigation for tabs
    function setupTabKeyboardNavigation(tabButtons, tabPanes) {
        tabButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let targetIndex;

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        targetIndex = tabButtons.length - 1;
                        break;
                    default:
                        return;
                }

                // Focus and activate target tab
                const targetButton = tabButtons[targetIndex];
                targetButton.focus();
                switchTab(targetButton, tabButtons, tabPanes);
            });
        });
    }

    // Setup chapter hover effects
    function setupChapterHoverEffects() {
        const chapters = document.querySelectorAll('.chapter');
        if (chapters.length === 0) return;

        chapters.forEach(chapter => {
            // Mouse enter effect
            chapter.addEventListener('mouseenter', () => {
                if (!SiteCore.utils.prefersReducedMotion()) {
                    chapter.style.transform = 'rotate(1deg) scale(1.02)';
                    chapter.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });

            // Mouse leave effect
            chapter.addEventListener('mouseleave', () => {
                chapter.style.transform = 'rotate(0) scale(1)';
            });

            // Focus effects for accessibility
            chapter.addEventListener('focus', () => {
                chapter.style.outline = '2px solid var(--accent-color, #007bff)';
                chapter.style.outlineOffset = '4px';
            });

            chapter.addEventListener('blur', () => {
                chapter.style.outline = 'none';
            });
        });
    }

    // Refresh floating elements (useful for theme changes)
    function refreshFloatingElements() {
        if (document.querySelector('.hero')) {
            setupFloatingElements();
        }
    }

    // Handle window resize
    function handleResize() {
        const deviceType = SiteCore.utils.getDeviceType();
        
        // Adjust floating elements for mobile
        if (deviceType === 'mobile') {
            const floatingElements = document.querySelectorAll('.floating-bg');
            floatingElements.forEach(el => {
                el.style.display = 'none'; // Hide on mobile for performance
            });
        } else {
            const floatingElements = document.querySelectorAll('.floating-bg');
            floatingElements.forEach(el => {
                el.style.display = 'block';
            });
        }
    }

    // Preload critical resources
    function preloadResources() {
        // Preload images that might be used in tabs
        const imagesToPreload = [
            '/assets/img/roadmap-preview.jpg',
            '/assets/img/projects-preview.jpg'
        ];

        imagesToPreload.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Public API
    return {
        init: init,
        refreshFloatingElements: refreshFloatingElements,
        handleResize: handleResize,
        preloadResources: preloadResources
    };
})();

// Initialize when core is ready
SiteCore.events.listen('coreReady', Homepage.init);

// Handle window resize
SiteCore.events.listen('windowResize', Homepage.handleResize);

// Listen for tab switches
SiteCore.events.listen('tabSwitched', (e) => {
    console.log('Tab switched to:', e.detail.activeTab);
});
