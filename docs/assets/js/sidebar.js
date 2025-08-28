/**
 * Sidebar Navigation Component
 * Handles mobile toggle, section expansion, and theme switching
 */

class SidebarNavigation {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebar-toggle');
        this.sidebarOverlay = document.getElementById('sidebar-overlay');
        this.themeToggle = document.getElementById('theme-toggle');
        
        this.isOpen = false;
        this.expandedSections = new Set();
        
        this.init();
    }

    init() {
        if (!this.sidebar) return;

        this.bindEvents();
        this.initializeSections();
        this.initializeTheme();
        this.handleResize();
    }

    bindEvents() {
        // Mobile toggle
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Overlay click to close
        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }

        // Section toggles
        const sectionToggles = this.sidebar.querySelectorAll('.nav-section-toggle');
        sectionToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => this.toggleSection(e));
        });

        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());

        // Close sidebar when clicking nav links on mobile
        const navLinks = this.sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    this.closeSidebar();
                }
            });
        });
    }

    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        this.isOpen = true;
        this.sidebar.classList.add('is-open');
        this.sidebarOverlay.classList.add('is-active');
        this.sidebarToggle.classList.add('is-active');
        
        // Prevent body scroll on mobile
        if (window.innerWidth < 1024) {
            document.body.style.overflow = 'hidden';
        }
        
        // Focus management
        this.sidebar.setAttribute('aria-expanded', 'true');
    }

    closeSidebar() {
        this.isOpen = false;
        this.sidebar.classList.remove('is-open');
        this.sidebarOverlay.classList.remove('is-active');
        this.sidebarToggle.classList.remove('is-active');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Focus management
        this.sidebar.setAttribute('aria-expanded', 'false');
    }

    toggleSection(event) {
        const toggle = event.currentTarget;
        const sectionName = toggle.dataset.section;
        const subsection = document.getElementById(`${sectionName}-nav`);
        const arrow = toggle.querySelector('.nav-arrow');

        if (!subsection) return;

        if (this.expandedSections.has(sectionName)) {
            // Collapse section
            this.expandedSections.delete(sectionName);
            subsection.classList.remove('is-expanded');
            toggle.classList.remove('is-expanded');
            toggle.setAttribute('aria-expanded', 'false');
            
            // Store collapsed state
            localStorage.setItem(`sidebar-${sectionName}`, 'collapsed');
        } else {
            // Expand section
            this.expandedSections.add(sectionName);
            subsection.classList.add('is-expanded');
            toggle.classList.add('is-expanded');
            toggle.setAttribute('aria-expanded', 'true');
            
            // Store expanded state
            localStorage.setItem(`sidebar-${sectionName}`, 'expanded');
        }
    }

    initializeSections() {
        // Restore section states from localStorage
        const sections = ['projects', 'hobbies', 'blog'];
        
        sections.forEach(sectionName => {
            const savedState = localStorage.getItem(`sidebar-${sectionName}`);
            const toggle = document.querySelector(`[data-section="${sectionName}"]`);
            const subsection = document.getElementById(`${sectionName}-nav`);
            
            if (toggle && subsection) {
                if (savedState === 'expanded') {
                    this.expandedSections.add(sectionName);
                    subsection.classList.add('is-expanded');
                    toggle.classList.add('is-expanded');
                    toggle.setAttribute('aria-expanded', 'true');
                } else {
                    // Default to expanded for better UX
                    this.expandedSections.add(sectionName);
                    subsection.classList.add('is-expanded');
                    toggle.classList.add('is-expanded');
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle icon
        const themeIcon = this.themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: newTheme }
        }));
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle icon
        const themeIcon = this.themeToggle?.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                if (themeIcon) {
                    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                }
            }
        });
    }

    handleKeydown(event) {
        // ESC key closes sidebar on mobile
        if (event.key === 'Escape' && this.isOpen && window.innerWidth < 1024) {
            this.closeSidebar();
        }
        
        // Alt + M toggles sidebar
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            this.toggleSidebar();
        }
    }

    handleResize() {
        // Close sidebar on desktop resize
        if (window.innerWidth >= 1024 && this.isOpen) {
            this.closeSidebar();
        }
        
        // Restore body scroll on resize
        if (window.innerWidth >= 1024) {
            document.body.style.overflow = '';
        }
    }

    // Public API methods
    expandSection(sectionName) {
        const toggle = document.querySelector(`[data-section="${sectionName}"]`);
        if (toggle) {
            toggle.click();
        }
    }

    collapseSection(sectionName) {
        if (this.expandedSections.has(sectionName)) {
            const toggle = document.querySelector(`[data-section="${sectionName}"]`);
            if (toggle) {
                toggle.click();
            }
        }
    }

    highlightActiveProject(projectSlug) {
        // Remove existing highlights
        const activeLinks = this.sidebar.querySelectorAll('.nav-link.active');
        activeLinks.forEach(link => link.classList.remove('active'));
        
        // Add highlight to current project
        const projectLink = this.sidebar.querySelector(`a[href*="${projectSlug}"]`);
        if (projectLink) {
            projectLink.classList.add('active');
            
            // Ensure projects section is expanded
            this.expandSection('projects');
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sidebarNav = new SidebarNavigation();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SidebarNavigation;
}

// Utility functions for external use
window.SidebarUtils = {
    toggle: () => window.sidebarNav?.toggleSidebar(),
    open: () => window.sidebarNav?.openSidebar(),
    close: () => window.sidebarNav?.closeSidebar(),
    expandSection: (section) => window.sidebarNav?.expandSection(section),
    collapseSection: (section) => window.sidebarNav?.collapseSection(section),
    highlightProject: (slug) => window.sidebarNav?.highlightActiveProject(slug)
};
