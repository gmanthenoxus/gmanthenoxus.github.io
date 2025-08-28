/**
 * Project Filtering System
 * Handles category and status filtering with smooth animations
 */

class ProjectFilter {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.statusButtons = document.querySelectorAll('.status-btn');
        this.projectsGrid = document.getElementById('projects-grid');
        this.emptyState = document.getElementById('empty-state');
        
        this.currentCategoryFilter = 'all';
        this.currentStatusFilter = 'all';
        
        this.init();
    }
    
    init() {
        if (!this.projectCards.length) {
            console.warn('No project cards found');
            return;
        }
        
        this.bindEvents();
        this.updateCounts();
        
        console.log('Project filter system initialized');
    }
    
    bindEvents() {
        // Category filter buttons
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.dataset.filter;
                this.setCategoryFilter(filter, button);
            });
        });
        
        // Status filter buttons
        this.statusButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const status = button.dataset.status;
                this.setStatusFilter(status, button);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.matches('.filter-btn, .status-btn')) {
                this.handleKeyboardNavigation(e);
            }
        });
    }
    
    setCategoryFilter(filter, button) {
        // Update active state
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        this.currentCategoryFilter = filter;
        this.applyFilters();
        
        // Announce to screen readers
        this.announceFilterChange(`Filtered by category: ${filter === 'all' ? 'All projects' : filter}`);
    }
    
    setStatusFilter(status, button) {
        // Update active state
        this.statusButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        
        this.currentStatusFilter = status;
        this.applyFilters();
        
        // Announce to screen readers
        this.announceFilterChange(`Filtered by status: ${status === 'all' ? 'All status' : status}`);
    }
    
    applyFilters() {
        let visibleCount = 0;
        
        this.projectCards.forEach(card => {
            const shouldShow = this.shouldShowCard(card);
            
            if (shouldShow) {
                this.showCard(card);
                visibleCount++;
            } else {
                this.hideCard(card);
            }
        });
        
        // Show/hide empty state
        this.toggleEmptyState(visibleCount === 0);
        
        // Update URL without page reload
        this.updateURL();
        
        // Update counts
        this.updateCounts();
    }
    
    shouldShowCard(card) {
        const cardHobby = card.dataset.hobby;
        const cardStatus = card.dataset.status || 'completed';
        
        // Check category filter
        const categoryMatch = this.currentCategoryFilter === 'all' || cardHobby === this.currentCategoryFilter;
        
        // Check status filter
        const statusMatch = this.currentStatusFilter === 'all' || cardStatus === this.currentStatusFilter;
        
        return categoryMatch && statusMatch;
    }
    
    showCard(card) {
        card.classList.remove('filtered-out', 'filtering-out');
        card.classList.add('filtering-in');
        card.style.display = 'block';
        
        // Remove animation class after animation completes
        setTimeout(() => {
            card.classList.remove('filtering-in');
        }, 300);
    }
    
    hideCard(card) {
        card.classList.add('filtering-out');
        card.classList.remove('filtering-in');
        
        // Hide after animation completes
        setTimeout(() => {
            card.style.display = 'none';
            card.classList.add('filtered-out');
            card.classList.remove('filtering-out');
        }, 300);
    }
    
    toggleEmptyState(show) {
        if (this.emptyState) {
            this.emptyState.style.display = show ? 'block' : 'none';
        }
    }
    
    updateCounts() {
        this.filterButtons.forEach(button => {
            const filter = button.dataset.filter;
            const countElement = button.querySelector('.filter-count');
            
            if (countElement && filter !== 'all') {
                const count = this.getFilteredCount(filter, this.currentStatusFilter);
                countElement.textContent = count;
            }
        });
    }
    
    getFilteredCount(categoryFilter, statusFilter) {
        return Array.from(this.projectCards).filter(card => {
            const cardHobby = card.dataset.hobby;
            const cardStatus = card.dataset.status || 'completed';
            
            const categoryMatch = categoryFilter === 'all' || cardHobby === categoryFilter;
            const statusMatch = statusFilter === 'all' || cardStatus === statusFilter;
            
            return categoryMatch && statusMatch;
        }).length;
    }
    
    updateURL() {
        const params = new URLSearchParams();
        
        if (this.currentCategoryFilter !== 'all') {
            params.set('category', this.currentCategoryFilter);
        }
        
        if (this.currentStatusFilter !== 'all') {
            params.set('status', this.currentStatusFilter);
        }
        
        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
            
        window.history.replaceState({}, '', newURL);
    }
    
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const categoryFilter = params.get('category') || 'all';
        const statusFilter = params.get('status') || 'all';
        
        // Set category filter
        const categoryButton = document.querySelector(`[data-filter="${categoryFilter}"]`);
        if (categoryButton) {
            this.setCategoryFilter(categoryFilter, categoryButton);
        }
        
        // Set status filter
        const statusButton = document.querySelector(`[data-status="${statusFilter}"]`);
        if (statusButton) {
            this.setStatusFilter(statusFilter, statusButton);
        }
    }
    
    handleKeyboardNavigation(e) {
        const buttons = e.target.matches('.filter-btn') ? 
            Array.from(this.filterButtons) : 
            Array.from(this.statusButtons);
            
        const currentIndex = buttons.indexOf(e.target);
        let nextIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                buttons[nextIndex].focus();
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                buttons[nextIndex].focus();
                break;
                
            case 'Home':
                e.preventDefault();
                buttons[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                buttons[buttons.length - 1].focus();
                break;
        }
    }
    
    announceFilterChange(message) {
        // Create temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Public method to reset all filters
    resetFilters() {
        const allCategoryButton = document.querySelector('[data-filter="all"]');
        const allStatusButton = document.querySelector('[data-status="all"]');
        
        if (allCategoryButton) {
            this.setCategoryFilter('all', allCategoryButton);
        }
        
        if (allStatusButton) {
            this.setStatusFilter('all', allStatusButton);
        }
    }
    
    // Public method to filter by specific category
    filterByCategory(category) {
        const button = document.querySelector(`[data-filter="${category}"]`);
        if (button) {
            this.setCategoryFilter(category, button);
        }
    }
    
    // Public method to filter by specific status
    filterByStatus(status) {
        const button = document.querySelector(`[data-status="${status}"]`);
        if (button) {
            this.setStatusFilter(status, button);
        }
    }
}

// Global function for reset button
function resetFilters() {
    if (window.projectFilter) {
        window.projectFilter.resetFilters();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-page')) {
        window.projectFilter = new ProjectFilter();
        
        // Load filters from URL on page load
        window.projectFilter.loadFromURL();
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    if (window.projectFilter) {
        window.projectFilter.loadFromURL();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectFilter;
}
