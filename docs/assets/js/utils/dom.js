// DOM Utilities
// Helper functions for DOM manipulation and queries

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Function to execute when DOM is ready
 */
export function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Query selector with optional context
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null} First matching element
 */
export function $(selector, context = document) {
    return context.querySelector(selector);
}

/**
 * Query selector all with optional context
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList} All matching elements
 */
export function $$(selector, context = document) {
    return context.querySelectorAll(selector);
}

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|Element} content - Element content
 * @returns {Element} Created element
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (typeof content === 'string') {
        element.innerHTML = content;
    } else if (content instanceof Element) {
        element.appendChild(content);
    }
    
    return element;
}

/**
 * Add event listener with optional delegation
 * @param {Element|string} target - Target element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {string} delegate - Delegation selector (optional)
 */
export function on(target, event, handler, delegate = null) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    if (delegate) {
        element.addEventListener(event, (e) => {
            const delegateTarget = e.target.closest(delegate);
            if (delegateTarget) {
                handler.call(delegateTarget, e);
            }
        });
    } else {
        element.addEventListener(event, handler);
    }
}

/**
 * Remove event listener
 * @param {Element|string} target - Target element or selector
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 */
export function off(target, event, handler) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    element.removeEventListener(event, handler);
}

/**
 * Toggle class on element
 * @param {Element|string} target - Target element or selector
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add/remove (optional)
 */
export function toggleClass(target, className, force = undefined) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    return element.classList.toggle(className, force);
}

/**
 * Add class to element
 * @param {Element|string} target - Target element or selector
 * @param {string} className - Class name to add
 */
export function addClass(target, className) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    element.classList.add(className);
}

/**
 * Remove class from element
 * @param {Element|string} target - Target element or selector
 * @param {string} className - Class name to remove
 */
export function removeClass(target, className) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;
    
    element.classList.remove(className);
}

/**
 * Check if element has class
 * @param {Element|string} target - Target element or selector
 * @param {string} className - Class name to check
 * @returns {boolean} Whether element has class
 */
export function hasClass(target, className) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return false;
    
    return element.classList.contains(className);
}

/**
 * Get element's offset position
 * @param {Element} element - Target element
 * @returns {Object} Position object with top and left
 */
export function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

/**
 * Check if element is in viewport
 * @param {Element} element - Target element
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} Whether element is visible
 */
export function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    
    return (vertInView && horInView);
}

/**
 * Animate element property
 * @param {Element} element - Target element
 * @param {Object} properties - Properties to animate
 * @param {number} duration - Animation duration in ms
 * @param {Function} easing - Easing function
 * @param {Function} callback - Completion callback
 */
export function animate(element, properties, duration = 300, easing = null, callback = null) {
    const start = performance.now();
    const startValues = {};
    
    // Get initial values
    Object.keys(properties).forEach(prop => {
        const computedStyle = getComputedStyle(element);
        startValues[prop] = parseFloat(computedStyle[prop]) || 0;
    });
    
    function step(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing if provided
        const easedProgress = easing ? easing(progress) : progress;
        
        // Update properties
        Object.entries(properties).forEach(([prop, endValue]) => {
            const startValue = startValues[prop];
            const currentValue = startValue + (endValue - startValue) * easedProgress;
            element.style[prop] = currentValue + (prop.includes('opacity') ? '' : 'px');
        });
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (callback) {
            callback();
        }
    }
    
    requestAnimationFrame(step);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength, suffix = '...') {
    if (text.length <= maxLength) {
        return text;
    }
    
    // Try to truncate at word boundaries
    const words = text.split(' ');
    let truncated = '';
    
    for (let i = 0; i < words.length; i++) {
        const testString = truncated + (truncated ? ' ' : '') + words[i];
        if (testString.length <= maxLength - suffix.length) {
            truncated = testString;
        } else {
            break;
        }
    }
    
    // If we couldn't fit any complete words, just truncate at character level
    if (!truncated) {
        truncated = text.substring(0, maxLength - suffix.length);
    }
    
    return truncated + suffix;
}

/**
 * Get viewport dimensions
 * @returns {Object} Viewport width and height
 */
export function getViewportSize() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight
    };
}

/**
 * Check if device is mobile
 * @param {number} breakpoint - Mobile breakpoint in pixels
 * @returns {boolean} Whether device is mobile
 */
export function isMobile(breakpoint = 768) {
    return getViewportSize().width <= breakpoint;
}

/**
 * Force reflow to trigger layout recalculation
 * @param {Element} element - Element to reflow
 */
export function forceReflow(element) {
    element.style.display = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.display = '';
}
