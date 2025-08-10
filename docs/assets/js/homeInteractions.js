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
    document.querySelector('.tabbed-roadmap')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
});

// Tabbed roadmap functionality
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabButtons = document.querySelectorAll('.roadmap-nav .nav-item');
  const tabPanes = document.querySelectorAll('.content-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active classes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding pane
      const targetId = button.dataset.target;
      document.getElementById(targetId).classList.add('active');
    });
  });
  
  // Email notification for WIP
  document.querySelector('.wip-form button')?.addEventListener('click', () => {
    const email = document.querySelector('.wip-form input').value;
    if (validateEmail(email)) {
      alert(`Thanks! We'll notify you at ${email} when Brain Work is ready.`);
      // Here you would normally send to a database
    } else {
      alert('Please enter a valid email address');
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});