// Hobby Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    initHobbyFilters();
});

function initHobbyFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    if (!filterButtons.length || !hobbyCards.length) return;
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterHobbies(filter, filterButtons, hobbyCards);
        });
    });
    
    // Initialize with animation
    setTimeout(() => {
        animateCardsIn(hobbyCards);
    }, 100);
}

function filterHobbies(filter, filterButtons, hobbyCards) {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Filter cards with animation
    hobbyCards.forEach((card, index) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            showCard(card, index);
        } else {
            hideCard(card);
        }
    });
    
    // Update grid layout
    updateGridLayout();
}

function showCard(card, index) {
    card.style.display = 'block';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, index * 100); // Stagger animation
}

function hideCard(card) {
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

function animateCardsIn(cards) {
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

function updateGridLayout() {
    const grid = document.querySelector('.hobbies-grid');
    if (grid) {
        // Force reflow to update grid layout
        grid.style.display = 'none';
        grid.offsetHeight; // Trigger reflow
        grid.style.display = 'grid';
    }
}

// Add search functionality
function addSearchFunctionality() {
    const searchInput = document.querySelector('.hobby-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const hobbyCards = document.querySelectorAll('.hobby-card');
        
        hobbyCards.forEach(card => {
            const hobbyName = card.querySelector('h2').textContent.toLowerCase();
            const hobbyDescription = card.querySelector('p').textContent.toLowerCase();
            const matches = hobbyName.includes(searchTerm) || hobbyDescription.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    });
}

// Initialize search if search input exists
setTimeout(addSearchFunctionality, 100);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const index = parseInt(e.key) - 1;
        if (filterButtons[index]) {
            filterButtons[index].click();
        }
    }
});

// Add hover effects for better UX
function addHoverEffects() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle scale effect for nearby cards
            const allCards = document.querySelectorAll('.hobby-card');
            allCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.transform = 'scale(0.98)';
                    otherCard.style.opacity = '0.8';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset all cards
            const allCards = document.querySelectorAll('.hobby-card');
            allCards.forEach(otherCard => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });
    });
}

// Initialize hover effects
setTimeout(addHoverEffects, 500);
