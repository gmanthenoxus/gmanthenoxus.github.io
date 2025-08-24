// Sharing Utilities
// Social sharing and clipboard functionality

/**
 * Share content using Web Share API or fallback methods
 * @param {Object} shareData - Data to share
 * @param {string} shareData.title - Title to share
 * @param {string} shareData.text - Text to share
 * @param {string} shareData.url - URL to share
 */
export function shareContent(shareData) {
    if (navigator.share) {
        navigator.share(shareData).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareData.text);
        });
    } else {
        fallbackShare(shareData.text);
    }
}

/**
 * Fallback sharing method using clipboard
 * @param {string} text - Text to copy to clipboard
 */
export function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showShareNotification('Content copied to clipboard!');
        }).catch(() => {
            showShareModal(text);
        });
    } else {
        showShareModal(text);
    }
}

/**
 * Show share notification
 * @param {string} message - Notification message
 * @param {Object} options - Notification options
 */
export function showShareNotification(message, options = {}) {
    const {
        duration = 3000,
        position = 'top-right',
        backgroundColor = '#4CAF50'
    } = options;

    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.textContent = message;
    
    const positions = {
        'top-right': 'top: 20px; right: 20px;',
        'top-left': 'top: 20px; left: 20px;',
        'bottom-right': 'bottom: 20px; right: 20px;',
        'bottom-left': 'bottom: 20px; left: 20px;'
    };
    
    notification.style.cssText = `
        position: fixed;
        ${positions[position] || positions['top-right']}
        background: ${backgroundColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/**
 * Show share modal for older browsers
 * @param {string} text - Text to share
 */
export function showShareModal(text) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <h3>Share this content</h3>
            <textarea readonly>${text}</textarea>
            <div class="share-modal-actions">
                <button class="btn-primary" onclick="this.previousElementSibling.select(); document.execCommand('copy'); this.textContent='Copied!';">Copy Text</button>
                <button class="btn-secondary" onclick="document.body.removeChild(this.closest('.share-modal'))">Close</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

/**
 * Share trivia question
 * @param {string} question - Trivia question
 * @param {string} hobbyTitle - Hobby title
 * @param {string} url - Current URL
 */
export function shareTrivia(question, hobbyTitle, url) {
    const shareText = `🧠 ${hobbyTitle} Trivia Challenge!\n\n${question}\n\nThink you know the answer? Test your knowledge!`;
    
    shareContent({
        title: 'Trivia Challenge',
        text: shareText,
        url: url
    });
}

/**
 * Share fun fact
 * @param {string} title - Fact title
 * @param {string} description - Fact description
 * @param {string} hobbyTitle - Hobby title
 * @param {string} url - Current URL
 */
export function shareFunFact(title, description, hobbyTitle, url) {
    const shareText = `🎯 ${title}\n\n${description}\n\n#${hobbyTitle.replace(/\s+/g, '')} #FunFacts`;
    
    shareContent({
        title: `${title} - ${hobbyTitle}`,
        text: shareText,
        url: url
    });
}

/**
 * Initialize sharing functionality for elements
 * @param {string} selector - CSS selector for share buttons
 * @param {Function} getShareData - Function to extract share data from element
 */
export function initializeSharing(selector, getShareData) {
    const shareButtons = document.querySelectorAll(selector);
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const shareData = getShareData(this);
            if (shareData) {
                shareContent(shareData);
            }
        });
    });
}

/**
 * Email validation utility
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add required CSS animations if not already present
export function addSharingStyles() {
    if (document.querySelector('#sharing-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'sharing-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .share-modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .share-modal-content h3 {
            margin-top: 0;
            color: #2D3747;
        }
        
        .share-modal-content textarea {
            width: 100%;
            height: 120px;
            padding: 1rem;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            font-family: inherit;
            font-size: 0.9rem;
            line-height: 1.5;
            resize: vertical;
            margin-bottom: 1rem;
        }
        
        .share-modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        }
        
        .share-modal-actions button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .share-modal-actions .btn-primary {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }
        
        .share-modal-actions .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .share-modal-actions .btn-secondary {
            background: #E2E8F0;
            color: #4A5568;
        }
        
        .share-modal-actions .btn-secondary:hover {
            background: #CBD5E0;
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize styles when module is imported
addSharingStyles();
