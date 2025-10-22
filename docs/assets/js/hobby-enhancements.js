// Enhanced Hobby Page Functionality
document.addEventListener('DOMContentLoaded', function() {

    // Dynamic Color System - Convert hex to RGB and create color variants
    const hobbyPage = document.querySelector('.hobby-page');
    if (hobbyPage) {
        const hobbyColor = getComputedStyle(hobbyPage).getPropertyValue('--hobby-color').trim();

        // Convert hex to RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        const rgb = hexToRgb(hobbyColor);
        if (rgb) {
            // Set color variants as CSS custom properties
            hobbyPage.style.setProperty('--hobby-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            hobbyPage.style.setProperty('--hobby-color-alpha', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
            hobbyPage.style.setProperty('--hobby-color-light', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
            hobbyPage.style.setProperty('--hobby-color-dark', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
        }
    }

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

    // Quote System - Simple Smooth Transitions
    const quoteCards = document.querySelectorAll('.hobby-quote-card');

    if (quoteCards.length > 0) {
        let currentQuoteIndex = 0;
        let autoRotateTimeout;
        const TRANSITION_DURATION = 1000; // 1 second smooth fade
        const SHORT_QUOTE_DISPLAY = 8000; // 8 seconds for short quotes
        const LONG_QUOTE_DISPLAY = 12000; // 12 seconds for long quotes
        const LONG_QUOTE_THRESHOLD = 100; // Characters

        // Calculate display time based on quote length
        function calculateDisplayTime(text) {
            return text.length <= LONG_QUOTE_THRESHOLD ? SHORT_QUOTE_DISPLAY : LONG_QUOTE_DISPLAY;
        }

        // Show specific quote with smooth transition
        function showQuote(index) {
            // Clear any pending rotation
            if (autoRotateTimeout) {
                clearTimeout(autoRotateTimeout);
            }

            // Fade out current quote
            const currentCard = quoteCards[currentQuoteIndex];
            currentCard.classList.remove('active');

            // Wait for fade out, then fade in new quote
            setTimeout(() => {
                const newCard = quoteCards[index];
                const quoteText = newCard.querySelector('.hobby-quote-text');

                if (quoteText) {
                    const fullText = quoteText.getAttribute('data-full-text');

                    // Fade in the card
                    newCard.classList.add('active');

                    // Schedule next rotation after reading time
                    const displayTime = calculateDisplayTime(fullText);
                    autoRotateTimeout = setTimeout(() => {
                        nextQuote();
                    }, displayTime);
                }

                currentQuoteIndex = index;
            }, TRANSITION_DURATION);
        }

        // Move to next quote
        function nextQuote() {
            const nextIndex = (currentQuoteIndex + 1) % quoteCards.length;
            showQuote(nextIndex);
        }

        // Initialize - show first quote
        quoteCards[0].classList.add('active');
        const firstQuoteText = quoteCards[0].querySelector('.hobby-quote-text');
        if (firstQuoteText && quoteCards.length > 1) {
            const fullText = firstQuoteText.getAttribute('data-full-text');
            const displayTime = calculateDisplayTime(fullText);
            autoRotateTimeout = setTimeout(() => {
                nextQuote();
            }, displayTime);
        }

        // Pause auto-rotate on hover
        const quotesSection = document.querySelector('.hobby-quotes-section');
        if (quotesSection && quoteCards.length > 1) {
            quotesSection.addEventListener('mouseenter', () => {
                if (autoRotateTimeout) {
                    clearTimeout(autoRotateTimeout);
                }
            });

            quotesSection.addEventListener('mouseleave', () => {
                const currentQuoteText = quoteCards[currentQuoteIndex].querySelector('.hobby-quote-text');
                if (currentQuoteText) {
                    const fullText = currentQuoteText.getAttribute('data-full-text');
                    const displayTime = calculateDisplayTime(fullText);
                    autoRotateTimeout = setTimeout(() => {
                        nextQuote();
                    }, displayTime);
                }
            });
        }
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
    const triviaCard = document.querySelectorAll('.hobby-trivia-card')[questionIndex];
    if (!triviaCard) return;

    const buttons = triviaCard.querySelectorAll('.hobby-option-btn');
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

// Fun Facts - No toggle needed, responsive grid handles layout

// ========================================
// TRIVIA SECTION - ALL OPTIONS
// ========================================

// Trivia toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const triviaToggles = document.querySelectorAll('.hobby-trivia-section .hobby-toggle-btn');
    const triviaContainers = document.querySelectorAll('.hobby-trivia-container[class*="trivia-option"]');

    triviaToggles.forEach(btn => {
        btn.addEventListener('click', function() {
            const design = this.getAttribute('data-design');

            // Remove active from all
            triviaToggles.forEach(b => b.classList.remove('active'));
            triviaContainers.forEach(container => container.classList.remove('active'));

            // Add active to selected
            this.classList.add('active');
            const selectedContainer = document.querySelector(`.trivia-${design}`);
            if (selectedContainer) {
                selectedContainer.classList.add('active');
            }
        });
    });

    // Initialize Option A
    initOptionA();

    // Initialize Option B
    initOptionB();

    // Initialize Option C
    initOptionC();

    // Initialize Option D
    initOptionD();
});

// ========================================
// OPTION A: Enhanced with Score & Share
// ========================================

let scoreA = 0;
let answeredA = [];

function initOptionA() {
    const totalQuestions = document.querySelectorAll('.hobby-trivia-card-a').length;

    // Initialize progress dots
    const progressContainer = document.getElementById('progressA');
    if (progressContainer) {
        progressContainer.innerHTML = '';
        for (let i = 0; i < totalQuestions; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.setAttribute('data-index', i);
            progressContainer.appendChild(dot);
        }
    }

    // Add click handlers to option buttons
    document.querySelectorAll('.hobby-option-btn-a').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.hobby-trivia-card-a[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons in this question
            card.querySelectorAll('.hobby-option-btn-a').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
                scoreA++;
                updateProgressDot(questionIndex, 'correct');
            } else {
                this.classList.add('incorrect');
                // Show correct answer
                card.querySelectorAll('.hobby-option-btn-a')[correctAnswer].classList.add('correct');
                updateProgressDot(questionIndex, 'incorrect');
            }

            // Update score
            document.getElementById('scoreA').textContent = scoreA;

            // Show feedback
            const feedback = card.querySelector('.feedback-a');
            const feedbackIcon = feedback.querySelector('.feedback-icon');
            const feedbackTitle = feedback.querySelector('.feedback-title');

            if (isCorrect) {
                feedbackIcon.textContent = '🎉';
                feedbackTitle.textContent = 'Awesome! You got it right!';
                feedbackTitle.style.color = '#10b981';
            } else {
                feedbackIcon.textContent = '💭';
                feedbackTitle.textContent = 'Not quite, but great try!';
                feedbackTitle.style.color = '#ef4444';
            }

            feedback.style.display = 'block';

            // Mark as answered
            answeredA[questionIndex] = true;

            // Check if all answered
            if (answeredA.filter(Boolean).length === totalQuestions) {
                setTimeout(() => showCompletionA(totalQuestions), 1000);
            }
        });
    });
}

