// Hobby Filter Module
// Filtering and search functionality for hobby pages

import { $, $$, forceReflow } from '../../utils/dom.js';
import { showCard, hideCard, animateCardsIn } from '../../utils/animations.js';

/**
 * Initialize hobby filtering functionality
 */
export function initHobbyFilter() {
    initFilterButtons();
    initSearchFunctionality();
    initKeyboardNavigation();
    initHoverEffects();
    
    // Initialize with animation
    setTimeout(() => {
        const hobbyCards = $$('.hobby-card');
        if (hobbyCards.length) {
            animateCardsIn(hobbyCards, { delay: 150 });
        }
    }, 100);
}

/**
 * Initialize filter buttons
 */
function initFilterButtons() {
    const filterButtons = $$('.filter-btn');
    const hobbyCards = $$('.hobby-card');
    
    if (!filterButtons.length || !hobbyCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterHobbies(filter, filterButtons, hobbyCards);
        });
    });
}

/**
 * Filter hobbies with animation
 * @param {string} filter - Filter category
 * @param {NodeList} filterButtons - Filter button elements
 * @param {NodeList} hobbyCards - Hobby card elements
 */
function filterHobbies(filter, filterButtons, hobbyCards) {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Filter cards with staggered animation
    hobbyCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            showHobbyCard(card, index);
        } else {
            hideHobbyCard(card);
        }
    });
    
    // Update grid layout after animation
    setTimeout(() => {
        updateGridLayout();
    }, 400);
}

/**
 * Show hobby card with animation
 * @param {Element} card - Card element
 * @param {number} index - Index for stagger delay
 */
function showHobbyCard(card, index) {
    card.style.display = 'block';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, index * 100);
}

/**
 * Hide hobby card with animation
 * @param {Element} card - Card element
 */
function hideHobbyCard(card) {
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

/**
 * Update grid layout
 */
function updateGridLayout() {
    const grid = $('.hobbies-grid');
    if (grid) {
        forceReflow(grid);
    }
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchInput = $('.hobby-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        performHobbySearch(searchTerm);
    });
    
    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performHobbySearch('');
        }
    });
}

/**
 * Perform hobby search
 * @param {string} searchTerm - Search term
 */
function performHobbySearch(searchTerm) {
    const hobbyCards = $$('.hobby-card');
    
    hobbyCards.forEach(card => {
        const hobbyName = card.querySelector('h2, h3')?.textContent.toLowerCase() || '';
        const hobbyDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
        const hobbyTags = card.dataset.tags?.toLowerCase() || '';
        
        const matches = hobbyName.includes(searchTerm) || 
                       hobbyDescription.includes(searchTerm) ||
                       hobbyTags.includes(searchTerm);
        
        if (matches || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'translateY(10px) scale(0.98)';
        }
    });
    
    // Update search results count
    updateSearchResults(searchTerm, hobbyCards);
}

/**
 * Update search results count
 * @param {string} searchTerm - Current search term
 * @param {NodeList} cards - Hobby card elements
 */
function updateSearchResults(searchTerm, cards) {
    let resultsContainer = $('.search-results-count');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-count';
        
        const searchInput = $('.hobby-search');
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
    const plural = count === 1 ? 'hobby' : 'hobbies';
    resultsContainer.textContent = `${count} ${plural} found for "${searchTerm}"`;
}

/**
 * Initialize keyboard navigation for filters
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Number keys 1-4 for quick filter selection
        if (e.key >= '1' && e.key <= '4') {
            const filterButtons = $$('.filter-btn');
            const index = parseInt(e.key) - 1;
            if (filterButtons[index]) {
                filterButtons[index].click();
            }
        }
    });
}

/**
 * Initialize hover effects for better UX
 */
function initHoverEffects() {
    setTimeout(() => {
        addHoverEffects();
    }, 500);
}

/**
 * Add hover effects to hobby cards
 */
function addHoverEffects() {
    const hobbyCards = $$('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle scale effect for nearby cards
            const allCards = $$('.hobby-card');
            allCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.style.display !== 'none') {
                    otherCard.style.transform = 'scale(0.98)';
                    otherCard.style.opacity = '0.8';
                }
            });
            
            // Enhance the hovered card
            card.style.transform = 'scale(1.05) translateY(-5px)';
            card.style.zIndex = '10';
            card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset all cards
            const allCards = $$('.hobby-card');
            allCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
                otherCard.style.zIndex = '';
                otherCard.style.boxShadow = '';
            });
        });
    });
}
