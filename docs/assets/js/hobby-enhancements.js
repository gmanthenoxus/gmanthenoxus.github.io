// Enhanced Hobby Page Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Scroll Reveal Animation System
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(element => {
        scrollRevealObserver.observe(element);
    });

    // Quote Rotation System
    const quoteItems = document.querySelectorAll('.quote-item');
    if (quoteItems.length > 1) {
        let currentQuoteIndex = 0;

        function rotateQuote() {
            // Hide current quote
            quoteItems[currentQuoteIndex].style.opacity = '0';

            // Move to next quote
            currentQuoteIndex = (currentQuoteIndex + 1) % quoteItems.length;

            // Show next quote
            setTimeout(() => {
                quoteItems.forEach((item, index) => {
                    item.style.opacity = index === currentQuoteIndex ? '1' : '0';
                });
            }, 800);
        }

        // Rotate quotes every 8 seconds
        setInterval(rotateQuote, 8000);
    }

    // Trivia System - No action needed, handled by global function
    // The selectAnswer function is defined globally below

    // Trivia sharing functionality
    function shareTrivia(text, url) {
        if (navigator.share) {
            navigator.share({
                title: 'Trivia Challenge',
                text: text,
                url: url
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(text);
            });
        } else {
            fallbackShare(text);
        }
    }

    // Fun Facts Sharing Functionality - handled by global shareFact function
    // The shareFact function is defined globally below
    
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
    const progressBars = document.querySelectorAll('.progress-bar');

    // Animate progress bars when they come into view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.dataset.progress || 0;

                // Animate from 0 to target width
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
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

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
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

// Global function for trivia answer selection
window.selectAnswer = function(questionIndex, answerIndex) {
    const triviaCard = document.querySelectorAll('.trivia-card')[questionIndex];
    if (!triviaCard) return;

    const buttons = triviaCard.querySelectorAll('.option-btn');
    const feedback = triviaCard.querySelector('.trivia-feedback');

    // Get correct answer from data attribute
    const correctAnswer = parseInt(triviaCard.dataset.correctAnswer);
    const isCorrect = answerIndex === correctAnswer;

    // Disable all buttons
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        btn.style.opacity = '0.7';
    });

    // Highlight selected and correct answers
    buttons.forEach((btn, index) => {
        if (index === correctAnswer) {
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            btn.style.color = 'white';
            btn.style.borderColor = '#10B981';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.02)';
            btn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
        } else if (index === answerIndex && !isCorrect) {
            btn.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
            btn.style.color = 'white';
            btn.style.borderColor = '#EF4444';
            btn.style.opacity = '1';
            btn.style.transform = 'scale(0.98)';
            btn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
        }
    });

    // Show feedback with animation
    if (feedback) {
        feedback.style.display = 'block';
        feedback.style.marginTop = '1.5rem';
        feedback.style.padding = '1.25rem';
        feedback.style.borderRadius = '12px';
        feedback.style.background = isCorrect ? '#D1FAE5' : '#FEE2E2';
        feedback.style.border = isCorrect ? '2px solid #10B981' : '2px solid #EF4444';
        feedback.style.color = isCorrect ? '#065F46' : '#991B1B';
        feedback.style.animation = 'fadeIn 0.3s ease';
        feedback.style.fontSize = '0.95rem';
        feedback.style.lineHeight = '1.6';
    }
};

// Global function for sharing fun facts
window.shareFact = function(title, description) {
    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const shareText = `🎯 ${title}\n\n${description}\n\n#${hobbyTitle.replace(/\s+/g, '')} #FunFacts`;

    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: `${title} - ${hobbyTitle}`,
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
};

// Helper function to copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// Fallback copy method
function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========================================
// STATISTICS DASHBOARD ENHANCEMENTS
// ========================================

// Time Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const timeFilterBtns = document.querySelectorAll('.time-filter-btn');
    timeFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timeFilterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected period
            const period = this.dataset.period;

            // Update stats based on period
            updateStatsForPeriod(period);
        });
    });

    function updateStatsForPeriod(period) {
        // Visual feedback during update
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            statsGrid.style.opacity = '0.5';
            statsGrid.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                statsGrid.style.opacity = '1';
            }, 300);
        }

        console.log(`Stats updated for period: ${period}`);
        // In a real implementation, this would fetch data from an API
    }

    // Mini Chart Rendering
    const miniCharts = document.querySelectorAll('.mini-chart');
    miniCharts.forEach(canvas => {
        const chartData = canvas.dataset.chart;
        if (chartData) {
            const data = chartData.split(',').map(Number);
            drawMiniChart(canvas, data);
        }
    });

    function drawMiniChart(canvas, data) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 5;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Find min and max values
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        // Calculate points
        const points = data.map((value, index) => {
            const x = padding + (index / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((value - min) / range) * (height - padding * 2);
            return { x, y };
        });

        // Get hobby color
        const hobbyColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--hobby-color').trim() || '#667eea';

        // Draw line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.strokeStyle = hobbyColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw area under line
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.lineTo(points[0].x, height - padding);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, hobbyColor + '40');
        gradient.addColorStop(1, hobbyColor + '00');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw points
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = hobbyColor;
            ctx.fill();
        });
    }

    // Animate milestone badges on scroll
    const milestoneBadges = document.querySelectorAll('.stat-milestone.reached');
    const milestoneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'milestoneGlow 2s ease-in-out infinite';
                milestoneObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    milestoneBadges.forEach(badge => milestoneObserver.observe(badge));

    // Animate trend indicators
    const trendIndicators = document.querySelectorAll('.stat-trend');
    const trendObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('i');
                if (icon) {
                    icon.style.animation = 'bounce 0.5s ease';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 500);
                }
                trendObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    trendIndicators.forEach(indicator => trendObserver.observe(indicator));
});
