// Floating background elements
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const emojis = ['🏀', '💻', '🎌', '📊', '🔧', '🇳🇬', '🇬🇧'];
  
  // Add floating elements
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('div');
    el.className = 'floating-bg';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `${Math.random() * 100}%`;
    el.style.fontSize = `${Math.random() * 5 + 3}rem`;
    el.style.animationDuration = `${Math.random() * 10 + 10}s`;
    el.style.animationDelay = `-${Math.random() * 10}s`;
    hero.appendChild(el);
  }
  
  // Smooth scroll for arrow
  document.querySelector('.scroll-down')?.addEventListener('click', () => {
    const roadmapSection = document.querySelector('.tabbed-roadmap');
    if (roadmapSection) {
      const offsetTop = roadmapSection.offsetTop - 20; // Add small offset from top
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Pill Navigation Tabbed Roadmap
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.roadmap-nav .nav-item');
  const tabPanes = document.querySelectorAll('.content-pane');

  // Simple tab switching for pill navigation
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active classes with smooth transition
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        // Add a small delay for smooth visual transition
        btn.style.transform = '';
      });
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active class to clicked button with slight delay for smooth animation
      setTimeout(() => {
        button.classList.add('active');
      }, 50);

      // Show corresponding pane
      const targetId = button.dataset.target;
      document.getElementById(targetId).classList.add('active');
    });
  });
  
  // WIP Section Enhancements
  initWIPSection();

  function initWIPSection() {
    // Animate progress bar when Brain Work tab is activated
    const brainTab = document.querySelector('[data-target="brain"]');
    const progressFill = document.querySelector('.progress-fill');

    if (brainTab && progressFill) {
      brainTab.addEventListener('click', () => {
        setTimeout(() => {
          const targetProgress = progressFill.dataset.progress || 75;
          progressFill.style.width = `${targetProgress}%`;
        }, 300); // Small delay for smooth transition
      });
    }

    // Email notification for WIP
    const notifyBtn = document.querySelector('.notify-btn');
    const emailInput = document.querySelector('.email-input');

    if (notifyBtn && emailInput) {
      notifyBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
          // Success feedback
          notifyBtn.textContent = 'Added!';
          notifyBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          emailInput.value = '';

          setTimeout(() => {
            notifyBtn.textContent = 'Notify Me';
            notifyBtn.style.background = '';
          }, 2000);

          // Here you would normally send to a database
          console.log(`Email notification requested: ${email}`);
        } else {
          // Error feedback
          emailInput.style.borderColor = '#EF4444';
          emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';

          setTimeout(() => {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow = '';
          }, 2000);
        }
      });

      // Enter key support
      emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          notifyBtn.click();
        }
      });
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Footer Newsletter Signup
  initFooterNewsletter();

  function initFooterNewsletter() {
    const footerForm = document.getElementById('footer-newsletter');

    if (footerForm) {
      footerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = footerForm.querySelector('.newsletter-email');
        const submitBtn = footerForm.querySelector('.newsletter-submit');
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
          // Success feedback
          const originalHTML = submitBtn.innerHTML;
          submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
          submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          emailInput.value = '';

          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
          }, 2000);

          // Here you would normally send to a newsletter service
          console.log(`Footer newsletter subscription: ${email}`);
        } else {
          // Error feedback
          emailInput.style.color = '#EF4444';
          emailInput.style.background = 'rgba(239, 68, 68, 0.1)';

          setTimeout(() => {
            emailInput.style.color = '';
            emailInput.style.background = '';
          }, 2000);
        }
      });
    }
  }

  // CTA Section Newsletter Signup
  initNewsletterSignup();

  function initNewsletterSignup() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');

    if (newsletterBtn && newsletterInput) {
      newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value.trim();
        if (validateEmail(email)) {
          // Success feedback
          newsletterBtn.textContent = 'Subscribed!';
          newsletterBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
          newsletterInput.value = '';

          setTimeout(() => {
            newsletterBtn.textContent = 'Subscribe';
            newsletterBtn.style.background = '';
          }, 3000);

          // Here you would normally send to a newsletter service
          console.log(`Newsletter subscription: ${email}`);
        } else {
          // Error feedback
          newsletterInput.style.borderColor = '#EF4444';
          newsletterInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';

          setTimeout(() => {
            newsletterInput.style.borderColor = '';
            newsletterInput.style.boxShadow = '';
          }, 2000);
        }
      });

      // Enter key support
      newsletterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          newsletterBtn.click();
        }
      });
    }
  }
});