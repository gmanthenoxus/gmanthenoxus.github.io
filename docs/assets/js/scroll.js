document.addEventListener('DOMContentLoaded', () => {
  const chapters = document.querySelectorAll('.hobby-chapter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  chapters.forEach(chapter => {
    observer.observe(chapter);
  });
});
