// Blog Engagement Features
document.addEventListener('DOMContentLoaded', () => {
    
    // Read Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'read-progress';
    document.body.appendChild(progressBar);
    
    function updateReadProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
    
    window.addEventListener('scroll', updateReadProgress);
    updateReadProgress(); // Initial call
    
    // Interactive Question Responses
    const responseButtons = document.querySelectorAll('.response-btn');
    responseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentNode.querySelectorAll('.response-btn');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Optional: Track response (could send to analytics)
            const response = this.dataset.response;
            console.log('User response:', response);
            
            // Show a thank you message
            setTimeout(() => {
                const thankYou = document.createElement('p');
                thankYou.textContent = response === 'yes' ? 
                    "You're not alone! This quest is for people like us. 🚀" : 
                    "That's great! Maybe you've already found your passion-skills balance. 😊";
                thankYou.style.cssText = `
                    color: #10b981;
                    font-weight: 600;
                    margin-top: 1rem;
                    text-align: center;
                    animation: fadeIn 0.5s ease-in;
                `;
                
                // Add fadeIn animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `;
                document.head.appendChild(style);
                
                this.parentNode.appendChild(thankYou);
            }, 300);
        });
    });
    
    // Pull Quote Click to Copy
    const pullQuotes = document.querySelectorAll('.pull-quote');
    pullQuotes.forEach(quote => {
        quote.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopyNotification(this);
                }).catch(() => {
                    // Fallback for older browsers
                    fallbackCopyText(text);
                    showCopyNotification(this);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyText(text);
                showCopyNotification(this);
            }
        });
        
        // Add cursor pointer and title
        quote.style.cursor = 'pointer';
        quote.title = 'Click to copy quote';
    });
    
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    function showCopyNotification(element) {
        const notification = document.createElement('div');
        notification.textContent = 'Quote copied! 📋';
        notification.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 1000;
            animation: copyNotification 2s ease-in-out forwards;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes copyNotification {
                0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        element.style.position = 'relative';
        element.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2000);
    }
    
    // Lazy Loading for Images (if any are added later)
    const blogImages = document.querySelectorAll('.blog-visuals img[data-src]');
    if (blogImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        blogImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat .number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateNumber(element) {
        const target = parseInt(element.textContent);
        const duration = 1500;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target; // Ensure final value is exact
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Enhanced Social Sharing
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.dataset.url || window.location.href;
            const title = this.dataset.title || document.title;
            const text = this.dataset.text || title;
            
            if (this.classList.contains('twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('linkedin')) {
                const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                window.open(linkedinUrl, '_blank', 'width=600,height=400');
            } else if (this.classList.contains('copy')) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(url).then(() => {
                        showCopyNotification(this);
                    });
                } else {
                    fallbackCopyText(url);
                    showCopyNotification(this);
                }
            }
        });
    });
});
