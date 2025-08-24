// Accessibility Utilities
// Functions to enhance accessibility and user experience

/**
 * Create screen reader announcement
 * @param {string} message - Message to announce
 * @param {string} priority - Announcement priority ('polite' or 'assertive')
 * @param {number} duration - How long to keep the announcement element
 */
export function announceToScreenReader(message, priority = 'polite', duration = 1000) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, duration);
}

/**
 * Add keyboard navigation support
 * @param {NodeList} elements - Elements to make keyboard navigable
 * @param {Object} options - Navigation options
 */
export function addKeyboardNavigation(elements, options = {}) {
    const {
        activateKeys = ['Enter', ' '],
        navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
        circular = true,
        onActivate = null,
        onNavigate = null
    } = options;
    
    let currentIndex = 0;
    
    elements.forEach((element, index) => {
        // Make elements focusable
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', index === 0 ? '0' : '-1');
        }
        
        element.addEventListener('keydown', (e) => {
            // Handle activation keys
            if (activateKeys.includes(e.key)) {
                e.preventDefault();
                if (onActivate) {
                    onActivate(element, index);
                } else {
                    element.click();
                }
                return;
            }
            
            // Handle navigation keys
            if (navigationKeys.includes(e.key)) {
                e.preventDefault();
                
                let newIndex = currentIndex;
                
                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        newIndex = currentIndex - 1;
                        break;
                    case 'ArrowDown':
                    case 'ArrowRight':
                        newIndex = currentIndex + 1;
                        break;
                }
                
                // Handle circular navigation
                if (circular) {
                    if (newIndex < 0) newIndex = elements.length - 1;
                    if (newIndex >= elements.length) newIndex = 0;
                } else {
                    newIndex = Math.max(0, Math.min(newIndex, elements.length - 1));
                }
                
                // Update focus
                elements[currentIndex].setAttribute('tabindex', '-1');
                elements[newIndex].setAttribute('tabindex', '0');
                elements[newIndex].focus();
                
                currentIndex = newIndex;
                
                if (onNavigate) {
                    onNavigate(elements[newIndex], newIndex);
                }
            }
        });
        
        // Update current index on focus
        element.addEventListener('focus', () => {
            currentIndex = index;
        });
    });
}

/**
 * Add focus trap for modals and overlays
 * @param {Element} container - Container element to trap focus within
 * @returns {Function} Function to remove focus trap
 */
export function addFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return () => {};
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e) {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    container.addEventListener('keydown', handleTabKey);
    
    // Focus first element
    firstElement.focus();
    
    // Return cleanup function
    return () => {
        container.removeEventListener('keydown', handleTabKey);
    };
}

/**
 * Add ARIA attributes for collapsible sections
 * @param {Element} trigger - Trigger element
 * @param {Element} content - Content element
 * @param {boolean} expanded - Initial expanded state
 */
export function setupCollapsibleARIA(trigger, content, expanded = false) {
    const contentId = content.id || `content-${Math.random().toString(36).substr(2, 9)}`;
    
    if (!content.id) {
        content.id = contentId;
    }
    
    trigger.setAttribute('aria-expanded', expanded.toString());
    trigger.setAttribute('aria-controls', contentId);
    trigger.setAttribute('role', 'button');
    
    if (!trigger.hasAttribute('tabindex')) {
        trigger.setAttribute('tabindex', '0');
    }
    
    content.setAttribute('aria-hidden', (!expanded).toString());
}

/**
 * Update collapsible ARIA states
 * @param {Element} trigger - Trigger element
 * @param {Element} content - Content element
 * @param {boolean} expanded - New expanded state
 * @param {string} sectionName - Name of section for announcements
 */
export function updateCollapsibleARIA(trigger, content, expanded, sectionName = 'Section') {
    trigger.setAttribute('aria-expanded', expanded.toString());
    content.setAttribute('aria-hidden', (!expanded).toString());
    
    const announcement = expanded ? 
        `${sectionName} expanded` : 
        `${sectionName} collapsed`;
    
    announceToScreenReader(announcement);
}

/**
 * Add haptic feedback for mobile devices
 * @param {number} duration - Vibration duration in milliseconds
 */
export function addHapticFeedback(duration = 50) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

/**
 * Add skip link functionality
 * @param {string} targetSelector - Selector for skip target
 * @param {string} linkText - Text for skip link
 */
export function addSkipLink(targetSelector, linkText = 'Skip to main content') {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = `#${target.id || 'main-content'}`;
    skipLink.textContent = linkText;
    skipLink.className = 'skip-link';
    
    // Add skip link styles
    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            z-index: 1000;
            transition: top 0.3s;
        }
        
        .skip-link:focus {
            top: 0;
        }
    `;
    
    if (!document.querySelector('#skip-link-styles')) {
        style.id = 'skip-link-styles';
        document.head.appendChild(style);
    }
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Ensure target is focusable
    if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
    }
}

/**
 * Add high contrast mode detection
 * @param {Function} callback - Callback when high contrast mode changes
 */
export function detectHighContrastMode(callback) {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    callback(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', (e) => {
        callback(e.matches);
    });
}

/**
 * Add reduced motion detection
 * @param {Function} callback - Callback when motion preference changes
 */
export function detectReducedMotion(callback) {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    callback(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', (e) => {
        callback(e.matches);
    });
}

/**
 * Add tooltip with proper ARIA attributes
 * @param {Element} trigger - Element that triggers tooltip
 * @param {string} content - Tooltip content
 * @param {Object} options - Tooltip options
 */
export function addTooltip(trigger, content, options = {}) {
    const {
        position = 'top',
        delay = 500,
        className = 'tooltip'
    } = options;
    
    const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
    
    trigger.setAttribute('aria-describedby', tooltipId);
    
    let tooltip = null;
    let showTimeout = null;
    let hideTimeout = null;
    
    function showTooltip() {
        if (tooltip) return;
        
        tooltip = document.createElement('div');
        tooltip.id = tooltipId;
        tooltip.className = className;
        tooltip.textContent = content;
        tooltip.setAttribute('role', 'tooltip');
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - 8;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + 8;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + 8;
                break;
        }
        
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${top + window.pageYOffset}px`;
        tooltip.style.left = `${left + window.pageXOffset}px`;
        tooltip.style.zIndex = '1000';
    }
    
    function hideTooltip() {
        if (tooltip) {
            document.body.removeChild(tooltip);
            tooltip = null;
        }
    }
    
    trigger.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        showTimeout = setTimeout(showTooltip, delay);
    });
    
    trigger.addEventListener('mouseleave', () => {
        clearTimeout(showTimeout);
        hideTimeout = setTimeout(hideTooltip, 100);
    });
    
    trigger.addEventListener('focus', showTooltip);
    trigger.addEventListener('blur', hideTooltip);
}
