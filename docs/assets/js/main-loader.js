// Main Module Loader
// Conditionally loads JavaScript functionality based on page type and content

// Simple DOM utilities (inline to avoid import issues)
function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

function $(selector, context = document) {
    return context.querySelector(selector);
}

function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function truncateText(text, maxLength, suffix = '...') {
    if (text.length <= maxLength) return text;

    const words = text.split(' ');
    let truncated = '';

    for (let i = 0; i < words.length; i++) {
        const testString = truncated + (truncated ? ' ' : '') + words[i];
        if (testString.length <= maxLength - suffix.length) {
            truncated = testString;
        } else {
            break;
        }
    }

    if (!truncated) {
        truncated = text.substring(0, maxLength - suffix.length);
    }

    return truncated + suffix;
}

/**
 * Main application initialization
 */
class AppLoader {
    constructor() {
        this.loadedModules = new Set();
        this.pageType = this.detectPageType();
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        ready(() => {
            this.loadCoreModules();
            this.loadPageSpecificModules();
            this.loadConditionalModules();
        });
    }
    
    /**
     * Detect the current page type
     * @returns {string} Page type identifier
     */
    detectPageType() {
        const path = window.location.pathname;
        const body = document.body;
        
        // Check body classes first
        if (body.classList.contains('home')) return 'homepage';
        if (body.classList.contains('blog')) return 'blog';
        if (body.classList.contains('hobby')) return 'hobby';
        if (body.classList.contains('post')) return 'post';
        
        // Check URL patterns
        if (path === '/' || path === '/index.html') return 'homepage';
        if (path.includes('/blog/') || path.includes('/posts/')) return 'post';
        if (path.includes('/blog') || path.includes('/posts')) return 'blog';
        if (path.includes('/hobbies/')) return 'hobby';
        if (path.includes('/hobbies')) return 'hobbies-index';
        
        // Check for specific page elements
        if ($('.hero')) return 'homepage';
        if ($('.blog-grid, .blog-list')) return 'blog';
        if ($('.hobby-hero, .hobby-content')) return 'hobby';
        if ($('.post-content, article')) return 'post';
        
        return 'default';
    }
    
    /**
     * Load core modules that are needed on every page
     */
    loadCoreModules() {
        // Navigation functionality
        this.initNavigation();
        this.loadedModules.add('navigation');
        console.log('✅ Core modules loaded');
    }
    
    /**
     * Load page-specific modules
     */
    loadPageSpecificModules() {
        switch (this.pageType) {
            case 'homepage':
                this.loadHomepageModules();
                break;

            case 'blog':
            case 'post':
                this.loadBlogModules();
                break;

            case 'hobby':
                this.loadHobbyModules();
                break;

            case 'hobbies-index':
                this.loadHobbiesIndexModules();
                break;

            default:
                console.log(`📄 Default page type: ${this.pageType}`);
        }
    }
    
    /**
     * Load homepage-specific modules
     */
    loadHomepageModules() {
        this.initHomepage();
        this.loadedModules.add('homepage');
        console.log('🏠 Homepage modules loaded');
    }
    
    /**
     * Load blog-specific modules
     */
    loadBlogModules() {
        this.initBlog();
        this.loadedModules.add('blog');
        console.log('📝 Blog modules loaded');
    }

    /**
     * Load hobby page modules
     */
    loadHobbyModules() {
        this.initHobbies();
        this.loadedModules.add('hobbies');
        console.log('🎯 Hobby modules loaded');
    }

    /**
     * Load hobbies index page modules
     */
    loadHobbiesIndexModules() {
        this.initHobbyFilter();
        this.loadedModules.add('hobbies-index');
        console.log('🎯 Hobbies index modules loaded');
    }
    
