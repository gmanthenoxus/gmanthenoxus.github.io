/**
 * Blog Manager - Clean, focused blog functionality
 * Simplified approach with essential features only
 */

class BlogManager {
    constructor() {
        this.posts = [];
        this.originalPosts = [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.currentSort = 'date-desc';
        this.currentView = 'grid';
        this.searchTimeout = null;

        this.init();
    }

    init() {
        this.cachePosts();
        this.bindEvents();
        this.setupMobileEnhancements();
        this.initializeAnimations();
        // Apply initial sort and filter
        this.sortAndFilterPosts();
    }

    // Cache posts for efficient filtering
    cachePosts() {
        const postElements = document.querySelectorAll('.post-card');
        this.posts = Array.from(postElements).map(element => ({
            element: element,
            title: element.querySelector('h3')?.textContent.toLowerCase() || '',
            excerpt: element.querySelector('p')?.textContent.toLowerCase() || '',
            category: element.dataset.category || 'general'
        }));
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

        // Category filtering
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', this.handleCategoryFilter.bind(this));
            // Load saved category preference
            const savedCategory = localStorage.getItem('blog-category-preference');
            if (savedCategory) {
                categoryFilter.value = savedCategory;
                this.currentCategory = savedCategory;
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Clear filters button
        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', this.clearAllFilters.bind(this));
        }

        // Sort controls
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', this.handleSortChange.bind(this));
            // Load saved sort preference
            const savedSort = localStorage.getItem('blog-sort-preference');
            if (savedSort) {
                sortSelect.value = savedSort;
                this.currentSort = savedSort;
            }
        }

        // View controls
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', this.handleViewChange.bind(this));
        });

        // Load saved view preference
        const savedView = localStorage.getItem('blog-view-preference');
        if (savedView) {
            this.currentView = savedView;
            this.updateViewControls();
            this.applyView();
        }
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

        // Add search loading state
        const searchWrapper = event.target.closest('.search-wrapper');
        if (this.searchQuery) {
            searchWrapper.classList.add('search-loading');
        } else {
            searchWrapper.classList.remove('search-loading');
        }

        // Clear any existing search timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Add slight delay for better UX
        this.searchTimeout = setTimeout(() => {
            this.filterPosts();
        }, 200);
    }

    handleSearchFocus(event) {
        event.target.closest('.search-wrapper').classList.add('focused');
    }

    handleSearchBlur(event) {
        event.target.closest('.search-wrapper').classList.remove('focused');
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
        const category = event.target.value;
        this.currentCategory = category;
        localStorage.setItem('blog-category-preference', category);
        this.filterPosts();
    }

    filterPosts() {
        // Show enhanced loading state
        this.showEnhancedLoadingState();

        // Use requestAnimationFrame for smooth performance
        requestAnimationFrame(() => {
            // Add slight delay for better UX (shows loading state)
            setTimeout(() => {
                this.sortAndFilterPosts();

                // Hide loading state after animation completes
                setTimeout(() => this.hideEnhancedLoadingState(), 200);
            }, 100);
        });
    }

    updatePostsDisplay(filteredPosts) {
        const postsGrid = document.getElementById('posts-grid');
        const searchEmpty = document.getElementById('search-empty');

        if (!postsGrid) return;

        // Hide all current posts with smooth animation
        const currentPosts = postsGrid.querySelectorAll('.post-card:not(.hidden)');
        const animationPromises = [];

        currentPosts.forEach((post, index) => {
            const promise = new Promise(resolve => {
                setTimeout(() => {
                    post.classList.add('filtering-out');
                    setTimeout(() => {
                        post.classList.add('hidden');
                        post.classList.remove('filtering-out');
                        resolve();
                    }, 400);
                }, index * 30); // Stagger hide animation
            });
            animationPromises.push(promise);
        });

        // Wait for hide animations to complete, then show filtered posts
        Promise.all(animationPromises).then(() => {
            // Reorder DOM elements to match sort order
            filteredPosts.forEach(post => {
                postsGrid.appendChild(post.element);
            });

            // Show filtered posts with staggered animation
            filteredPosts.forEach((post, index) => {
                const element = post.element;

                setTimeout(() => {
                    element.classList.remove('filtering-out', 'hidden');
                    element.classList.add('filtering-in');

                    // Add subtle highlight for search results
                    if (this.searchQuery) {
                        setTimeout(() => {
                            element.classList.add('search-highlight');
                            setTimeout(() => {
                                element.classList.remove('search-highlight');
                            }, 1200);
                        }, 300);
                    }

                    // Remove filtering-in class after animation
                    setTimeout(() => {
                        element.classList.remove('filtering-in');
                    }, 600);

                }, index * 80); // Stagger show animation
            });
        });

        // Show/hide search empty state
        if (searchEmpty) {
            setTimeout(() => {
                if (filteredPosts.length === 0 && (this.searchQuery || this.currentCategory !== 'all')) {
                    searchEmpty.style.display = 'block';
                    searchEmpty.style.opacity = '0';
                    setTimeout(() => {
                        searchEmpty.style.transition = 'opacity 0.3s ease';
                        searchEmpty.style.opacity = '1';
                    }, 100);
                } else {
                    searchEmpty.style.opacity = '0';
                    setTimeout(() => {
                        searchEmpty.style.display = 'none';
                    }, 300);
                }
            }, 200);
        }
    }

    updateResultsCount(count) {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    showLoadingState() {
        document.querySelectorAll('.post-card').forEach(card => {
            card.classList.add('loading');
        });
    }

    hideLoadingState() {
        document.querySelectorAll('.post-card').forEach(card => {
            card.classList.remove('loading');
        });
    }

    showEnhancedLoadingState() {
        const postsGrid = document.getElementById('posts-grid');
        const postsCards = document.querySelectorAll('.post-card');

        // Add loading class to grid for overlay
        if (postsGrid) {
            postsGrid.classList.add('loading');
        }

        // Add loading class to individual cards for skeleton effect
        postsCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('loading');
            }, index * 50); // Stagger loading effect
        });

        // Update controls to show loading state
        this.updateControlsLoadingState(true);
    }

    hideEnhancedLoadingState() {
        const postsGrid = document.getElementById('posts-grid');
        const postsCards = document.querySelectorAll('.post-card');

        // Remove loading class from grid
        if (postsGrid) {
            postsGrid.classList.remove('loading');
        }

        // Remove loading class from cards
        postsCards.forEach(card => {
            card.classList.remove('loading');
        });

        // Update controls to normal state
        this.updateControlsLoadingState(false);
    }

    updateControlsLoadingState(isLoading) {
        const sortSelect = document.getElementById('sort-select');
        const categoryFilter = document.getElementById('category-filter');
        const viewBtns = document.querySelectorAll('.view-btn');

        [sortSelect, categoryFilter, ...viewBtns].forEach(control => {
            if (control) {
                control.disabled = isLoading;
                control.style.opacity = isLoading ? '0.6' : '1';
                control.style.pointerEvents = isLoading ? 'none' : 'auto';
            }
        });
    }

    updateSearchState(resultCount) {
        const searchWrapper = document.querySelector('.search-wrapper');
        if (!searchWrapper) return;

        // Remove previous states
        searchWrapper.classList.remove('has-results', 'no-results', 'search-loading');

        // Add appropriate state
        if (this.searchQuery) {
            if (resultCount > 0) {
                searchWrapper.classList.add('has-results');
            } else {
                searchWrapper.classList.add('no-results');
            }
        }
    }

    // Keyboard navigation support
    handleKeyboard(event) {
        // Escape key clears search
        if (event.key === 'Escape') {
            const searchInput = document.getElementById('blog-search');
            if (searchInput && searchInput === document.activeElement) {
                this.clearSearch();
            }
        }

        // Ctrl/Cmd + K focuses search
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('blog-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    // Mobile enhancements
    setupMobileEnhancements() {
        // Touch device detection
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }

        // Responsive search behavior
        const searchInput = document.getElementById('blog-search');
        if (searchInput && window.innerWidth <= 768) {
            searchInput.addEventListener('focus', () => {
                // Scroll to search on mobile focus
                searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }

        // Simple swipe detection for category navigation
        this.setupSwipeNavigation();
    }

    setupSwipeNavigation() {
        let startX, startY;
        const threshold = 100;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const distX = endX - startX;
            const distY = endY - startY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                if (distX > 0) {
                    this.cycleCategoryFilter(-1); // Swipe right - previous
                } else {
                    this.cycleCategoryFilter(1);  // Swipe left - next
                }
            }
            
            startX = startY = null;
        }, { passive: true });
    }

    cycleCategoryFilter(direction) {
        const buttons = Array.from(document.querySelectorAll('.category-btn'));
        const activeIndex = buttons.findIndex(btn => btn.classList.contains('active'));
        
        if (activeIndex === -1) return;
        
        let newIndex = activeIndex + direction;
        if (newIndex < 0) newIndex = buttons.length - 1;
        if (newIndex >= buttons.length) newIndex = 0;
        
        buttons[newIndex].click();
    }

    clearAllFilters() {
        // Clear search
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.value = '';
            this.searchQuery = '';
            this.updateSearchClearButton();
        }

        // Reset category to all
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = 'all';
        }
        this.currentCategory = 'all';

        // Filter posts
        this.filterPosts();
    }

    handleSortChange(event) {
        this.currentSort = event.target.value;
        localStorage.setItem('blog-sort-preference', this.currentSort);
        this.sortAndFilterPosts();
    }

    handleViewChange(event) {
        const btn = event.target.closest('.view-btn');
        const view = btn.dataset.view;

        if (view !== this.currentView) {
            this.currentView = view;
            localStorage.setItem('blog-view-preference', this.currentView);
            this.updateViewControls();
            this.applyView();
        }
    }

    updateViewControls() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === this.currentView);
        });
    }

    applyView() {
        const postsGrid = document.getElementById('posts-grid');
        if (postsGrid) {
            postsGrid.classList.toggle('list-view', this.currentView === 'list');
        }
    }

    sortPosts(posts) {
        const sortedPosts = [...posts];

        switch (this.currentSort) {
            case 'date-desc':
                return sortedPosts.sort((a, b) => {
                    const dateTextA = a.element.querySelector('.post-date')?.textContent || '';
                    const dateTextB = b.element.querySelector('.post-date')?.textContent || '';
                    // Parse dates like "Dec 15", "Jan 01", etc.
                    const dateA = new Date(dateTextA + ', 2024'); // Add year for parsing
                    const dateB = new Date(dateTextB + ', 2024');
                    return dateB - dateA;
                });

            case 'date-asc':
                return sortedPosts.sort((a, b) => {
                    const dateTextA = a.element.querySelector('.post-date')?.textContent || '';
                    const dateTextB = b.element.querySelector('.post-date')?.textContent || '';
                    const dateA = new Date(dateTextA + ', 2024');
                    const dateB = new Date(dateTextB + ', 2024');
                    return dateA - dateB;
                });

            case 'category':
                return sortedPosts.sort((a, b) => {
                    return a.category.localeCompare(b.category);
                });

            case 'read-time':
                return sortedPosts.sort((a, b) => {
                    const timeA = this.extractReadTime(a.element);
                    const timeB = this.extractReadTime(b.element);
                    return timeA - timeB;
                });

            default:
                return sortedPosts;
        }
    }

    extractReadTime(element) {
        const readTimeText = element.querySelector('.read-time')?.textContent || '5 min read';
        const match = readTimeText.match(/(\d+)/);
        return match ? parseInt(match[1]) : 5;
    }

    sortAndFilterPosts() {
        // Apply current filters
        let filteredPosts = this.posts.filter(post => {
            // Category filter
            if (this.currentCategory !== 'all' && post.category !== this.currentCategory) {
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

        // Apply sorting
        filteredPosts = this.sortPosts(filteredPosts);

        // Update display
        this.updatePostsDisplay(filteredPosts);
        this.updateResultsCount(filteredPosts.length);
        this.updateSearchState(filteredPosts.length);
    }

    initializeAnimations() {
        // Calculate reading times for posts
        this.calculateReadingTimes();

        // Add staggered entrance animation to posts
        this.posts.forEach((post, index) => {
            post.element.style.opacity = '0';
            post.element.style.transform = 'translateY(30px)';

            setTimeout(() => {
                post.element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                post.element.style.opacity = '1';
                post.element.style.transform = 'translateY(0)';
            }, index * 100 + 200); // Stagger by 100ms
        });

        // Add entrance animation to featured post
        const featuredPost = document.querySelector('.featured-post');
        if (featuredPost) {
            featuredPost.style.opacity = '0';
            featuredPost.style.transform = 'translateY(20px) scale(0.95)';

            setTimeout(() => {
                featuredPost.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                featuredPost.style.opacity = '1';
                featuredPost.style.transform = 'translateY(0) scale(1)';
            }, 100);
        }
    }

    calculateReadingTimes() {
        this.posts.forEach(post => {
            const excerpt = post.element.querySelector('p')?.textContent || '';
            const wordCount = excerpt.split(/\s+/).length;
            // Estimate full post length (excerpt is usually 10-15% of full post)
            const estimatedFullWordCount = Math.max(wordCount * 8, 200);
            // Average reading speed: 200 words per minute
            const readingTime = Math.max(Math.ceil(estimatedFullWordCount / 200), 1);

            const readTimeElement = post.element.querySelector('.read-time');
            if (readTimeElement && !readTimeElement.textContent.includes('min')) {
                readTimeElement.textContent = `${readingTime} min read`;
            }
        });
    }

    addEntranceAnimation(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Export for potential external use
window.BlogManager = BlogManager;