function updateProgressDot(index, status) {
    const dot = document.querySelector(`#progressA .dot[data-index="${index}"]`);
    if (dot) {
        dot.classList.add(status);
    }
}

function showCompletionA(total) {
    document.querySelectorAll('.hobby-trivia-card-a').forEach(card => card.style.display = 'none');
    const completion = document.getElementById('completionA');
    completion.style.display = 'block';

    document.getElementById('finalScoreA').textContent = scoreA;

    const percentage = (scoreA / total) * 100;
    const message = document.getElementById('messageA');

    if (percentage === 100) {
        message.textContent = "Perfect score! You're an anime master! 🏆";
    } else if (percentage >= 80) {
        message.textContent = "Excellent work! You really know your anime! 🌟";
    } else if (percentage >= 60) {
        message.textContent = "Good job! You're on your way to becoming an expert! 👍";
    } else {
        message.textContent = "Keep watching and learning! Every expert was once a beginner! 📚";
    }
}

window.resetQuiz = function(option) {
    if (option === 'A') {
        scoreA = 0;
        answeredA = [];
        document.getElementById('scoreA').textContent = '0';
        document.getElementById('completionA').style.display = 'none';

        document.querySelectorAll('.hobby-trivia-card-a').forEach(card => {
            card.style.display = 'block';
            card.querySelectorAll('.hobby-option-btn-a').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('correct', 'incorrect');
            });
            card.querySelector('.feedback-a').style.display = 'none';
        });

        document.querySelectorAll('#progressA .dot').forEach(dot => {
            dot.classList.remove('correct', 'incorrect', 'active');
        });
    } else if (option === 'B') {
        // Reset to start screen
        document.getElementById('completionB').style.display = 'none';
        document.getElementById('startScreenB').style.display = 'block';

        // Reset variables
        scoreB = 0;
        currentQuestionB = 0;
        answersB = [];

        // Reset all cards
        document.querySelectorAll('.hobby-trivia-card-b').forEach(card => {
            card.querySelectorAll('.hobby-option-btn-b').forEach(btn => {
                btn.disabled = false;
            });
        });

        // Reset progress dots
        document.querySelectorAll('#progressDotsB .progress-dot').forEach(dot => {
            dot.classList.remove('active', 'completed', 'skipped');
        });
    }
};

