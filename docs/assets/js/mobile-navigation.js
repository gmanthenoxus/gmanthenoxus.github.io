// Mobile Navigation Optimization
document.addEventListener('DOMContentLoaded', function() {
    optimizeNavigationForMobile();
    
    // Re-optimize on window resize
    window.addEventListener('resize', debounce(optimizeNavigationForMobile, 250));
});

function optimizeNavigationForMobile() {
    const navItems = document.querySelectorAll('.post-navigation .nav-prev, .post-navigation .nav-next');
    const isMobile = window.innerWidth <= 768;
    
    navItems.forEach(item => {
        optimizeNavItem(item, isMobile);
    });
}

function optimizeNavItem(navItem, isMobile) {
    // Get the original text (without arrows)
    let originalText = navItem.textContent.trim();
    
    // Remove arrow characters to get clean title
    originalText = originalText.replace(/^←\s*/, '').replace(/\s*→$/, '');
    
    // Store original text if not already stored
    if (!navItem.dataset.originalTitle) {
        navItem.dataset.originalTitle = originalText;
    }
    
    const originalTitle = navItem.dataset.originalTitle;
    let displayTitle = originalTitle;
    
    if (isMobile) {
        // Mobile truncation rules
        if (originalTitle.length > 30) {
            displayTitle = truncateTitle(originalTitle, 30);
        }
    } else {
        // Desktop truncation rules (more generous)
        if (originalTitle.length > 50) {
            displayTitle = truncateTitle(originalTitle, 50);
        }
    }
    
    // Update the navigation item content
    updateNavItemContent(navItem, displayTitle);
}

function truncateTitle(title, maxLength) {
    if (title.length <= maxLength) {
        return title;
    }
    
    // Try to truncate at word boundaries
    const words = title.split(' ');
    let truncated = '';
    
    for (let i = 0; i < words.length; i++) {
        const testString = truncated + (truncated ? ' ' : '') + words[i];
        if (testString.length <= maxLength - 3) { // -3 for ellipsis
            truncated = testString;
        } else {
            break;
        }
    }
    
    // If we couldn't fit any complete words, just truncate at character level
    if (!truncated) {
        truncated = title.substring(0, maxLength - 3);
    }
    
    return truncated + '...';
}

function updateNavItemContent(navItem, title) {
    const isNext = navItem.classList.contains('nav-next');
    const isPrev = navItem.classList.contains('nav-prev');
    
    // Create structured content with span for better styling
    if (isPrev) {
        navItem.innerHTML = `<span class="nav-arrow">←</span> <span class="nav-title">${title}</span>`;
    } else if (isNext) {
        navItem.innerHTML = `<span class="nav-title">${title}</span> <span class="nav-arrow">→</span>`;
    }
}

// Debounce function to limit resize event frequency
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

// Add hover effect to show full title on desktop
function addTitleTooltips() {
    const navItems = document.querySelectorAll('.post-navigation .nav-prev, .post-navigation .nav-next');
    
    navItems.forEach(item => {
        const originalTitle = item.dataset.originalTitle;
        const currentTitle = item.querySelector('.nav-title')?.textContent || '';
        
        // Only add tooltip if title is truncated
        if (originalTitle && originalTitle !== currentTitle.replace('...', '')) {
            item.title = originalTitle;
            item.setAttribute('aria-label', `Navigate to: ${originalTitle}`);
        }
    });
}

// Initialize tooltips after content is set
setTimeout(addTitleTooltips, 100);
