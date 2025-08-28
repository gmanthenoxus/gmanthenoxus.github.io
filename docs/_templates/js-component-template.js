/**
 * JavaScript Component Template
 * Copy this template and customize for new interactive components
 * Follow modern ES6+ patterns and include proper error handling
 */

class ComponentName {
    /**
     * Initialize the component
     * @param {HTMLElement|string} element - DOM element or selector
     * @param {Object} options - Configuration options
     */
    constructor(element, options = {}) {
        // Validate and set element
        this.element = typeof element === 'string' 
            ? document.querySelector(element) 
            : element;
            
        if (!this.element) {
            throw new Error('ComponentName: Element not found');
        }

        // Default configuration
        this.defaults = {
            // Component-specific defaults
            autoInit: true,
            animationDuration: 300,
            enableKeyboard: true,
            enableTouch: true,
            className: 'component-name',
            activeClass: 'is-active',
            disabledClass: 'is-disabled',
            loadingClass: 'is-loading',
            
            // Callbacks
            onInit: null,
            onShow: null,
            onHide: null,
            onDestroy: null,
            onError: null
        };

        // Merge options with defaults
        this.options = { ...this.defaults, ...options };
        
        // Component state
        this.state = {
            isInitialized: false,
            isActive: false,
            isDisabled: false,
            isLoading: false
        };

        // Bind methods to maintain context
        this.handleClick = this.handleClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        // Initialize if auto-init is enabled
        if (this.options.autoInit) {
            this.init();
        }
    }

    /**
     * Initialize the component
     */
    init() {
        try {
            if (this.state.isInitialized) {
                console.warn('ComponentName: Already initialized');
                return this;
            }

            // Add component class
            this.element.classList.add(this.options.className);
            
            // Cache DOM elements
            this.cacheElements();
            
            // Set up event listeners
            this.bindEvents();
            
            // Set initial state
            this.setState({ isInitialized: true });
            
            // Trigger init callback
            this.triggerCallback('onInit', this);
            
            console.log('ComponentName: Initialized successfully');
            
        } catch (error) {
            this.handleError('Initialization failed', error);
        }

        return this;
    }

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        this.elements = {
            trigger: this.element.querySelector('[data-component-trigger]'),
            content: this.element.querySelector('[data-component-content]'),
            close: this.element.querySelector('[data-component-close]'),
            overlay: this.element.querySelector('[data-component-overlay]')
        };

