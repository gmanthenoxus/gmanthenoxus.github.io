document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation system
  if (typeof NavigationManager !== 'undefined') {
    window.navigationManager = new NavigationManager();
  }

  // Chapter interactions
  const chapters = document.querySelectorAll('.chapter');

  // Add tilt effect on hover
  chapters.forEach(chapter => {
    chapter.addEventListener('mouseenter', () => {
      chapter.style.transform = 'rotate(1deg) scale(1.02)';
    });

    chapter.addEventListener('mouseleave', () => {
      chapter.style.transform = 'rotate(0) scale(1)';
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        if (window.navigationManager && window.navigationManager.isMenuOpen()) {
          window.navigationManager.close();
        }
      }
    });
  });
});