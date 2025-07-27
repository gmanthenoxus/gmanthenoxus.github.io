document.addEventListener('DOMContentLoaded', () => {
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
});