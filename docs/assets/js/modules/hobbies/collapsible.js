// Collapsible Sections Module
// Expandable/collapsible content sections with accessibility

import { $, $$ } from '../../utils/dom.js';
import { setupCollapsibleARIA, updateCollapsibleARIA, addHapticFeedback, announceToScreenReader } from '../../utils/accessibility.js';

/**
 * Initialize collapsible sections
 */
export function initCollapsibleSections() {
    initCollapsibleElements();
    addCollapsibleStyles();
    initAutoExpand();
    addKeyboardSupport();
}

/**
 * Initialize all collapsible elements
 */
function initCollapsibleElements() {
    const sections = $$('.tldr-box, .results-preview, .prerequisites-box, .tools-needed, .collapsible-section');
    
    sections.forEach(section => {
        // Create the collapsible structure if it doesn't exist
        if (!section.querySelector('.section-header')) {
            convertToCollapsible(section);
        }
        
        // Add click event listener
        const header = section.querySelector('.section-header');
        if (header) {
            const content = section.querySelector('.section-content');
            
            // Setup ARIA attributes
            setupCollapsibleARIA(header, content, false);
            
            header.addEventListener('click', () => toggleSection(section));
        }
    });
}

/**
 * Convert regular section to collapsible
 * @param {Element} section - Section element to convert
 */
function convertToCollapsible(section) {
    const originalContent = section.innerHTML;
    const sectionType = getSectionType(section);
    
    // Create new structure
    section.innerHTML = `
        <div class="section-header" role="button" tabindex="0">
            <div class="section-icon">${sectionType.icon}</div>
            <h3>${sectionType.title}</h3>
            <div class="toggle-indicator">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 12l-4-4h8l-4 4z"/>
                </svg>
            </div>
        </div>
        <div class="section-content">
            <div class="content-inner">
                ${originalContent}
            </div>
        </div>
    `;
    
    // Remove the original h3 from content if it exists
    const contentH3 = section.querySelector('.content-inner h3');
    if (contentH3 && contentH3.textContent === sectionType.title) {
        contentH3.remove();
    }
}

/**
 * Get section type information
 * @param {Element} section - Section element
 * @returns {Object} Section type info
 */
function getSectionType(section) {
    if (section.classList.contains('tldr-box')) {
        return { title: 'TL;DR', icon: '💡' };
    } else if (section.classList.contains('results-preview')) {
        return { title: 'Results at a Glance', icon: '📈' };
    } else if (section.classList.contains('prerequisites-box')) {
        return { title: 'Prerequisites', icon: '📋' };
    } else if (section.classList.contains('tools-needed')) {
        return { title: 'Tools You\'ll Need', icon: '🛠️' };
    } else if (section.classList.contains('collapsible-section')) {
        const title = section.querySelector('h2, h3, h4')?.textContent || 'Section';
        return { title: title, icon: '📄' };
    }
    return { title: 'Section', icon: '📄' };
}

/**
 * Toggle section expanded/collapsed state
 * @param {Element} section - Section element
 */
function toggleSection(section) {
    const isExpanded = section.classList.contains('expanded');
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-content');
    const sectionType = getSectionType(section);
    
    if (isExpanded) {
        collapseSection(section, header, content, sectionType.title);
    } else {
        expandSection(section, header, content, sectionType.title);
    }
    
    // Add haptic feedback
    addHapticFeedback(50);
}

/**
 * Expand section with animation
 * @param {Element} section - Section element
 * @param {Element} header - Header element
 * @param {Element} content - Content element
 * @param {string} sectionName - Section name for announcements
 */
function expandSection(section, header, content, sectionName) {
    section.classList.add('expanded');
    
    // Update ARIA attributes
    updateCollapsibleARIA(header, content, true, sectionName);
    
    // Calculate and set max height for smooth animation
    const contentInner = section.querySelector('.content-inner');
    if (content && contentInner) {
        const height = contentInner.scrollHeight;
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            content.style.maxHeight = height + 'px';
            content.style.opacity = '1';
            
            // Reset to CSS value after animation
            setTimeout(() => {
                if (section.classList.contains('expanded')) {
                    content.style.maxHeight = '';
                }
            }, 400);
        }, 10);
    }
}

/**
 * Collapse section with animation
 * @param {Element} section - Section element
 * @param {Element} header - Header element
 * @param {Element} content - Content element
 * @param {string} sectionName - Section name for announcements
 */
function collapseSection(section, header, content, sectionName) {
    // Update ARIA attributes
    updateCollapsibleARIA(header, content, false, sectionName);
    
    // Add subtle animation
    if (content) {
        const height = content.scrollHeight;
        content.style.maxHeight = height + 'px';
        
        setTimeout(() => {
            content.style.transition = 'all 0.3s ease';
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            
            setTimeout(() => {
                section.classList.remove('expanded');
            }, 300);
        }, 10);
    }
}

/**
 * Auto-expand sections based on URL hash or user preference
 */
function initAutoExpand() {
    setTimeout(() => {
        const hash = window.location.hash;
        
        // Auto-expand TL;DR if user came from a link
        if (document.referrer && document.referrer !== window.location.href) {
            const tldrBox = $('.tldr-box');
            if (tldrBox && !tldrBox.classList.contains('expanded')) {
                toggleSection(tldrBox);
            }
        }
        
        // Auto-expand section based on hash
        if (hash) {
            const targetSection = $(hash);
            if (targetSection && isCollapsibleSection(targetSection)) {
                toggleSection(targetSection);
            }
        }
    }, 500);
}

/**
 * Check if element is a collapsible section
 * @param {Element} element - Element to check
 * @returns {boolean} Whether element is collapsible
 */
function isCollapsibleSection(element) {
    return element.classList.contains('tldr-box') ||
           element.classList.contains('results-preview') ||
           element.classList.contains('prerequisites-box') ||
           element.classList.contains('tools-needed') ||
           element.classList.contains('collapsible-section');
}

/**
 * Add keyboard accessibility support
 */
function addKeyboardSupport() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target.closest('.section-header');
            if (target) {
                e.preventDefault();
                const section = target.closest('.tldr-box, .results-preview, .prerequisites-box, .tools-needed, .collapsible-section');
                if (section) {
                    toggleSection(section);
                }
            }
        }
    });
}

/**
 * Add collapsible section styles
 */
function addCollapsibleStyles() {
    if (document.querySelector('#collapsible-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'collapsible-styles';
    style.textContent = `
        .section-header {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            transition: all 0.3s ease;
            user-select: none;
            -webkit-tap-highlight-color: rgba(0, 135, 83, 0.1);
        }
        
        .section-header:hover {
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .section-header:focus {
            outline: 2px solid var(--accent-color, #008753);
            outline-offset: 2px;
        }
        
        .section-header h3 {
            margin: 0;
            flex: 1;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .section-icon {
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            background: rgba(0, 135, 83, 0.1);
            border-radius: 50%;
        }
        
        .toggle-indicator {
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.5rem;
            height: 1.5rem;
        }
        
        .expanded .toggle-indicator {
            transform: rotate(180deg);
        }
        
        .section-content {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .expanded .section-content {
            opacity: 1;
        }
        
        .content-inner {
            padding: 1rem;
            padding-top: 0.5rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .section-header {
                padding: 0.75rem;
                gap: 0.5rem;
            }
            
            .section-header h3 {
                font-size: 1rem;
            }
            
            .section-icon {
                width: 1.5rem;
                height: 1.5rem;
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}
