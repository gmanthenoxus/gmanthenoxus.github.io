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

// Fun Facts - No toggle needed, responsive grid handles layout

// ========================================
// TRIVIA SECTION - ALL OPTIONS
// ========================================

// Trivia toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const triviaToggles = document.querySelectorAll('.trivia-section .toggle-btn');
    const triviaContainers = document.querySelectorAll('.trivia-container[class*="trivia-option"]');

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
    const totalQuestions = document.querySelectorAll('.trivia-card-a').length;

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
    document.querySelectorAll('.option-btn-a').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.trivia-card-a[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons in this question
            card.querySelectorAll('.option-btn-a').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
                scoreA++;
                updateProgressDot(questionIndex, 'correct');
            } else {
                this.classList.add('incorrect');
                // Show correct answer
                card.querySelectorAll('.option-btn-a')[correctAnswer].classList.add('correct');
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
    document.querySelectorAll('.trivia-card-a').forEach(card => card.style.display = 'none');
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

        document.querySelectorAll('.trivia-card-a').forEach(card => {
            card.style.display = 'block';
            card.querySelectorAll('.option-btn-a').forEach(btn => {
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
        document.querySelectorAll('.trivia-card-b').forEach(card => {
            card.querySelectorAll('.option-btn-b').forEach(btn => {
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
        { name: 'Anime', icon: 'fas fa-tv', url: '/hobbies/anime', color: '#FF6B9D' },
        { name: 'Fitness', icon: 'fas fa-dumbbell', url: '/hobbies/fitness', color: '#FF4757' },
        { name: 'Food', icon: 'fas fa-utensils', url: '/hobbies/food', color: '#FFA502' },
        { name: 'Games', icon: 'fas fa-gamepad', url: '/hobbies/games', color: '#5F27CD' },
        { name: 'Sneakers', icon: 'fas fa-shoe-prints', url: '/hobbies/sneakers', color: '#00D2D3' },
        { name: 'Sports', icon: 'fas fa-basketball-ball', url: '/hobbies/sports', color: '#1E90FF' },
        { name: 'Tech', icon: 'fas fa-laptop-code', url: '/hobbies/tech', color: '#2ECC71' }
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

// Share score with image capture
window.shareScoreWithImage = async function(option) {
    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const pageUrl = window.location.href;
    let score, total, time, message;

    if (option === 'B') {
        score = scoreB;
        total = document.querySelectorAll('.trivia-card-b').length;
        time = document.getElementById('totalTimeB').textContent;
        message = `⏱️ I scored ${score}/${total} in ${time}s on the ${hobbyTitle} timed quiz!`;
    }

    const shareText = `${message}

Think you can beat my score? Try it here:
${pageUrl}

#${hobbyTitle.replace(/\s+/g, '')} #TriviaChallenge #QuizTime`;

    // Try to use Web Share API with text
    if (navigator.share) {
        try {
            await navigator.share({
                title: `${hobbyTitle} Trivia Score`,
                text: shareText,
                url: pageUrl
            });
            showNotification('Score shared successfully! 🎉');
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(shareText);
            }
        }
    } else {
        copyToClipboard(shareText);
    }
};

window.shareScore = function(option) {
    const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent || 'Hobby';
    const pageUrl = window.location.href;
    let score, total, message;

    if (option === 'A') {
        score = scoreA;
        total = document.querySelectorAll('.trivia-card-a').length;
        message = `🧠 I scored ${score}/${total} on the ${hobbyTitle} trivia quiz!`;
    } else if (option === 'B') {
        score = scoreB;
        total = document.querySelectorAll('.trivia-card-b').length;
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
    const totalQuestions = document.querySelectorAll('.trivia-card-b').length;
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
        const buttons = document.querySelectorAll('.option-btn-b');
        buttons.forEach(btn => {
            // Remove existing listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        document.querySelectorAll('.option-btn-b').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.disabled) return;

                const questionIndex = parseInt(this.getAttribute('data-question'));
                const answerIndex = parseInt(this.getAttribute('data-index'));
                const card = document.querySelector(`.trivia-card-b[data-question="${questionIndex}"]`);
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
                card.querySelectorAll('.option-btn-b').forEach(b => b.disabled = true);

                // Move to next question
                clearInterval(timerB);
                currentQuestionB++;

                if (currentQuestionB < document.querySelectorAll('.trivia-card-b').length) {
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
    document.querySelectorAll('.trivia-card-b').forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';

        // Re-enable buttons for current question
        if (i === index) {
            card.querySelectorAll('.option-btn-b').forEach(btn => {
                btn.disabled = false;
            });
        }
    });

    document.getElementById('currentB').textContent = index + 1;

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
    const timerEl = document.querySelector('.quiz-timer');
    if (timerEl) {
        timerEl.classList.remove('warning');
    }
}

function startTimerB() {
    timerB = setInterval(() => {
        timeLeftB--;
        document.getElementById('timerB').textContent = timeLeftB;

        if (timeLeftB <= 10) {
            document.querySelector('.quiz-timer').classList.add('warning');
        }

        if (timeLeftB <= 0) {
            clearInterval(timerB);

            // Mark as skipped
            answersB[currentQuestionB] = false;
            updateProgressDotB(currentQuestionB, false);

            currentQuestionB++;

            if (currentQuestionB < document.querySelectorAll('.trivia-card-b').length) {
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
    const total = document.querySelectorAll('.trivia-card-b').length;
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
    document.querySelectorAll('.option-btn-c').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.trivia-card-c[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons
            card.querySelectorAll('.option-btn-c').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                card.querySelectorAll('.option-btn-c')[correctAnswer].classList.add('correct');
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
    document.querySelectorAll('.option-btn-d').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const questionIndex = parseInt(this.getAttribute('data-question'));
            const answerIndex = parseInt(this.getAttribute('data-index'));
            const card = document.querySelector(`.trivia-card-d[data-question="${questionIndex}"]`);
            const correctAnswer = parseInt(card.getAttribute('data-correct-answer'));
            const isCorrect = answerIndex === correctAnswer;

            // Disable all buttons
            card.querySelectorAll('.option-btn-d').forEach(b => b.disabled = true);

            // Mark answer
            if (isCorrect) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                card.querySelectorAll('.option-btn-d')[correctAnswer].classList.add('correct');
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
});