    /**
     * Load conditional modules based on page content
     */
    loadConditionalModules() {
        // Load collapsible sections if present
        if ($$('.tldr-box, .results-preview, .prerequisites-box, .tools-needed, .collapsible-section').length) {
            this.initCollapsibleSections();
            this.loadedModules.add('collapsible');
            console.log('📋 Collapsible sections loaded');
        }

        // Load interactive features if present
        if ($$('.trivia-card, .fact-share-btn, .expandable-card').length) {
            this.initHobbyInteractive();
            this.loadedModules.add('interactive');
            console.log('🎮 Interactive features loaded');
        }
    }
    
    /**
     * Get loaded modules for debugging
     * @returns {Array} Array of loaded module names
     */
    getLoadedModules() {
        return Array.from(this.loadedModules);
    }
    
    /**
     * Get current page type
     * @returns {string} Current page type
     */
    getPageType() {
        return this.pageType;
    }

    // ========================================
    // IMPLEMENTATION FUNCTIONS
    // ========================================

    /**
     * Initialize navigation functionality
     */
    initNavigation() {
        this.initMobileNavigation();
        this.initPostNavigation();
    }

    /**
     * Initialize mobile navigation optimization
     */
    initMobileNavigation() {
        const optimizeNavigation = () => {
            const navItems = $$('.post-navigation .nav-prev, .post-navigation .nav-next');
            const mobile = window.innerWidth <= 768;

            navItems.forEach(item => {
                let originalText = item.textContent.trim();
                originalText = originalText.replace(/^←\s*/, '').replace(/\s*→$/, '');

                if (!item.dataset.originalTitle) {
                    item.dataset.originalTitle = originalText;
                }

                const originalTitle = item.dataset.originalTitle;
                let displayTitle = originalTitle;

                if (mobile && originalTitle.length > 30) {
                    displayTitle = truncateText(originalTitle, 30);
                } else if (!mobile && originalTitle.length > 50) {
                    displayTitle = truncateText(originalTitle, 50);
                }

                const isNext = item.classList.contains('nav-next');
                const isPrev = item.classList.contains('nav-prev');

                if (isPrev) {
                    item.innerHTML = `<span class="nav-arrow">←</span> <span class="nav-title">${displayTitle}</span>`;
                } else if (isNext) {
                    item.innerHTML = `<span class="nav-title">${displayTitle}</span> <span class="nav-arrow">→</span>`;
                }
            });
        };

        optimizeNavigation();
        window.addEventListener('resize', debounce(optimizeNavigation, 250));
    }