// Initialize hobby navigation buttons
function initHobbyNavigation() {
    const hobbies = [
        { name: 'Anime', icon: 'fas fa-tv', url: '/hobbies/anime', color: '#FF6B9D', description: 'From Bleach\'s first Bankai to the depths of isekai' },
        { name: 'Fitness', icon: 'fas fa-dumbbell', url: '/hobbies/fitness', color: '#4ECDC4', description: 'From forced punishment to purposeful strength' },
        { name: 'Games', icon: 'fas fa-gamepad', url: '/hobbies/games', color: '#9B59B6', description: 'From Nintendo 64 magic to midnight lobbies' },
        { name: 'Music', icon: 'fas fa-music', url: '/hobbies/music', color: '#E91E63', description: 'From indie to pop. Building active music discovery companions' },
        { name: 'Shoes', icon: 'fas fa-shoe-prints', url: '/hobbies/shoes', color: '#95A5A6', description: 'Artistic expression meets perfect comfort' },
        { name: 'Sports', icon: 'fas fa-basketball-ball', url: '/hobbies/sports', color: '#2E86AB', description: 'Where passion meets performance' },
        { name: 'Tech', icon: 'fas fa-laptop-code', url: '/hobbies/tech', color: '#E3F2FD', description: 'Exploring the cutting edge of technology' }
    ];

    const currentHobby = document.querySelector('.hobby-hero h1')?.textContent.trim() || '';
    const navContainer = document.getElementById('hobbyNavButtons');

    if (navContainer) {
        navContainer.innerHTML = '';

        // Filter out current hobby
        const otherHobbies = hobbies.filter(h => h.name !== currentHobby);

        // Shuffle array to get random order
        const shuffled = [...otherHobbies].sort(() => 0.5 - Math.random());

        // Take first 3 unique hobbies (no duplicates possible with this method)
        const selectedHobbies = shuffled.slice(0, 3);

        selectedHobbies.forEach(hobby => {
            const btn = document.createElement('a');
            btn.href = hobby.url;
            btn.className = 'hobby-nav-btn';
            btn.style.setProperty('--btn-hobby-color', hobby.color);
            btn.innerHTML = `<i class="${hobby.icon}"></i> ${hobby.name}`;
            navContainer.appendChild(btn);
        });
    }
}

