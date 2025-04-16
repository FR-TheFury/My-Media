// js/effects.js

// ========== PARTICULES (fond animé) ==========
tsParticles.load("particles-js", {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    particles: {
      number: { value: 100 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.3 }
    },
    background: {
      color: "#1a1a1a"
    }
  });
  
  // ========== ANIMATION DE FONDU DES SECTIONS ==========
  document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll("section, .container > div, .about-me, .skills, .experience, .interests");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    animatedElements.forEach(el => {
      el.classList.add("fade-hidden");
      observer.observe(el);
    });
  });


function createShootingStar() {
  const container = document.querySelector('.shooting-star-container');

  const startY = Math.random() * window.innerHeight * 0.3;
  const startX = -100;
  const endX = window.innerWidth + 100;
  const endY = startY + window.innerHeight * 0.4;

  const star = document.createElement('img');
  star.src = "../img/MeFillante.png"; // ton image ici
  star.classList.add("shooting-star");
  star.style.top = `${startY}px`;
  star.style.left = `${startX}px`;

  container.appendChild(star);

  // Attendre un petit délai pour forcer l'animation
  requestAnimationFrame(() => {
    star.style.opacity = 1;
    star.style.transform = `translate(${endX}px, ${endY}px) rotate(45deg)`;
  });

  // Générer les particules
  const trail = [];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.top = `${startY + i * 4}px`;
    p.style.left = `${startX + i * 4}px`;
    container.appendChild(p);
    trail.push(p);
  }

  // Supprimer étoile + particules après 3 sec
  setTimeout(() => {
    star.remove();
    trail.forEach(p => p.remove());
  }, 3000);
}

// une étoile toutes les 1.5 secondes
setInterval(() => {
  createShootingStar();
}, 1500);