    /**
     * Initialize post navigation functionality
     */
    initPostNavigation() {
        const navItems = $$('.post-navigation a');

        navItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';

            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-2px)';
                item.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = '';
            });
        });
    }

    /**
     * Initialize homepage functionality
     */
    initHomepage() {
        this.initChapterEffects();
        this.initFloatingElements();
        this.initScrollNavigation();
        this.initTabbedRoadmap();
        this.initWIPForm();
    }

    /**
     * Initialize chapter hover effects
     */
    initChapterEffects() {
        const chapters = $$('.chapter');

        chapters.forEach(chapter => {
            chapter.addEventListener('mouseenter', () => {
                chapter.style.transform = 'rotate(1deg) scale(1.02)';
            });

            chapter.addEventListener('mouseleave', () => {
                chapter.style.transform = 'rotate(0) scale(1)';
            });
        });
    }

    /**
     * Initialize floating background elements in hero section
     */
    initFloatingElements() {
        const hero = $('.hero');
        if (!hero) return;

        const emojis = ['🏀', '💻', '🎌', '📊', '🔧', '🇳🇬', '🇬🇧'];

        for (let i = 0; i < 7; i++) {
            const el = document.createElement('div');
            el.className = 'floating-bg';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = `${Math.random() * 100}%`;
            el.style.top = `${Math.random() * 100}%`;
            el.style.fontSize = `${Math.random() * 5 + 3}rem`;
            el.style.animationDuration = `${Math.random() * 10 + 10}s`;
            el.style.animationDelay = `-${Math.random() * 10}s`;
            hero.appendChild(el);
        }
    }

    /**
     * Initialize smooth scroll navigation
     */
    initScrollNavigation() {
        const scrollButton = $('.scroll-down');
        if (!scrollButton) return;

        scrollButton.addEventListener('click', () => {
            const roadmapSection = $('.tabbed-roadmap');
            if (roadmapSection) {
                const offsetTop = roadmapSection.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Initialize tabbed roadmap functionality
     */
    initTabbedRoadmap() {
        const tabButtons = $$('.roadmap-nav .nav-item');
        const tabPanes = $$('.content-pane');

        if (!tabButtons.length || !tabPanes.length) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active classes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding pane
                const targetId = button.dataset.target;
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    /**
     * Initialize WIP (Work in Progress) form
     */
    initWIPForm() {
        const wipForm = $('.wip-form');
        const wipButton = $('.wip-form button');
        const wipInput = $('.wip-form input');

        if (!wipForm || !wipButton || !wipInput) return;

        wipButton.addEventListener('click', (e) => {
            e.preventDefault();

            const email = wipInput.value.trim();

            if (!email) {
                this.showFormMessage('Please enter your email address', 'error');
                return;
            }

            if (!validateEmail(email)) {
                this.showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            this.showFormMessage(`Thanks! We'll notify you at ${email} when Brain Work is ready.`, 'success');
            wipInput.value = '';
        });

        wipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                wipButton.click();
            }
        });
    }

    /**
     * Show form message
     */
    showFormMessage(message, type = 'info') {
        const existingMessage = $('.wip-form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `wip-form-message wip-form-message--${type}`;
        messageEl.textContent = message;

        const wipForm = $('.wip-form');
        wipForm.appendChild(messageEl);

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }

    /**
     * Initialize blog functionality
     */
    initBlog() {
        this.initBlogFilter();
        this.initBlogAnimations();
    }

    /**
     * Initialize blog post filtering
     */
    initBlogFilter() {
        const filterButtons = $$('.filter-btn');
        const blogCards = $$('.blog-card');

        if (!filterButtons.length || !blogCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter cards with animation
                blogCards.forEach((card, index) => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Initialize blog card animations on load
     */
    initBlogAnimations() {
        const blogCards = $$('.blog-card');

        if (!blogCards.length) return;

        // Initial animation for all visible cards
        blogCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Add hover effects
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    /**
     * Initialize hobby functionality
     */
    initHobbies() {
        this.initHobbyFilter();
        this.initHobbyAnimations();
    }

    /**
     * Initialize hobby filtering
     */
    initHobbyFilter() {
        const filterButtons = $$('.filter-btn');
        const hobbyCards = $$('.hobby-card');

        if (!filterButtons.length || !hobbyCards.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter cards with animation
                hobbyCards.forEach((card, index) => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px) scale(0.9)';

                        setTimeout(() => {
                            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px) scale(0.95)';

                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /**
     * Initialize hobby animations
     */
    initHobbyAnimations() {
        // Initial animation for hobby cards
        setTimeout(() => {
            const hobbyCards = $$('.hobby-card');
            hobbyCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px) scale(0.9)';

                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            });
        }, 100);
    }

    /**
     * Initialize collapsible sections (placeholder)
     */
    initCollapsibleSections() {
        console.log('📋 Collapsible sections functionality loaded');
    }

    /**
     * Initialize hobby interactive features (placeholder)
     */
    initHobbyInteractive() {
        console.log('🎮 Interactive features loaded');
    }
}

// Utility function for module queries (used in conditional loading)
function $$(selector) {
    return document.querySelectorAll(selector);
}

// Initialize the application
const app = new AppLoader();

// Expose app instance for debugging
if (typeof window !== 'undefined') {
    window.AppLoader = app;
    
    // Add debug information
    console.log(`🚀 App initialized for page type: ${app.getPageType()}`);
    
    // Log loaded modules after a delay to catch async loads
    setTimeout(() => {
        console.log('📦 Loaded modules:', app.getLoadedModules());
    }, 1000);
}

// AppLoader is now available globally
