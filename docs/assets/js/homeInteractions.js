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
    document.querySelector('.roadmap')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
  
  // Card click handling
  document.querySelectorAll('.roadmap-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        const link = card.querySelector('a.cta:not(.disabled)');
        if (link) link.click();
      }
    });
  });
});