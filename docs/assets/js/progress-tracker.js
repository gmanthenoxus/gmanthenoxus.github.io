/**
 * Progress Tracking System
 * Handles visual progress bars, task management, and milestone tracking
 */

class ProgressTracker {
    constructor() {
        this.progressBars = document.querySelectorAll('.progress-fill, .todo-progress-fill');
        this.todoItems = document.querySelectorAll('.todo-item');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        
        this.init();
    }
    
    init() {
        this.animateProgressBars();
        this.initializeTodoInteractions();
        this.animateTimeline();
        this.setupIntersectionObserver();
        
        console.log('Progress tracking system initialized');
    }
    
    animateProgressBars() {
        this.progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            
            // Start from 0 width
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Animate to target width with staggered delay
            setTimeout(() => {
                bar.style.width = targetWidth;
                
                // Add pulse effect when animation completes
                setTimeout(() => {
                    bar.classList.add('progress-complete');
                }, 1500);
            }, index * 200);
        });
    }
    
    initializeTodoInteractions() {
        // TODO items are read-only for public viewers
        // No interactions enabled - this is for display purposes only
        // Admin functionality will be added in future updates

        console.log('TODO items are in read-only mode for public viewers');
    }
    
    // Removed toggleTodoItem - TODO items are read-only for public viewers
    // Removed updateTodoProgress - Progress is static based on project data
    
    animateTimeline() {
        this.timelineItems.forEach((item, index) => {
            const marker = item.querySelector('.timeline-marker');
            const content = item.querySelector('.timeline-content');
            
            if (marker && content) {
                // Initial state
                marker.style.transform = 'scale(0)';
                content.style.opacity = '0';
                content.style.transform = 'translateX(-20px)';
                
                // Animate with staggered delay
                setTimeout(() => {
                    marker.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    
                    marker.style.transform = 'scale(1)';
                    content.style.opacity = '1';
                    content.style.transform = 'translateX(0)';
                    
                    // Add completion pulse for completed items
                    if (item.classList.contains('completed')) {
                        setTimeout(() => {
                            marker.style.animation = 'pulse 2s infinite';
                        }, 400);
                    }
                }, index * 150);
            }
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('project-stats-mini')) {
                        this.animateStats(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animatableElements = document.querySelectorAll(
            '.project-stats-mini, .sidebar-section, .timeline-item'
        );
        
        animatableElements.forEach(el => observer.observe(el));
    }
    
    animateStats(statsContainer) {
        const statValues = statsContainer.querySelectorAll('.stat-value');
        
        statValues.forEach((statValue, index) => {
            const finalValue = statValue.textContent;
            const isNumeric = /^\d+/.test(finalValue);
            
            if (isNumeric) {
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                const suffix = finalValue.replace(/^\d+/, '');
                
                // Animate number counting
                let currentValue = 0;
                const increment = Math.ceil(numericValue / 30);
                const duration = 1000;
                const stepTime = duration / (numericValue / increment);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(counter);
                    }
                    statValue.textContent = currentValue + suffix;
                }, stepTime);
            }
        });
    }
    
    // Removed showCompletionFeedback - No longer needed for read-only TODOs
    // Removed showMilestoneAchieved - No longer needed for read-only TODOs
    // Removed announceTaskChange - No longer needed for read-only TODOs
    // Removed updateProgress - No longer needed for read-only TODOs
    // Removed getCompletionStats - No longer needed for read-only TODOs
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes completionPop {
        0% { opacity: 0; transform: translateY(-50%) scale(0.5); }
        50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
        100% { opacity: 0; transform: translateY(-50%) scale(1); }
    }
    
    .progress-complete {
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.project-page')) {
        window.progressTracker = new ProgressTracker();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
