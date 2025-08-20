// ========================================
// 🎯 HOBBY PAGES MODULE
// ========================================

window.HobbyPages = (function() {
    'use strict';

    let isInitialized = false;

    // Configuration
    const config = {
        quoteRotation: {
            interval: 8000,
            fadeDelay: 300
        },
        scrollReveal: {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        },
        progressBars: {
            animationDelay: 200,
            animationDuration: 1500
        }
    };

    // Initialize hobby page functionality
    function init() {
        if (isInitialized) return;
        if (!document.querySelector('.hobby-page')) return; // Only run on hobby pages

        setupScrollReveal();
        setupQuoteRotation();
        setupTrivia();
        setupProgressBars();
        setupFunFactsSharing();
        setupStatisticsAnimations();

        isInitialized = true;
        SiteCore.events.dispatch('hobbyPageReady');
    }

    // Setup scroll reveal animations
    function setupScrollReveal() {
        if (SiteCore.utils.prefersReducedMotion()) return;

        const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
        if (scrollRevealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, config.scrollReveal);

        scrollRevealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Setup quote rotation system
    function setupQuoteRotation() {
        const quoteContainer = document.getElementById('rotating-quote');
        if (!quoteContainer || !window.hobbyQuotes || window.hobbyQuotes.length <= 1) return;

        let currentQuoteIndex = 0;
        let rotationInterval;

        function rotateQuote() {
            currentQuoteIndex = (currentQuoteIndex + 1) % window.hobbyQuotes.length;
            const quote = window.hobbyQuotes[currentQuoteIndex];

            // Fade out
            quoteContainer.style.opacity = '0';

            setTimeout(() => {
                // Update content
                const quoteText = quoteContainer.querySelector('.quote-text');
                const quoteAuthor = quoteContainer.querySelector('.quote-author');

                if (quoteText) quoteText.textContent = `"${quote.text}"`;
                if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;

                // Fade in
                quoteContainer.style.opacity = '1';
            }, config.quoteRotation.fadeDelay);

            SiteCore.events.dispatch('quoteRotated', { quote: quote, index: currentQuoteIndex });
        }

        // Start rotation
        rotationInterval = setInterval(rotateQuote, config.quoteRotation.interval);

        // Pause rotation when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(rotationInterval);
            } else {
                rotationInterval = setInterval(rotateQuote, config.quoteRotation.interval);
            }
        });
    }

    // Setup trivia system
    function setupTrivia() {
        const triviaCards = document.querySelectorAll('.trivia-card');
        if (triviaCards.length === 0) return;

        triviaCards.forEach(card => {
            const options = card.querySelectorAll('.trivia-option');
            const feedback = card.querySelector('.trivia-feedback');
            const result = card.querySelector('.trivia-result');
            const shareBtn = card.querySelector('.trivia-share-btn');

            if (options.length === 0) return;

            options.forEach(option => {
                option.addEventListener('click', function() {
                    handleTriviaAnswer(this, options, feedback, result, shareBtn, card);
                });
            });
        });
    }

    // Handle trivia answer selection
    function handleTriviaAnswer(selectedOption, allOptions, feedback, result, shareBtn, card) {
        // Disable all options
        allOptions.forEach(opt => {
            opt.disabled = true;
            opt.style.pointerEvents = 'none';
        });

        // Show selected state
        selectedOption.classList.add('selected');

        // Check if correct
        const isCorrect = selectedOption.dataset.correct === 'true';

        // Show correct/incorrect states with animation
        setTimeout(() => {
            allOptions.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                } else if (opt === selectedOption && !isCorrect) {
                    opt.classList.add('incorrect');
                }
            });

            // Show feedback
            if (result) {
                result.className = `trivia-result ${isCorrect ? 'correct' : 'incorrect'}`;
            }

            if (feedback) {
                feedback.style.display = 'block';
                SiteCore.animations.fadeIn(feedback);
            }

            // Setup share functionality
            setupTriviaSharing(shareBtn, card, isCorrect);

            // Dispatch event
            SiteCore.events.dispatch('triviaAnswered', {
                correct: isCorrect,
                question: card.querySelector('.trivia-question')?.textContent,
                selectedAnswer: selectedOption.textContent
            });
        }, 300);
    }

    // Setup trivia sharing
    function setupTriviaSharing(shareBtn, card, wasCorrect) {
        if (!shareBtn) return;

        shareBtn.addEventListener('click', function() {
            const question = card.querySelector('.trivia-question h3')?.textContent ||
                           card.querySelector('.question-text')?.textContent;
            const hobbyTitle = document.querySelector('.hobby-hero h1')?.textContent ||
                             document.querySelector('h1')?.textContent;

            const resultEmoji = wasCorrect ? '✅' : '🤔';
            const shareText = `${resultEmoji} ${hobbyTitle} Trivia Challenge!\n\n${question}\n\nThink you know the answer? Test your knowledge!`;

            SiteCore.utils.shareContent({
                title: `${hobbyTitle} Trivia Challenge`,
                text: shareText,
                url: window.location.href
            });
        });
    }

    // Setup progress bars animation
    function setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        if (progressBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const progressValue = progressBar.dataset.progress ||
                                        progressBar.parentElement.dataset.progress;

                    if (progressValue) {
                        setTimeout(() => {
                            progressBar.style.setProperty('--progress-width', `${progressValue}%`);
                            progressBar.classList.add('animate');
                        }, config.progressBars.animationDelay);
                    }

                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // Setup fun facts sharing
    function setupFunFactsSharing() {
        const shareButtons = document.querySelectorAll('.fact-share-btn, .share-fact');
        if (shareButtons.length === 0) return;

        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const factCard = this.closest('.fact-card');
                if (!factCard) return;

                const title = factCard.querySelector('h3, .fact-title')?.textContent;
                const description = factCard.querySelector('p, .fact-description')?.textContent;
                const hobbyTitle = document.querySelector('.hobby-hero h1, h1')?.textContent;

                if (!title || !description) return;

                // Create shareable text
                const shareText = `🎯 ${title}\n\n${description}\n\n#${hobbyTitle?.replace(/\s+/g, '') || 'Hobby'} #FunFacts`;

                SiteCore.utils.shareContent({
                    title: `${title} - ${hobbyTitle}`,
                    text: shareText,
                    url: window.location.href
                });
            });
        });
    }

    // Setup statistics animations
    function setupStatisticsAnimations() {
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const statValue = card.querySelector('.stat-value');

                    if (statValue) {
                        // Animate number counting
                        animateStatValue(statValue);
                    }

                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }

    // Animate stat value counting
    function animateStatValue(element) {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

        if (isNaN(numericValue)) return;

        let currentValue = 0;
        const increment = numericValue / 50; // 50 steps
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;

            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                clearInterval(counter);
            } else {
                const displayValue = Math.floor(currentValue);
                element.textContent = finalValue.replace(/\d+/, displayValue);
            }
        }, stepTime);
    }

    // Public API
    return {
        init: init,
        setupScrollReveal: setupScrollReveal,
        setupQuoteRotation: setupQuoteRotation,
        setupTrivia: setupTrivia,
        setupProgressBars: setupProgressBars,
        setupFunFactsSharing: setupFunFactsSharing,
        setupStatisticsAnimations: setupStatisticsAnimations
    };
})();

// Initialize when core is ready
SiteCore.events.listen('coreReady', HobbyPages.init);
