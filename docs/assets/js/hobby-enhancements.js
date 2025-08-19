// Enhanced Hobby Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Fun Facts Sharing Functionality
    const shareButtons = document.querySelectorAll('.fact-share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const factCard = this.closest('.fact-card');
            const title = factCard.querySelector('h3').textContent;
            const description = factCard.querySelector('p').textContent;
            const hobbyTitle = document.querySelector('.hobby-hero h1').textContent;
            
            // Create shareable text
            const shareText = `🎯 ${title}\n\n${description}\n\n#${hobbyTitle.replace(/\s+/g, '')} #FunFacts`;
            
            // Try to use Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: `${title} - ${hobbyTitle}`,
                    text: shareText,
                    url: window.location.href
                }).catch(err => {
                    console.log('Error sharing:', err);
                    fallbackShare(shareText);
                });
            } else {
                fallbackShare(shareText);
            }
        });
    });
    
    // Fallback sharing method
    function fallbackShare(text) {
        // Copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showShareNotification('Fact copied to clipboard!');
            }).catch(() => {
                showShareModal(text);
            });
        } else {
            showShareModal(text);
        }
    }
    
    // Show share notification
    function showShareNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'share-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Show share modal for older browsers
    function showShareModal(text) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <h3>Share this fact</h3>
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
    }
    
    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
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
});
