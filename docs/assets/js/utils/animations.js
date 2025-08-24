// Animation Utilities
// Shared animation functions used across the site

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
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

/**
 * Intersection Observer for scroll reveal animations
 * @param {NodeList} elements - Elements to observe
 * @param {Object} options - Observer options
 * @param {string} activeClass - Class to add when element is visible
 */
export function createScrollRevealObserver(elements, options = {}, activeClass = 'revealed') {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(activeClass);
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    elements.forEach(element => {
        observer.observe(element);
    });

    return observer;
}

/**
 * Animate progress bars when they come into view
 * @param {NodeList} progressBars - Progress bar elements
 */
export function animateProgressBars(progressBars) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/**
 * Staggered animation for card elements
 * @param {NodeList} cards - Card elements to animate
 * @param {Object} options - Animation options
 */
export function animateCardsIn(cards, options = {}) {
    const {
        delay = 150,
        duration = '0.6s',
        easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        initialTransform = 'translateY(50px) scale(0.9)',
        finalTransform = 'translateY(0) scale(1)'
    } = options;

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = initialTransform;
        
        setTimeout(() => {
            card.style.transition = `all ${duration} ${easing}`;
            card.style.opacity = '1';
            card.style.transform = finalTransform;
        }, index * delay);
    });
}

/**
 * Show card with animation
 * @param {Element} card - Card element
 * @param {number} index - Index for stagger delay
 * @param {Object} options - Animation options
 */
export function showCard(card, index = 0, options = {}) {
    const {
        delay = 100,
        duration = '0.4s',
        easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    } = options;

    card.style.display = 'block';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    
    setTimeout(() => {
        card.style.transition = `all ${duration} ${easing}`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, index * delay);
}

/**
 * Hide card with animation
 * @param {Element} card - Card element
 * @param {Object} options - Animation options
 */
export function hideCard(card, options = {}) {
    const {
        duration = '0.3s',
        easing = 'ease',
        callback = null
    } = options;

    card.style.transition = `all ${duration} ${easing}`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        card.style.display = 'none';
        if (callback) callback();
    }, parseFloat(duration) * 1000);
}

/**
 * Smooth scroll to element
 * @param {Element} target - Target element
 * @param {number} offset - Offset from top
 */
export function smoothScrollTo(target, offset = 20) {
    if (!target) return;
    
    const offsetTop = target.offsetTop - offset;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

/**
 * Add CSS keyframes dynamically
 * @param {string} name - Animation name
 * @param {string} keyframes - CSS keyframes
 */
export function addCSSAnimation(name, keyframes) {
    const style = document.createElement('style');
    style.textContent = `@keyframes ${name} { ${keyframes} }`;
    document.head.appendChild(style);
}

/**
 * Create floating background elements
 * @param {Element} container - Container element
 * @param {Array} items - Array of items to float
 * @param {number} count - Number of elements to create
 */
export function createFloatingElements(container, items, count = 7) {
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'floating-bg';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.fontSize = `${Math.random() * 5 + 3}rem`;
        el.style.animationDuration = `${Math.random() * 10 + 10}s`;
        el.style.animationDelay = `-${Math.random() * 10}s`;
        container.appendChild(el);
    }
}
