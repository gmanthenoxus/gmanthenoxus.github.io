// Hobby Interactive Module
// Trivia, sharing, and interactive features

import { $, $$ } from '../../utils/dom.js';
import { shareContent, shareFunFact, shareTrivia, initializeSharing } from '../../utils/sharing.js';
import { addHapticFeedback } from '../../utils/accessibility.js';

/**
 * Initialize hobby interactive features
 */
export function initHobbyInteractive() {
    initTriviaSystem();
    initSharingFunctionality();
    initInteractiveElements();
}

/**
 * Initialize trivia system
 */
function initTriviaSystem() {
    const triviaCards = $$('.trivia-card');
    
    triviaCards.forEach(card => {
        const options = card.querySelectorAll('.trivia-option');
        const feedback = card.querySelector('.trivia-feedback');
        const result = card.querySelector('.trivia-result');
        const shareBtn = card.querySelector('.trivia-share-btn');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                handleTriviaAnswer(this, options, feedback, result, shareBtn, card);
            });
        });
    });
}

/**
 * Handle trivia answer selection
 * @param {Element} selectedOption - Selected option element
 * @param {NodeList} allOptions - All option elements
 * @param {Element} feedback - Feedback container
 * @param {Element} result - Result container
 * @param {Element} shareBtn - Share button
 * @param {Element} card - Trivia card container
 */
function handleTriviaAnswer(selectedOption, allOptions, feedback, result, shareBtn, card) {
    // Disable all options
    allOptions.forEach(opt => {
        opt.disabled = true;
        opt.style.pointerEvents = 'none';
    });
    
    // Show selected state
    selectedOption.classList.add('selected');
    
    // Check if correct
    const isCorrect = selectedOption.dataset.correct === 'true';
    
    // Show correct/incorrect states with animation
    allOptions.forEach(opt => {
        if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
            opt.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            opt.style.color = 'white';
        } else if (opt === selectedOption && !isCorrect) {
            opt.classList.add('incorrect');
            opt.style.background = 'linear-gradient(135deg, #f56565, #e53e3e)';
            opt.style.color = 'white';
        }
    });
    
    // Show feedback with animation
    if (result) {
        result.className = `trivia-result ${isCorrect ? 'correct' : 'incorrect'}`;
        result.style.opacity = '0';
        result.style.transform = 'translateY(10px)';
    }
    
    if (feedback) {
        feedback.style.display = 'block';
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            feedback.style.transition = 'all 0.3s ease';
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
            
            if (result) {
                result.style.transition = 'all 0.3s ease';
                result.style.opacity = '1';
                result.style.transform = 'translateY(0)';
            }
        }, 100);
    }
    
    // Add haptic feedback
    addHapticFeedback(isCorrect ? 100 : 200);
    
    // Setup share functionality
    if (shareBtn) {
        shareBtn.style.display = 'inline-block';
        shareBtn.addEventListener('click', function() {
            const question = card.querySelector('.trivia-question h3')?.textContent || 'Trivia Question';
            const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
            shareTrivia(question, hobbyTitle, window.location.href);
        });
    }
}

/**
 * Initialize sharing functionality
 */
function initSharingFunctionality() {
    // Fun facts sharing
    initializeSharing('.fact-share-btn', function(button) {
        const factCard = button.closest('.fact-card');
        if (!factCard) return null;
        
        const title = factCard.querySelector('h3')?.textContent || 'Fun Fact';
        const description = factCard.querySelector('p')?.textContent || '';
        const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
        
        return {
            title: `${title} - ${hobbyTitle}`,
            text: `🎯 ${title}\n\n${description}\n\n#${hobbyTitle.replace(/\s+/g, '')} #FunFacts`,
            url: window.location.href
        };
    });
    
    // General content sharing
    initializeSharing('.share-btn', function(button) {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.content || '';
        
        return {
            title: title,
            text: description,
            url: window.location.href
        };
    });
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    initExpandableCards();
    initImageGallery();
    initTooltips();
}

/**
 * Initialize expandable cards
 */
function initExpandableCards() {
    const expandableCards = $$('.expandable-card');
    
    expandableCards.forEach(card => {
        const trigger = card.querySelector('.card-trigger, .expand-trigger');
        const content = card.querySelector('.card-content, .expandable-content');
        
        if (!trigger || !content) return;
        
        trigger.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            if (isExpanded) {
                collapseCard(card, content);
            } else {
                expandCard(card, content);
            }
            
            addHapticFeedback(50);
        });
    });
}

/**
 * Expand card with animation
 * @param {Element} card - Card element
 * @param {Element} content - Content element
 */
function expandCard(card, content) {
    card.classList.add('expanded');
    
    const height = content.scrollHeight;
    content.style.maxHeight = '0px';
    content.style.opacity = '0';
    
    setTimeout(() => {
        content.style.transition = 'all 0.4s ease';
        content.style.maxHeight = height + 'px';
        content.style.opacity = '1';
        
        // Reset max-height after animation
        setTimeout(() => {
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = 'none';
            }
        }, 400);
    }, 10);
}

/**
 * Collapse card with animation
 * @param {Element} card - Card element
 * @param {Element} content - Content element
 */
function collapseCard(card, content) {
    const height = content.scrollHeight;
    content.style.maxHeight = height + 'px';
    
    setTimeout(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        setTimeout(() => {
            card.classList.remove('expanded');
        }, 300);
    }, 10);
}

/**
 * Initialize image gallery
 */
function initImageGallery() {
    const galleryImages = $$('.gallery-image, .hobby-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openImageModal(image);
        });
        
        // Add keyboard support
        image.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(image);
            }
        });
    });
}

/**
 * Open image in modal
 * @param {Element} image - Image element
 */
function openImageModal(image) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <img src="${image.src}" alt="${image.alt || ''}" />
            <button class="modal-close" aria-label="Close image">×</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    function closeModal() {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Keyboard support
    document.addEventListener('keydown', function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    });
}

/**
 * Initialize tooltips for interactive elements
 */
function initTooltips() {
    const tooltipElements = $$('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.dataset.tooltip;
        if (!tooltipText) return;
        
        let tooltip = null;
        
        element.addEventListener('mouseenter', () => {
            tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                document.body.removeChild(tooltip);
                tooltip = null;
            }
        });
    });
}
