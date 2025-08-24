// Blog Module
// Blog filtering and interaction functionality

import { ready, $, $$ } from '../utils/dom.js';
import { showCard, hideCard } from '../utils/animations.js';

/**
 * Initialize blog functionality
 */
export function initBlog() {
    ready(() => {
        initBlogFilter();
        initBlogAnimations();
    });
}

/**
 * Initialize blog post filtering
 */
function initBlogFilter() {
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
            filterBlogCards(blogCards, filter);
        });
    });
}

/**
 * Filter blog cards with smooth animations
 * @param {NodeList} cards - Blog card elements
 * @param {string} filter - Filter category
 */
function filterBlogCards(cards, filter) {
    cards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            showBlogCard(card, index);
        } else {
            hideBlogCard(card);
        }
    });
}

/**
 * Show blog card with animation
 * @param {Element} card - Card element
 * @param {number} index - Index for stagger delay
 */
function showBlogCard(card, index) {
    card.style.display = 'flex';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 50); // Stagger animation
}

/**
 * Hide blog card with animation
 * @param {Element} card - Card element
 */
function hideBlogCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

/**
 * Initialize blog card animations on load
 */
function initBlogAnimations() {
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
    addBlogCardHoverEffects(blogCards);
}

/**
 * Add hover effects to blog cards
 * @param {NodeList} cards - Blog card elements
 */
function addBlogCardHoverEffects(cards) {
    cards.forEach(card => {
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
 * Initialize blog search functionality
 */
export function initBlogSearch() {
    const searchInput = $('.blog-search');
    const blogCards = $$('.blog-card');
    
    if (!searchInput || !blogCards.length) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
            const tags = card.dataset.tags?.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          tags.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'translateY(10px)';
            }
        });
        
        // Update results count
        updateSearchResults(searchTerm, blogCards);
    });
    
    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    });
}

/**
 * Update search results count
 * @param {string} searchTerm - Current search term
 * @param {NodeList} cards - Blog card elements
 */
function updateSearchResults(searchTerm, cards) {
    let resultsContainer = $('.search-results-count');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-count';
        
        const searchInput = $('.blog-search');
        if (searchInput && searchInput.parentNode) {
            searchInput.parentNode.insertBefore(resultsContainer, searchInput.nextSibling);
        }
    }
    
    if (!searchTerm) {
        resultsContainer.textContent = '';
        return;
    }
    
    const visibleCards = Array.from(cards).filter(card => 
        card.style.opacity !== '0.3'
    );
    
    const count = visibleCards.length;
    const plural = count === 1 ? 'result' : 'results';
    resultsContainer.textContent = `${count} ${plural} found for "${searchTerm}"`;
}

/**
 * Initialize blog post reading progress
 */
export function initReadingProgress() {
    const progressBar = $('.reading-progress');
    const article = $('article, .post-content');
    
    if (!progressBar || !article) return;
    
    function updateProgress() {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const articleBottom = articleTop + articleHeight;
        const windowBottom = scrollTop + windowHeight;
        
        let progress = 0;
        
        if (scrollTop >= articleTop) {
            if (windowBottom >= articleBottom) {
                progress = 100;
            } else {
                const visibleHeight = windowBottom - articleTop;
                progress = (visibleHeight / articleHeight) * 100;
            }
        }
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress(); // Initial call
}

// Auto-initialize if this module is loaded directly
if (typeof window !== 'undefined') {
    initBlog();
}
