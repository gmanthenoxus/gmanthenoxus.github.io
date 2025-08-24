// Hobby Animations Module
// Scroll reveals, progress bars, and visual effects

import { $, $$ } from '../../utils/dom.js';
import { createScrollRevealObserver, animateProgressBars } from '../../utils/animations.js';

/**
 * Initialize hobby page animations
 */
export function initHobbyAnimations() {
    initScrollRevealAnimations();
    initProgressBarAnimations();
    initQuoteRotation();
    initParallaxEffects();
}

/**
 * Initialize scroll reveal animations
 */
function initScrollRevealAnimations() {
    const scrollRevealElements = $$('.scroll-reveal');
    
    if (scrollRevealElements.length) {
        createScrollRevealObserver(scrollRevealElements, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }, 'revealed');
    }
}

/**
 * Initialize progress bar animations
 */
function initProgressBarAnimations() {
    const progressBars = $$('.progress-fill');
    
    if (progressBars.length) {
        animateProgressBars(progressBars);
    }
}

/**
 * Initialize quote rotation system
 */
function initQuoteRotation() {
    const quoteContainer = $('#rotating-quote');
    
    if (!quoteContainer || !window.hobbyQuotes || window.hobbyQuotes.length <= 1) {
        return;
    }
    
    let currentQuoteIndex = 0;
    
    function rotateQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % window.hobbyQuotes.length;
        const quote = window.hobbyQuotes[currentQuoteIndex];
        
        // Fade out
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Update content
            const quoteText = quoteContainer.querySelector('.quote-text');
            const quoteAuthor = quoteContainer.querySelector('.quote-author');
            
            if (quoteText) quoteText.textContent = `"${quote.text}"`;
            if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
            
            // Fade in
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add transition styles
    quoteContainer.style.transition = 'all 0.3s ease';
    
    // Rotate quotes every 8 seconds
    setInterval(rotateQuote, 8000);
}

/**
 * Initialize parallax effects for hero sections
 */
function initParallaxEffects() {
    const parallaxElements = $$('.parallax-element');
    
    if (!parallaxElements.length) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        requestTick();
        ticking = false;
    }
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize floating animation for elements
 */
export function initFloatingAnimation() {
    const floatingElements = $$('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const duration = 3 + Math.random() * 4; // 3-7 seconds
        const delay = index * 0.5; // Stagger start times
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add CSS animation if not already present
    addFloatingKeyframes();
}

/**
 * Add floating keyframes to document
 */
function addFloatingKeyframes() {
    if (document.querySelector('#floating-keyframes')) return;
    
    const style = document.createElement('style');
    style.id = 'floating-keyframes';
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes floatReverse {
            0%, 100% { transform: translateY(-10px); }
            50% { transform: translateY(10px); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .scroll-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .scroll-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .floating-element {
            animation: float 4s ease-in-out infinite;
        }
        
        .floating-element:nth-child(even) {
            animation: floatReverse 5s ease-in-out infinite;
        }
        
        .pulse-element {
            animation: pulse 2s ease-in-out infinite;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Initialize staggered animations for lists
 */
export function initStaggeredAnimations() {
    const staggeredLists = $$('.staggered-list');
    
    staggeredLists.forEach(list => {
        const items = list.querySelectorAll('li, .list-item');
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}

/**
 * Initialize counter animations
 */
export function initCounterAnimations() {
    const counters = $$('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate counter from 0 to target value
 * @param {Element} counter - Counter element
 */
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
    const duration = parseInt(counter.dataset.duration) || 2000;
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        counter.textContent = Math.floor(current);
    }, 16);
}

// Initialize floating keyframes when module loads
addFloatingKeyframes();
