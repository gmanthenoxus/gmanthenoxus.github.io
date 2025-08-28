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
        this.todoItems.forEach(item => {
            const checkbox = item.querySelector('.todo-checkbox');
            const isCompleted = item.classList.contains('completed');
            
            if (checkbox && !isCompleted) {
                // Make incomplete tasks interactive
                item.style.cursor = 'pointer';
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.setAttribute('aria-label', 'Toggle task completion');
                
                // Add click handler
                item.addEventListener('click', (e) => {
                    this.toggleTodoItem(item, e);
                });
                
                // Add keyboard handler
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleTodoItem(item, e);
                    }
                });
                
                // Add hover effects
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(4px)';
                    item.style.transition = 'transform 0.2s ease';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0)';
                });
            }
        });
    }
    
    toggleTodoItem(item, event) {
        event.stopPropagation();
        
        const checkbox = item.querySelector('.todo-checkbox');
        const todoText = item.querySelector('.todo-text');
        
        if (!checkbox || !todoText) return;
        
        // Toggle completed state
        const wasCompleted = item.classList.contains('completed');
        
        if (!wasCompleted) {
            // Mark as completed
            item.classList.add('completed');
            checkbox.textContent = '✅';
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = '#9CA3AF';
            
            // Add completion animation
            item.style.transform = 'scale(1.02)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
            
            // Show completion feedback
            this.showCompletionFeedback(item);
            
            // Update progress bar
            this.updateTodoProgress();
            
            // Remove interactivity
            item.style.cursor = 'default';
            item.removeAttribute('role');
            item.removeAttribute('tabindex');
            item.removeAttribute('aria-label');
            
        } else {
            // Mark as incomplete (allow unchecking)
            item.classList.remove('completed');
            checkbox.textContent = '⬜';
            todoText.style.textDecoration = 'none';
            todoText.style.color = '';
            
            // Update progress bar
            this.updateTodoProgress();
        }
        
        // Announce change to screen readers
        this.announceTaskChange(todoText.textContent, !wasCompleted);
    }
    
    updateTodoProgress() {
        const todoList = document.querySelector('.todo-list');
        if (!todoList) return;
        
        const allTodos = todoList.querySelectorAll('.todo-item');
        const completedTodos = todoList.querySelectorAll('.todo-item.completed');
        
        const progressBar = document.querySelector('.todo-progress-fill');
        const progressText = document.querySelector('.todo-progress-text');
        
        if (progressBar && progressText && allTodos.length > 0) {
            const percentage = Math.round((completedTodos.length / allTodos.length) * 100);
            
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${completedTodos.length} of ${allTodos.length} tasks completed`;
            
            // Add visual feedback for milestones
            if (percentage === 100) {
                progressBar.classList.add('progress-complete');
                this.showMilestoneAchieved('All tasks completed! 🎉');
            } else if (percentage >= 75 && !progressBar.classList.contains('progress-75')) {
                progressBar.classList.add('progress-75');
                this.showMilestoneAchieved('75% complete! Almost there! 💪');
            } else if (percentage >= 50 && !progressBar.classList.contains('progress-50')) {
                progressBar.classList.add('progress-50');
                this.showMilestoneAchieved('Halfway there! Keep going! 🚀');
            }
        }
    }
    
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
    
    showCompletionFeedback(item) {
        // Create floating checkmark
        const feedback = document.createElement('div');
        feedback.className = 'completion-feedback';
        feedback.innerHTML = '✅';
        feedback.style.cssText = `
            position: absolute;
            right: -30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2em;
            opacity: 0;
            pointer-events: none;
            z-index: 10;
            animation: completionPop 0.6s ease-out forwards;
        `;
        
        item.style.position = 'relative';
        item.appendChild(feedback);
        
        // Remove after animation
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 600);
    }
    
    showMilestoneAchieved(message) {
        // Create milestone notification
        const notification = document.createElement('div');
        notification.className = 'milestone-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 600;
            font-size: 0.9rem;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    announceTaskChange(taskText, completed) {
        const message = completed ? 
            `Task completed: ${taskText}` : 
            `Task marked incomplete: ${taskText}`;
            
        // Create temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Public method to manually update progress
    updateProgress() {
        this.updateTodoProgress();
        this.animateProgressBars();
    }
    
    // Public method to get completion statistics
    getCompletionStats() {
        const allTodos = document.querySelectorAll('.todo-item');
        const completedTodos = document.querySelectorAll('.todo-item.completed');
        
        return {
            total: allTodos.length,
            completed: completedTodos.length,
            percentage: allTodos.length > 0 ? Math.round((completedTodos.length / allTodos.length) * 100) : 0
        };
    }
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