        // Remove null elements
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                delete this.elements[key];
            }
        });
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Click events
        if (this.elements.trigger) {
            this.elements.trigger.addEventListener('click', this.handleClick);
        }
        
        if (this.elements.close) {
            this.elements.close.addEventListener('click', this.handleClick);
        }

        // Keyboard events
        if (this.options.enableKeyboard) {
            document.addEventListener('keydown', this.handleKeydown);
        }

        // Touch events
        if (this.options.enableTouch && 'ontouchstart' in window) {
            this.element.addEventListener('touchstart', this.handleTouchStart, { passive: true });
            this.element.addEventListener('touchend', this.handleTouchEnd, { passive: true });
        }

        // Resize events
        window.addEventListener('resize', this.debounce(this.handleResize, 250));
    }

    /**
     * Handle click events
     * @param {Event} event - Click event
     */
    handleClick(event) {
        event.preventDefault();
        
        if (this.state.isDisabled || this.state.isLoading) {
            return;
        }

        const target = event.currentTarget;
        
        if (target === this.elements.trigger) {
            this.toggle();
        } else if (target === this.elements.close) {
            this.hide();
        }
    }

    /**
     * Handle keyboard events
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeydown(event) {
        if (!this.state.isActive) return;

        switch (event.key) {
            case 'Escape':
                this.hide();
                break;
            case 'Enter':
            case ' ':
                if (event.target === this.elements.trigger) {
                    event.preventDefault();
                    this.toggle();
                }
                break;
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        if (this.state.isActive) {
            this.updatePosition();
        }
    }

    /**
     * Handle touch start
     * @param {TouchEvent} event - Touch event
     */
    handleTouchStart(event) {
        this.touchStartY = event.touches[0].clientY;
    }

    /**
     * Handle touch end
     * @param {TouchEvent} event - Touch event
     */
    handleTouchEnd(event) {
        if (!this.touchStartY) return;

        const touchEndY = event.changedTouches[0].clientY;
        const deltaY = this.touchStartY - touchEndY;

        // Swipe up to show, swipe down to hide
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                this.show();
            } else {
                this.hide();
            }
        }

        this.touchStartY = null;
    }

    /**
     * Show the component
     */
    show() {
        if (this.state.isActive || this.state.isDisabled) {
            return this;
        }

        try {
            this.setState({ isActive: true });
            this.element.classList.add(this.options.activeClass);
            
            // Animate in
            this.animateIn();
            
            // Update position if needed
            this.updatePosition();
            
            // Trigger callback
            this.triggerCallback('onShow', this);
            
        } catch (error) {
            this.handleError('Show failed', error);
        }

        return this;
    }

    /**
     * Hide the component
     */
    hide() {
        if (!this.state.isActive) {
            return this;
        }

        try {
            this.setState({ isActive: false });
            
            // Animate out
            this.animateOut(() => {
                this.element.classList.remove(this.options.activeClass);
            });
            
            // Trigger callback
            this.triggerCallback('onHide', this);
            
        } catch (error) {
            this.handleError('Hide failed', error);
        }

        return this;
    }

    /**
     * Toggle component visibility
     */
    toggle() {
        return this.state.isActive ? this.hide() : this.show();
    }

    /**
     * Enable the component
     */
    enable() {
        this.setState({ isDisabled: false });
        this.element.classList.remove(this.options.disabledClass);
        return this;
    }

    /**
     * Disable the component
     */
    disable() {
        this.setState({ isDisabled: true });
        this.element.classList.add(this.options.disabledClass);
        return this;
    }

    /**
     * Set loading state
     * @param {boolean} loading - Loading state
     */
    setLoading(loading = true) {
        this.setState({ isLoading: loading });
        
        if (loading) {
            this.element.classList.add(this.options.loadingClass);
        } else {
            this.element.classList.remove(this.options.loadingClass);
        }
        
        return this;
    }

    /**
     * Update component position (override in subclasses)
     */
    updatePosition() {
        // Implement positioning logic if needed
    }

    /**
     * Animate component in
     */
    animateIn() {
        // Basic fade in animation
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            this.element.style.transition = `opacity ${this.options.animationDuration}ms ease, transform ${this.options.animationDuration}ms ease`;
            this.element.style.opacity = '1';
            this.element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Animate component out
     * @param {Function} callback - Callback after animation
     */
    animateOut(callback) {
        this.element.style.transition = `opacity ${this.options.animationDuration}ms ease, transform ${this.options.animationDuration}ms ease`;
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            if (callback) callback();
            this.element.style.transition = '';
            this.element.style.opacity = '';
            this.element.style.transform = '';
        }, this.options.animationDuration);
    }

    /**
     * Update component state
     * @param {Object} newState - New state properties
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
    }

    /**
     * Trigger callback function
     * @param {string} callbackName - Name of callback
     * @param {...any} args - Arguments to pass to callback
     */
    triggerCallback(callbackName, ...args) {
        const callback = this.options[callbackName];
        if (typeof callback === 'function') {
            try {
                callback.apply(this, args);
            } catch (error) {
                this.handleError(`Callback ${callbackName} failed`, error);
            }
        }
    }

    /**
     * Handle errors
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    handleError(message, error) {
        console.error(`ComponentName: ${message}`, error);
        this.triggerCallback('onError', message, error);
    }

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
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

    /**
     * Destroy the component
     */
    destroy() {
        try {
            // Remove event listeners
            if (this.elements.trigger) {
                this.elements.trigger.removeEventListener('click', this.handleClick);
            }
            
            if (this.elements.close) {
                this.elements.close.removeEventListener('click', this.handleClick);
            }
            
            document.removeEventListener('keydown', this.handleKeydown);
            window.removeEventListener('resize', this.handleResize);
            
            if (this.options.enableTouch) {
                this.element.removeEventListener('touchstart', this.handleTouchStart);
                this.element.removeEventListener('touchend', this.handleTouchEnd);
            }

            // Remove classes
            this.element.classList.remove(
                this.options.className,
                this.options.activeClass,
                this.options.disabledClass,
                this.options.loadingClass
            );

            // Reset state
            this.setState({
                isInitialized: false,
                isActive: false,
                isDisabled: false,
                isLoading: false
            });

            // Trigger callback
            this.triggerCallback('onDestroy', this);
            
            console.log('ComponentName: Destroyed successfully');
            
        } catch (error) {
            this.handleError('Destroy failed', error);
        }

        return this;
    }
}

// Auto-initialize components with data attribute
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-component="component-name"]');
    elements.forEach(element => {
        // Get options from data attributes
        const options = {};
        Object.keys(element.dataset).forEach(key => {
            if (key.startsWith('component')) {
                const optionKey = key.replace('component', '').toLowerCase();
                let value = element.dataset[key];
                
                // Parse boolean and number values
                if (value === 'true') value = true;
                else if (value === 'false') value = false;
                else if (!isNaN(value) && value !== '') value = Number(value);
                
                options[optionKey] = value;
            }
        });
        
        new ComponentName(element, options);
    });
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentName;
}

/*
Usage Examples:

HTML:
<div class="component-name" data-component="component-name">
    <button data-component-trigger>Toggle</button>
    <div data-component-content>Content here</div>
    <button data-component-close>Close</button>
</div>

JavaScript:
// Basic initialization
const component = new ComponentName('.component-name');

// With options
const component = new ComponentName('.component-name', {
    animationDuration: 500,
    enableKeyboard: false,
    onShow: function() {
        console.log('Component shown');
    }
});

// Method chaining
component.show().setLoading(true).disable();

Template Customization Instructions:
1. Replace "ComponentName" with your actual component name (PascalCase)
2. Replace "component-name" with kebab-case version for CSS classes and data attributes
3. Customize default options for your component's needs
4. Add component-specific methods and properties
5. Implement custom animation logic if needed
6. Add validation and error handling for your use case
7. Include accessibility features (ARIA attributes, focus management)
8. Test across different browsers and devices
9. Document public API methods and options
10. Consider performance implications and optimize as needed
*/
