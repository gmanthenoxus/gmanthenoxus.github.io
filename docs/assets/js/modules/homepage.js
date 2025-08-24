// Homepage Module
// Combined functionality for homepage interactions and animations

import { ready, $, $$ } from '../utils/dom.js';
import { createFloatingElements, smoothScrollTo } from '../utils/animations.js';
import { validateEmail } from '../utils/sharing.js';

/**
 * Initialize homepage functionality
 */
export function initHomepage() {
    ready(() => {
        initChapterEffects();
        initFloatingElements();
        initScrollNavigation();
        initTabbedRoadmap();
        initWIPForm();
    });
}

/**
 * Initialize chapter hover effects
 */
function initChapterEffects() {
    const chapters = $$('.chapter');
    
    chapters.forEach(chapter => {
        chapter.addEventListener('mouseenter', () => {
            chapter.style.transform = 'rotate(1deg) scale(1.02)';
        });
        
        chapter.addEventListener('mouseleave', () => {
            chapter.style.transform = 'rotate(0) scale(1)';
        });
    });
}

/**
 * Initialize floating background elements in hero section
 */
function initFloatingElements() {
    const hero = $('.hero');
    if (!hero) return;
    
    const emojis = ['🏀', '💻', '🎌', '📊', '🔧', '🇳🇬', '🇬🇧'];
    createFloatingElements(hero, emojis, 7);
}

/**
 * Initialize smooth scroll navigation
 */
function initScrollNavigation() {
    const scrollButton = $('.scroll-down');
    if (!scrollButton) return;
    
    scrollButton.addEventListener('click', () => {
        const roadmapSection = $('.tabbed-roadmap');
        if (roadmapSection) {
            smoothScrollTo(roadmapSection, 20);
        }
    });
}

/**
 * Initialize tabbed roadmap functionality
 */
function initTabbedRoadmap() {
    const tabButtons = $$('.roadmap-nav .nav-item');
    const tabPanes = $$('.content-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding pane
            const targetId = button.dataset.target;
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/**
 * Initialize WIP (Work in Progress) form
 */
function initWIPForm() {
    const wipForm = $('.wip-form');
    const wipButton = $('.wip-form button');
    const wipInput = $('.wip-form input');
    
    if (!wipForm || !wipButton || !wipInput) return;
    
    wipButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = wipInput.value.trim();
        
        if (!email) {
            showFormMessage('Please enter your email address', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Success message
        showFormMessage(`Thanks! We'll notify you at ${email} when Brain Work is ready.`, 'success');
        
        // Clear form
        wipInput.value = '';
        
        // Here you would normally send to a database/API
        // sendEmailToDatabase(email);
    });
    
    // Handle Enter key in input
    wipInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            wipButton.click();
        }
    });
}

/**
 * Show form message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = $('.wip-form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `wip-form-message wip-form-message--${type}`;
    messageEl.textContent = message;
    
    const wipForm = $('.wip-form');
    wipForm.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Auto-initialize if this module is loaded directly
if (typeof window !== 'undefined') {
    initHomepage();
}
