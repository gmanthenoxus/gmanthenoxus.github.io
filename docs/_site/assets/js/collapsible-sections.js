// Collapsible Sections Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all collapsible sections
    initCollapsibleSections();
});

function initCollapsibleSections() {
    const sections = document.querySelectorAll('.tldr-box, .results-preview, .prerequisites-box, .tools-needed');
    
    sections.forEach(section => {
        // Create the collapsible structure if it doesn't exist
        if (!section.querySelector('.section-header')) {
            convertToCollapsible(section);
        }
        
        // Add click event listener
        const header = section.querySelector('.section-header');
        if (header) {
            header.addEventListener('click', () => toggleSection(section));
        }
    });
}

function convertToCollapsible(section) {
    const originalContent = section.innerHTML;
    const sectionType = getSectionType(section);
    
    // Create new structure
    section.innerHTML = `
        <div class="section-header">
            <div class="section-icon"></div>
            <h3>${sectionType.title}</h3>
            <div class="toggle-indicator"></div>
        </div>
        <div class="section-content">
            <div class="content-inner">
                ${originalContent}
            </div>
        </div>
    `;
    
    // Remove the original h3 from content if it exists
    const contentH3 = section.querySelector('.content-inner h3');
    if (contentH3) {
        contentH3.remove();
    }
}

function getSectionType(section) {
    if (section.classList.contains('tldr-box')) {
        return { title: 'TL;DR', icon: '💡' };
    } else if (section.classList.contains('results-preview')) {
        return { title: 'Results at a Glance', icon: '📈' };
    } else if (section.classList.contains('prerequisites-box')) {
        return { title: 'Prerequisites', icon: '📋' };
    } else if (section.classList.contains('tools-needed')) {
        return { title: 'Tools You\'ll Need', icon: '🛠️' };
    }
    return { title: 'Section', icon: '📄' };
}

function toggleSection(section) {
    const isExpanded = section.classList.contains('expanded');
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-content');

    if (isExpanded) {
        // Collapse
        section.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');

        // Add subtle animation
        if (content) {
            content.style.maxHeight = '0px';
        }
    } else {
        // Expand
        section.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');

        // Calculate and set max height for smooth animation
        const contentInner = section.querySelector('.content-inner');

        if (content && contentInner) {
            const height = contentInner.scrollHeight;
            content.style.maxHeight = height + 'px';

            // Reset to CSS value after animation
            setTimeout(() => {
                if (section.classList.contains('expanded')) {
                    content.style.maxHeight = '';
                }
            }, 400);
        }
    }

    // Add haptic feedback for mobile devices
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }

    // Announce to screen readers
    const sectionType = getSectionType(section).title;
    const announcement = isExpanded ?
        `${sectionType} section collapsed` :
        `${sectionType} section expanded`;

    // Create temporary announcement for screen readers
    const announcement_el = document.createElement('div');
    announcement_el.setAttribute('aria-live', 'polite');
    announcement_el.setAttribute('aria-atomic', 'true');
    announcement_el.className = 'sr-only';
    announcement_el.textContent = announcement;
    document.body.appendChild(announcement_el);

    setTimeout(() => {
        document.body.removeChild(announcement_el);
    }, 1000);
}

// Auto-expand sections based on URL hash or user preference
function autoExpandSections() {
    const hash = window.location.hash;
    
    // Auto-expand TL;DR if user came from a link
    if (document.referrer && document.referrer !== window.location.href) {
        const tldrBox = document.querySelector('.tldr-box');
        if (tldrBox && !tldrBox.classList.contains('expanded')) {
            toggleSection(tldrBox);
        }
    }
    
    // Auto-expand section based on hash
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection && (targetSection.classList.contains('tldr-box') || 
            targetSection.classList.contains('results-preview') ||
            targetSection.classList.contains('prerequisites-box') ||
            targetSection.classList.contains('tools-needed'))) {
            toggleSection(targetSection);
        }
    }
}

// Initialize auto-expand after a short delay
setTimeout(autoExpandSections, 500);

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target.closest('.section-header');
        if (target) {
            e.preventDefault();
            const section = target.closest('.tldr-box, .results-preview, .prerequisites-box, .tools-needed');
            if (section) {
                toggleSection(section);
            }
        }
    }
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .section-header:focus {
        outline: 2px solid var(--accent-color, #008753);
        outline-offset: 2px;
    }
    
    .section-header {
        -webkit-tap-highlight-color: rgba(0, 135, 83, 0.1);
    }
`;
document.head.appendChild(style);
