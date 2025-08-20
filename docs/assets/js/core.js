// ========================================
// 🎯 CORE JAVASCRIPT UTILITIES
// ========================================

/**
 * Core utility functions and shared functionality
 */
window.SiteCore = (function() {
    'use strict';

    // Utility functions
    const utils = {
        // Debounce function for performance optimization
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: function(element, threshold = 0) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top >= -threshold &&
                rect.left >= -threshold &&
                rect.bottom <= windowHeight + threshold &&
                rect.right <= windowWidth + threshold
            );
        },

        // Smooth scroll to element
        scrollToElement: function(element, offset = 0) {
            if (!element) return;
            
            const elementTop = element.offsetTop - offset;
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        },

        // Get device type
        getDeviceType: function() {
            const width = window.innerWidth;
            if (width <= 768) return 'mobile';
            if (width <= 1024) return 'tablet';
            return 'desktop';
        },

        // Check if user prefers reduced motion
        prefersReducedMotion: function() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        },

        // Generate random ID
        generateId: function(prefix = 'id') {
            return prefix + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Format number with commas
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // Copy text to clipboard
        copyToClipboard: function(text) {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                return new Promise((resolve, reject) => {
                    try {
                        document.execCommand('copy');
                        textArea.remove();
                        resolve();
                    } catch (err) {
                        textArea.remove();
                        reject(err);
                    }
                });
            }
        },

        // Share content using Web Share API with fallback
        shareContent: function(data) {
            if (navigator.share) {
                return navigator.share(data).catch(err => {
                    console.log('Error sharing:', err);
                    this.fallbackShare(data);
                });
            } else {
                this.fallbackShare(data);
            }
        },

        // Fallback sharing method
        fallbackShare: function(data) {
            const shareText = `${data.title}\n${data.text}\n${data.url || window.location.href}`;
            this.copyToClipboard(shareText).then(() => {
                this.showNotification('Content copied to clipboard!', 'success');
            }).catch(() => {
                this.showNotification('Unable to share content', 'error');
            });
        },

        // Show notification
        showNotification: function(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            `;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Animate out and remove
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, duration);
        }
    };

    // Animation utilities
    const animations = {
        // Fade in element
        fadeIn: function(element, duration = 300) {
            element.style.opacity = '0';
            element.style.display = 'block';
            
            let start = null;
            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const opacity = Math.min(progress / duration, 1);
                
                element.style.opacity = opacity;
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        },

        // Fade out element
        fadeOut: function(element, duration = 300) {
            let start = null;
            const initialOpacity = parseFloat(getComputedStyle(element).opacity);
            
            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const opacity = initialOpacity * (1 - Math.min(progress / duration, 1));
                
                element.style.opacity = opacity;
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.display = 'none';
                }
            }
            
            requestAnimationFrame(animate);
        },

        // Slide down element
        slideDown: function(element, duration = 300) {
            element.style.height = '0';
            element.style.overflow = 'hidden';
            element.style.display = 'block';
            
            const targetHeight = element.scrollHeight;
            let start = null;
            
            function animate(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const height = Math.min((progress / duration) * targetHeight, targetHeight);
                
                element.style.height = height + 'px';
                
                if (progress < duration) {
                    requestAnimationFrame(animate);
                } else {
                    element.style.height = 'auto';
                    element.style.overflow = 'visible';
                }
            }
            
            requestAnimationFrame(animate);
        }
    };

    // Event management
    const events = {
        // Custom event dispatcher
        dispatch: function(eventName, data = {}) {
            const event = new CustomEvent(eventName, { detail: data });
            document.dispatchEvent(event);
        },

        // Listen for custom events
        listen: function(eventName, callback) {
            document.addEventListener(eventName, callback);
        },

        // Remove event listener
        remove: function(eventName, callback) {
            document.removeEventListener(eventName, callback);
        }
    };

    // Initialize core functionality
    function init() {
        // Add device class to body
        document.body.classList.add(`device-${utils.getDeviceType()}`);
        
        // Add reduced motion class if preferred
        if (utils.prefersReducedMotion()) {
            document.body.classList.add('prefers-reduced-motion');
        }

        // Handle window resize
        window.addEventListener('resize', utils.debounce(() => {
            document.body.className = document.body.className.replace(/device-\w+/, '');
            document.body.classList.add(`device-${utils.getDeviceType()}`);
            events.dispatch('windowResize', { deviceType: utils.getDeviceType() });
        }, 250));

        // Dispatch ready event
        events.dispatch('coreReady');
    }

    // Public API
    return {
        utils: utils,
        animations: animations,
        events: events,
        init: init
    };
})();

// Initialize core when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SiteCore.init);
} else {
    SiteCore.init();
}
