/**
 * Blog Enhancements - Advanced Search, Filtering, and Mobile Experience
 * Comprehensive functionality for the blog page
 */

class BlogEnhancements {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentCategory = 'all';
        this.currentTag = 'all';
        this.searchQuery = '';
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.cachePosts();
        this.bindEvents();
        this.initializeFilters();
        this.setupMobileEnhancements();
        this.setupPerformanceOptimizations();
    }

    // Cache all posts for efficient filtering
    cachePosts() {
        const postElements = document.querySelectorAll('.blog-card');
        this.posts = Array.from(postElements).map(element => ({
            element: element,
            title: element.querySelector('h2 a')?.textContent.toLowerCase() || '',
            excerpt: element.querySelector('.excerpt')?.textContent.toLowerCase() || '',
            category: element.dataset.category || '',
            tags: this.extractTags(element),
            date: element.querySelector('.date')?.textContent || ''
        }));
        this.filteredPosts = [...this.posts];
    }

    extractTags(element) {
        // Extract tags from data attributes or content
        const tagsAttr = element.dataset.tags;
        if (tagsAttr) {
            return tagsAttr.split(',').map(tag => tag.trim().toLowerCase());
        }
        return [];
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('blog-search');
        const searchClear = document.getElementById('search-clear');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
            searchInput.addEventListener('focus', this.handleSearchFocus.bind(this));
            searchInput.addEventListener('blur', this.handleSearchBlur.bind(this));
        }

        if (searchClear) {
            searchClear.addEventListener('click', this.clearSearch.bind(this));
        }

        // Category filters
        const categoryBtns = document.querySelectorAll('.filter-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', this.handleCategoryFilter.bind(this));
        });

        // Tag filters
        const tagBtns = document.querySelectorAll('.tag-filter-btn');
        tagBtns.forEach(btn => {
            btn.addEventListener('click', this.handleTagFilter.bind(this));
        });

        // Mobile touch events
        this.setupTouchEvents();

        // Social sharing
        this.setupSocialSharing();
    }

    // Debounce function for search performance
    debounce(func, wait) {
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

    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase().trim();
        this.updateSearchClearButton();
        this.filterPosts();
    }

    handleSearchFocus(event) {
        event.target.parentElement.classList.add('focused');
    }

    handleSearchBlur(event) {
        event.target.parentElement.classList.remove('focused');
    }

    updateSearchClearButton() {
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            if (this.searchQuery) {
                clearBtn.classList.add('visible');
            } else {
                clearBtn.classList.remove('visible');
            }
        }
    }

    clearSearch() {
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.value = '';
            this.searchQuery = '';
            this.updateSearchClearButton();
            this.filterPosts();
            searchInput.focus();
        }
    }

    handleCategoryFilter(event) {
        const btn = event.target;
        const category = btn.dataset.filter;
        
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.currentCategory = category;
        this.filterPosts();
    }

    handleTagFilter(event) {
        const btn = event.target;
        const tag = btn.dataset.tag;
        
        // Update active state
        document.querySelectorAll('.tag-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.currentTag = tag;
        this.filterPosts();
    }

    filterPosts() {
        this.showLoadingState();
        
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
            this.filteredPosts = this.posts.filter(post => {
                // Category filter
                if (this.currentCategory !== 'all' && post.category !== this.currentCategory) {
                    return false;
                }
                
                // Tag filter
                if (this.currentTag !== 'all' && !post.tags.includes(this.currentTag.toLowerCase())) {
                    return false;
                }
                
                // Search filter
                if (this.searchQuery) {
                    const searchMatch = post.title.includes(this.searchQuery) || 
                                      post.excerpt.includes(this.searchQuery);
                    if (!searchMatch) {
                        return false;
                    }
                }
                
                return true;
            });
            
            this.updatePostsDisplay();
            this.updateResultsCount();
            this.hideLoadingState();
        });
    }

    updatePostsDisplay() {
        const visiblePosts = new Set(this.filteredPosts.map(post => post.element));
        
        this.posts.forEach(post => {
            const element = post.element;
            
            if (visiblePosts.has(element)) {
                element.classList.remove('filtering-out', 'hidden');
                element.classList.add('search-highlight');
                
                // Remove highlight after animation
                setTimeout(() => {
                    element.classList.remove('search-highlight');
                }, 300);
            } else {
                element.classList.add('filtering-out');
                
                // Hide after animation completes
                setTimeout(() => {
                    element.classList.add('hidden');
                    element.classList.remove('filtering-out');
                }, 300);
            }
        });
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = this.filteredPosts.length;
        }
    }

    showLoadingState() {
        this.isLoading = true;
        document.querySelectorAll('.blog-card').forEach(card => {
            card.classList.add('loading');
        });
    }

    hideLoadingState() {
        this.isLoading = false;
        setTimeout(() => {
            document.querySelectorAll('.blog-card').forEach(card => {
                card.classList.remove('loading');
            });
        }, 150);
    }

    initializeFilters() {
        // Set initial state
        this.filterPosts();
    }

    // Mobile enhancements
    setupMobileEnhancements() {
        // Touch-friendly interactions
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            this.setupSwipeGestures();
        }
        
        // Responsive search behavior
        this.setupResponsiveSearch();
    }

    setupTouchEvents() {
        const cards = document.querySelectorAll('.blog-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            card.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        });
    }

    handleTouchStart(event) {
        event.currentTarget.classList.add('touch-active');
    }

    handleTouchEnd(event) {
        setTimeout(() => {
            event.currentTarget.classList.remove('touch-active');
        }, 150);
    }

    setupSwipeGestures() {
        // Add swipe gesture support for mobile navigation
        let startX, startY, distX, distY;
        const threshold = 100;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            distX = e.changedTouches[0].clientX - startX;
            distY = e.changedTouches[0].clientY - startY;
            
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    this.handleSwipeRight();
                } else {
                    this.handleSwipeLeft();
                }
            }
            
            startX = startY = null;
        }, { passive: true });
    }

    handleSwipeRight() {
        // Cycle through category filters
        const activeBtn = document.querySelector('.filter-btn.active');
        const nextBtn = activeBtn?.nextElementSibling;
        if (nextBtn && nextBtn.classList.contains('filter-btn')) {
            nextBtn.click();
        }
    }

    handleSwipeLeft() {
        // Cycle through category filters (reverse)
        const activeBtn = document.querySelector('.filter-btn.active');
        const prevBtn = activeBtn?.previousElementSibling;
        if (prevBtn && prevBtn.classList.contains('filter-btn')) {
            prevBtn.click();
        }
    }

    setupResponsiveSearch() {
        const searchInput = document.getElementById('blog-search');
        if (!searchInput) return;
        
        // Auto-expand search on mobile when focused
        if (window.innerWidth <= 768) {
            searchInput.addEventListener('focus', () => {
                searchInput.parentElement.classList.add('mobile-expanded');
            });
            
            searchInput.addEventListener('blur', () => {
                if (!searchInput.value) {
                    searchInput.parentElement.classList.remove('mobile-expanded');
                }
            });
        }
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize scroll performance
        this.setupScrollOptimization();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupScrollOptimization() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Add scroll-based enhancements here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Social sharing functionality
    setupSocialSharing() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', this.toggleShareDropdown.bind(this));
        });

        const shareLinks = document.querySelectorAll('.share-link');
        shareLinks.forEach(link => {
            link.addEventListener('click', this.handleShare.bind(this));
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', this.closeShareDropdowns.bind(this));
    }

    toggleShareDropdown(event) {
        event.stopPropagation();
        const dropdown = event.target.closest('.social-share').querySelector('.share-dropdown');
        const isOpen = dropdown.classList.contains('show');

        // Close all other dropdowns
        this.closeShareDropdowns();

        // Toggle current dropdown
        if (!isOpen) {
            dropdown.classList.add('show');
        }
    }

    closeShareDropdowns() {
        document.querySelectorAll('.share-dropdown').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    handleShare(event) {
        event.preventDefault();
        const platform = event.target.dataset.platform;
        const shareContainer = event.target.closest('.social-share');
        const title = shareContainer.dataset.title;
        const url = shareContainer.dataset.url;

        switch (platform) {
            case 'twitter':
                this.shareToTwitter(title, url);
                break;
            case 'linkedin':
                this.shareToLinkedIn(title, url);
                break;
            case 'facebook':
                this.shareToFacebook(url);
                break;
            case 'copy':
                this.copyToClipboard(url);
                break;
        }

        // Close dropdown after sharing
        this.closeShareDropdowns();
    }

    shareToTwitter(title, url) {
        const text = encodeURIComponent(`${title} ${url}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'width=600,height=400');
    }

    shareToLinkedIn(title, url) {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`, '_blank', 'width=600,height=400');
    }

    shareToFacebook(url) {
        const encodedUrl = encodeURIComponent(url);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
    }

    async copyToClipboard(url) {
        try {
            await navigator.clipboard.writeText(url);
            this.showCopyFeedback('Link copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyFeedback('Link copied to clipboard!');
        }
    }

    showCopyFeedback(message) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #22c55e;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
}

// Add CSS animations for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogEnhancements();
});