// Initialize "Explore Other Hobbies" section (circular navigation)
function initExploreHobbies() {
    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const hobbies = [
        { name: 'Anime', icon: 'fas fa-tv', url: '/hobbies/anime', color: '#FF6B9D', description: 'From Bleach\'s first Bankai to the depths of isekai' },
        { name: 'Fitness', icon: 'fas fa-dumbbell', url: '/hobbies/fitness', color: '#4ECDC4', description: 'From forced punishment to purposeful strength' },
        { name: 'Games', icon: 'fas fa-gamepad', url: '/hobbies/games', color: '#9B59B6', description: 'From Nintendo 64 magic to midnight lobbies' },
        { name: 'Music', icon: 'fas fa-music', url: '/hobbies/music', color: '#E91E63', description: 'From indie to pop. Building active music discovery companions' },
        { name: 'Shoes', icon: 'fas fa-shoe-prints', url: '/hobbies/shoes', color: '#95A5A6', description: 'Artistic expression meets perfect comfort' },
        { name: 'Sports', icon: 'fas fa-basketball-ball', url: '/hobbies/sports', color: '#2E86AB', description: 'Where passion meets performance' },
        { name: 'Tech', icon: 'fas fa-laptop-code', url: '/hobbies/tech', color: '#E3F2FD', description: 'Exploring the cutting edge of technology' }
    ];

    const currentHobbyTitle = document.querySelector('.hobby-hero h1')?.textContent.trim() || '';
    const gridContainer = document.getElementById('otherHobbiesGrid');

    if (gridContainer) {
        gridContainer.innerHTML = '';

        // Find current hobby index by checking if title contains hobby name
        const currentIndex = hobbies.findIndex(h => currentHobbyTitle.includes(h.name));

        if (currentIndex !== -1) {
            // Calculate previous and next indices (circular)
            const prevIndex = (currentIndex - 1 + hobbies.length) % hobbies.length;
            const nextIndex = (currentIndex + 1) % hobbies.length;

            // Get previous and next hobbies
            const prevHobby = hobbies[prevIndex];
            const nextHobby = hobbies[nextIndex];

            // Create cards for previous and next hobbies
            [prevHobby, nextHobby].forEach((hobby) => {
                const card = document.createElement('a');
                card.href = hobby.url;
                card.className = 'hobby-explore-card';
                card.style.setProperty('--card-hobby-color', hobby.color);

                // Calculate alpha and light colors for backgrounds
                const rgb = hexToRgb(hobby.color);
                if (rgb) {
                    card.style.setProperty('--card-hobby-color-alpha', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`);
                    card.style.setProperty('--card-hobby-color-light', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
                }

                card.innerHTML = `
                    <div class="hobby-explore-icon">
                        <i class="${hobby.icon}"></i>
                    </div>
                    <div class="hobby-explore-content">
                        <h3 class="hobby-explore-name">${hobby.name}</h3>
                    </div>
                `;

                gridContainer.appendChild(card);
            });
        }
    }
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Share score with image capture
window.shareScoreWithImage = async function(option) {
    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const pageUrl = window.location.href;
    let score, total, time, message, shareTitle, completionCardId;

    if (option === 'A') {
        score = scoreA;
        total = document.querySelectorAll('.trivia-card-a').length;
        shareTitle = `${hobbyTitle} Trivia Score`;
        message = `🎯 I scored ${score}/${total} on the ${hobbyTitle} trivia quiz!`;
        completionCardId = 'completionCardA';
    } else if (option === 'B') {
        score = scoreB;
        total = document.querySelectorAll('.hobby-trivia-card-b').length;
        time = document.getElementById('totalTimeB').textContent;
        shareTitle = `${hobbyTitle} Trivia Score`;
        message = `⏱️ I scored ${score}/${total} in ${time}s on the ${hobbyTitle} timed quiz!`;
        completionCardId = 'completionCardB';
    }

    const shareText = `${shareTitle}
${pageUrl}

${message}

Think you can beat my score? Try it here:
${pageUrl}

#${hobbyTitle.replace(/\s+/g, '')} #TriviaChallenge #QuizTime`;

    // Try to capture completion card as image
    try {
        const completionCard = document.getElementById(completionCardId);

        if (completionCard && typeof html2canvas !== 'undefined') {
            showNotification('Generating image... 📸');

            // Capture the card as canvas
            const canvas = await html2canvas(completionCard, {
                backgroundColor: null,
                scale: 2, // Higher quality
                logging: false,
                useCORS: true
            });

            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                if (blob) {
                    // Always try to share with both image and text
                    if (navigator.share) {
                        try {
                            const file = new File([blob], `${hobbyTitle.toLowerCase().replace(/\s+/g, '-')}-quiz-score.png`, { type: 'image/png' });

                            // Try sharing with file first
                            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                                await navigator.share({
                                    title: shareTitle,
                                    text: shareText,
                                    files: [file]
                                });
                                showNotification('Score shared successfully! 🎉');
                                return;
                            }
                        } catch (err) {
                            if (err.name !== 'AbortError') {
                                console.log('Share with image failed:', err);
                            } else {
                                return; // User cancelled
                            }
                        }
                    }

                    // Fallback: Download image and copy text
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${hobbyTitle.toLowerCase().replace(/\s+/g, '-')}-quiz-score.png`;
                    a.click();
                    URL.revokeObjectURL(url);

                    // Copy text to clipboard
                    copyToClipboard(shareText);
                    showNotification('✅ Image downloaded! Share text copied to clipboard 📋');
                } else {
                    // Fallback to text only
                    shareTextOnly();
                }
            }, 'image/png');
        } else {
            // html2canvas not available, share text only
            shareTextOnly();
        }
    } catch (err) {
        console.error('Error capturing image:', err);
        shareTextOnly();
    }

    // Helper function for text-only sharing
    function shareTextOnly() {
        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                text: shareText,
                url: pageUrl
            }).then(() => {
                showNotification('Score shared successfully! 🎉');
            }).catch(err => {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareText);
                }
            });
        } else {
            copyToClipboard(shareText);
        }
    }
};

window.shareScore = function(option) {
    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const pageUrl = window.location.href;
    let score, total, message;

    if (option === 'A') {
        score = scoreA;
        total = document.querySelectorAll('.hobby-trivia-card-a').length;
        message = `🧠 I scored ${score}/${total} on the ${hobbyTitle} trivia quiz!`;
    } else if (option === 'B') {
        score = scoreB;
        total = document.querySelectorAll('.hobby-trivia-card-b').length;
        const time = document.getElementById('totalTimeB').textContent;
        message = `⏱️ I scored ${score}/${total} in ${time}s on the ${hobbyTitle} timed quiz!`;
    }

    const shareText = `${message}

Think you can beat my score? Try it here:
${pageUrl}

#${hobbyTitle.replace(/\s+/g, '')} #TriviaChallenge #QuizTime`;

    if (navigator.share) {
        navigator.share({
            title: `${hobbyTitle} Trivia Score`,
            text: shareText,
            url: pageUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyToClipboard(shareText);
    }
};

// ========================================
// OPTION B: Quiz Mode with Timer
// ========================================

let scoreB = 0;
let currentQuestionB = 0;
let timerB = null;
let timeLeftB = 30;
let totalTimeB = 0;
let startTimeB = 0;
let answersB = []; // Track correct/incorrect answers

function initOptionB() {
    // Initialize progress dots
    const totalQuestions = document.querySelectorAll('.hobby-trivia-card-b').length;
    const progressContainer = document.getElementById('progressDotsB');

    if (progressContainer) {
        progressContainer.innerHTML = '';
        for (let i = 0; i < totalQuestions; i++) {
            const dot = document.createElement('span');
            dot.className = 'progress-dot';
            dot.setAttribute('data-index', i);
            progressContainer.appendChild(dot);
        }
    }

    // Initialize hobby navigation buttons
    initHobbyNavigation();
}

window.startQuiz = function(option) {
    if (option === 'B') {
        document.getElementById('startScreenB').style.display = 'none';
        document.getElementById('activeScreenB').style.display = 'block';

        scoreB = 0;
        currentQuestionB = 0;
        totalTimeB = 0;
        startTimeB = Date.now();
        answersB = [];

        // Reset progress dots
        document.querySelectorAll('#progressDotsB .progress-dot').forEach(dot => {
            dot.classList.remove('active', 'completed', 'skipped');
        });

        showQuestionB(0);
        startTimerB();

        // Add click handlers (only once)
        const buttons = document.querySelectorAll('.hobby-option-btn-b');
        buttons.forEach(btn => {
            // Remove existing listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        document.querySelectorAll('.hobby-option-btn-b').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;

                const questionIndex = parseInt(this.getAttribute('data-question'));
                const answerIndex = parseInt(this.getAttribute('data-index'));
                const card = document.querySelector(`.hobby-trivia-card-b[data-question="${questionIndex}"]`);
                const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
                const isCorrect = answerIndex === correctAnswer;

                // Track answer
                answersB[questionIndex] = isCorrect;

                if (isCorrect) {
                    scoreB++;
                }

                // Update progress dot
                updateProgressDotB(questionIndex, true);

                // Disable buttons
                card.querySelectorAll('.hobby-option-btn-b').forEach(b => b.disabled = true);

                // Move to next question
                clearInterval(timerB);
                currentQuestionB++;

                if (currentQuestionB < document.querySelectorAll('.hobby-trivia-card-b').length) {
                    setTimeout(() => {
                        showQuestionB(currentQuestionB);
                        startTimerB();
                    }, 500);
                } else {
                    setTimeout(() => endQuizB(), 500);
                }
            });
        });
    }
};

function updateProgressDotB(index, answered) {
    const dot = document.querySelector(`#progressDotsB .progress-dot[data-index="${index}"]`);
    if (dot) {
        dot.classList.remove('active');
        if (answered) {
            dot.classList.add('completed');
        } else {
            dot.classList.add('skipped');
        }
    }
}

function showQuestionB(index) {
    document.querySelectorAll('.hobby-trivia-card-b').forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';

        // Re-enable buttons for current question
        if (i === index) {
            card.querySelectorAll('.hobby-option-btn-b').forEach(btn => {
                btn.disabled = false;
            });
        }
    });

    // Update active dot
    document.querySelectorAll('#progressDotsB .progress-dot').forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else if (!dot.classList.contains('completed') && !dot.classList.contains('skipped')) {
            dot.classList.remove('active');
        }
    });

    timeLeftB = 30;

    // Reset timer warning
    const timerEl = document.querySelector('.hobby-quiz-timer');
    if (timerEl) {
        timerEl.classList.remove('warning');
    }
}

function startTimerB() {
    timerB = setInterval(() => {
        timeLeftB--;
        document.getElementById('timerB').textContent = timeLeftB;

        if (timeLeftB <= 10) {
            document.querySelector('.hobby-quiz-timer').classList.add('warning');
        }

        if (timeLeftB <= 0) {
            clearInterval(timerB);

            // Mark as skipped
            answersB[currentQuestionB] = false;
            updateProgressDotB(currentQuestionB, false);

            currentQuestionB++;

            if (currentQuestionB < document.querySelectorAll('.hobby-trivia-card-b').length) {
                showQuestionB(currentQuestionB);
                startTimerB();
            } else {
                endQuizB();
            }
        }
    }, 1000);
}

function endQuizB() {
    clearInterval(timerB);
    totalTimeB = Math.floor((Date.now() - startTimeB) / 1000);

    document.getElementById('activeScreenB').style.display = 'none';
    document.getElementById('completionB').style.display = 'block';
    document.getElementById('finalScoreB').textContent = scoreB;
    document.getElementById('totalTimeB').textContent = totalTimeB;

    // Set completion message
    const total = document.querySelectorAll('.hobby-trivia-card-b').length;
    const percentage = (scoreB / total) * 100;
    const messageEl = document.getElementById('messageBText');

    if (percentage === 100) {
        messageEl.textContent = "🏆 Perfect score! You're a true expert!";
    } else if (percentage >= 80) {
        messageEl.textContent = "🌟 Excellent work! You really know your stuff!";
    } else if (percentage >= 60) {
        messageEl.textContent = "👍 Good job! Keep learning and improving!";
    } else {
        messageEl.textContent = "📚 Keep exploring! Every expert was once a beginner!";
    }
}

// ========================================
// OPTION C: Difficulty Levels
// ========================================

function initOptionC() {
    document.querySelectorAll('.difficulty-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const difficulty = this.getAttribute('data-difficulty');

            // Update active tab
            document.querySelectorAll('.difficulty-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update badge
            const badge = document.querySelector('.difficulty-badge .badge-text');
            const badgeIcon = document.querySelector('.difficulty-badge .badge-icon');

            if (difficulty === 'easy') {
                badge.textContent = 'Easy Mode';
                badgeIcon.textContent = '🌟';
            } else if (difficulty === 'medium') {
                badge.textContent = 'Medium Mode';
                badgeIcon.textContent = '⚡';
            } else {
                badge.textContent = 'Hard Mode';
                badgeIcon.textContent = '🔥';
            }

            // In a real implementation, you'd load different questions here
            // For demo, we just show the same questions
        });
    });

    // Add click handlers to option buttons
    document.querySelectorAll('.hobby-option-btn-c').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.hobby-trivia-card-c[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons
            card.querySelectorAll('.hobby-option-btn-c').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                card.querySelectorAll('.hobby-option-btn-c')[correctAnswer].classList.add('correct');
            }

            // Show feedback
            const feedback = card.querySelector('.feedback-c');
            const feedbackTitle = feedback.querySelector('.feedback-title');

            if (isCorrect) {
                feedbackTitle.textContent = '✅ Correct!';
                feedbackTitle.style.color = '#10b981';
            } else {
                feedbackTitle.textContent = '❌ Incorrect';
                feedbackTitle.style.color = '#ef4444';
            }

            feedback.style.display = 'block';
        });
    });
}

