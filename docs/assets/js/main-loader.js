// Main Module Loader
// Conditionally loads JavaScript modules based on page type and content

import { ready, $ } from './utils/dom.js';

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
    async loadCoreModules() {
        try {
            // Always load navigation
            const { initNavigation, initMainNavigation, initBreadcrumbs } = await import('./modules/navigation.js');
            initNavigation();
            initMainNavigation();
            initBreadcrumbs();
            this.loadedModules.add('navigation');
            
            console.log('✅ Core modules loaded');
        } catch (error) {
            console.error('❌ Error loading core modules:', error);
        }
    }
    
    /**
     * Load page-specific modules
     */
    async loadPageSpecificModules() {
        try {
            switch (this.pageType) {
                case 'homepage':
                    await this.loadHomepageModules();
                    break;
                    
                case 'blog':
                case 'post':
                    await this.loadBlogModules();
                    break;
                    
                case 'hobby':
                    await this.loadHobbyModules();
                    break;
                    
                case 'hobbies-index':
                    await this.loadHobbiesIndexModules();
                    break;
                    
                default:
                    console.log(`📄 Default page type: ${this.pageType}`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${this.pageType} modules:`, error);
        }
    }
    
    /**
     * Load homepage-specific modules
     */
    async loadHomepageModules() {
        const { initHomepage } = await import('./modules/homepage.js');
        initHomepage();
        this.loadedModules.add('homepage');
        console.log('🏠 Homepage modules loaded');
    }
    
    /**
     * Load blog-specific modules
     */
    async loadBlogModules() {
        const { initBlog, initBlogSearch, initReadingProgress } = await import('./modules/blog.js');
        
        initBlog();
        
        // Load additional features if elements exist
        if ($('.blog-search')) {
            initBlogSearch();
        }
        
        if ($('.reading-progress') || $('.post-content')) {
            initReadingProgress();
        }
        
        this.loadedModules.add('blog');
        console.log('📝 Blog modules loaded');
    }
    
    /**
     * Load hobby page modules
     */
    async loadHobbyModules() {
        const { initHobbies } = await import('./modules/hobbies/index.js');
        initHobbies();
        this.loadedModules.add('hobbies');
        console.log('🎯 Hobby modules loaded');
    }
    
    /**
     * Load hobbies index page modules
     */
    async loadHobbiesIndexModules() {
        const { initHobbyFilter } = await import('./modules/hobbies/filter.js');
        const { initHobbyAnimations } = await import('./modules/hobbies/animations.js');
        
        initHobbyFilter();
        initHobbyAnimations();
        
        this.loadedModules.add('hobbies-index');
        console.log('🎯 Hobbies index modules loaded');
    }
    
    /**
     * Load conditional modules based on page content
     */
    async loadConditionalModules() {
        // Load collapsible sections if present
        if ($$('.tldr-box, .results-preview, .prerequisites-box, .tools-needed, .collapsible-section').length) {
            try {
                const { initCollapsibleSections } = await import('./modules/hobbies/collapsible.js');
                initCollapsibleSections();
                this.loadedModules.add('collapsible');
                console.log('📋 Collapsible sections loaded');
            } catch (error) {
                console.error('❌ Error loading collapsible sections:', error);
            }
        }
        
        // Load interactive features if present
        if ($$('.trivia-card, .fact-share-btn, .expandable-card').length) {
            try {
                const { initHobbyInteractive } = await import('./modules/hobbies/interactive.js');
                initHobbyInteractive();
                this.loadedModules.add('interactive');
                console.log('🎮 Interactive features loaded');
            } catch (error) {
                console.error('❌ Error loading interactive features:', error);
            }
        }
        
        // Load animation features if present
        if ($$('.scroll-reveal, .progress-fill, .floating-element').length) {
            try {
                const { initFloatingAnimation, initStaggeredAnimations, initCounterAnimations } = await import('./modules/hobbies/animations.js');
                
                if ($('.floating-element')) initFloatingAnimation();
                if ($('.staggered-list')) initStaggeredAnimations();
                if ($('.counter')) initCounterAnimations();
                
                console.log('✨ Animation features loaded');
            } catch (error) {
                console.error('❌ Error loading animation features:', error);
            }
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

export default AppLoader;