// ========================================
// OPTION D: Minimal Polish
// ========================================

function initOptionD() {
    document.querySelectorAll('.hobby-option-btn-d').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.hobby-trivia-card-d[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons
            card.querySelectorAll('.hobby-option-btn-d').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                card.querySelectorAll('.hobby-option-btn-d')[correctAnswer].classList.add('correct');
            }

            // Show feedback
            const feedback = card.querySelector('.feedback-d');
            const feedbackEmoji = feedback.querySelector('.feedback-emoji');

            if (isCorrect) {
                feedbackEmoji.textContent = '🎉';
            } else {
                feedbackEmoji.textContent = '💭';
            }

            feedback.style.display = 'flex';
        });
    });
}

// Global function for sharing fun facts (SEO-optimized)
window.shareFact = function(button) {
    const title = button.getAttribute('data-title');
    const description = button.getAttribute('data-description');
    const category = button.getAttribute('data-category');

    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const pageUrl = window.location.href;

    // SEO-optimized share message
    const shareText = `💡 Did you know? ${title}

${description}

🔗 Discover more ${hobbyTitle.toLowerCase()} facts at ${pageUrl}

#${hobbyTitle.replace(/\s+/g, '')} #FunFacts #${category || 'DidYouKnow'} #${category}Facts`;

    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: `${title} - ${hobbyTitle} Fun Fact`,
            text: shareText,
            url: pageUrl
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
    const timeFilterBtns = document.querySelectorAll('.hobby-time-filter-btn');
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
        const statsGrid = document.querySelector('.hobby-stats-grid');
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



    // Animate milestone badges on scroll
    const milestoneBadges = document.querySelectorAll('.hobby-stat-milestone.reached');
    const milestoneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'hobbyMilestoneGlow 2s ease-in-out infinite';
                milestoneObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    milestoneBadges.forEach(badge => milestoneObserver.observe(badge));

    // Animate trend indicators
    const trendIndicators = document.querySelectorAll('.hobby-stat-trend');
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

    // Tooltip positioning (for fixed position tooltips)
    const tooltips = document.querySelectorAll('.stat-tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipContent = this.querySelector('.tooltip-content');
            if (tooltipContent) {
                const rect = this.getBoundingClientRect();
                tooltipContent.style.top = (rect.bottom + 8) + 'px';
                tooltipContent.style.left = (rect.right - 220) + 'px'; // 220px is tooltip width
            }
        });
    });

    // Initialize platform toggle
    initPlatformToggle();

    // Mobile stats grid scroll hint - remove animation after user scrolls
    const statsGrid = document.querySelector('.hobby-stats-grid');
    if (statsGrid && window.innerWidth <= 768) {
        let scrolled = false;
        statsGrid.addEventListener('scroll', function() {
            if (!scrolled && this.scrollLeft > 10) {
                scrolled = true;
                this.classList.add('scrolled');
            }
        }, { passive: true });
    }

    // Initialize project toggle
    initProjectToggle();
});

/* ========================================
   EXTERNAL PLATFORMS TOGGLE
   ======================================== */

function initPlatformToggle() {
    const toggleButtons = document.querySelectorAll('.hobby-external-platforms .hobby-toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const design = this.getAttribute('data-design');

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active container
            const containers = document.querySelectorAll('.hobby-platforms-container');
            containers.forEach(container => {
                container.classList.remove('active');
            });

            const activeContainer = document.querySelector(`.hobby-platform-${design}`);
            if (activeContainer) {
                activeContainer.classList.add('active');
            }
        });
    });
}

/* ========================================
   CURRENT PROJECTS TOGGLE
   ======================================== */

function initProjectToggle() {
    const toggleButtons = document.querySelectorAll('.current-projects .toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const design = this.getAttribute('data-design');

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active container
            const containers = document.querySelectorAll('.projects-container');
            containers.forEach(container => {
                container.classList.remove('active');
            });

            const activeContainer = document.querySelector(`.project-${design}`);
            if (activeContainer) {
                activeContainer.classList.add('active');
            }
        });
    });
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', function() {
    initHobbyNavigation();
    initExploreHobbies();
    initProjectToggle();
});
