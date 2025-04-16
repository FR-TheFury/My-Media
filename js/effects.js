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
  const star = document.querySelector('.shooting-star');
  const container = document.querySelector('.shooting-star-container');

  const startY = Math.random() * window.innerHeight * 0.3;
  const startX = -100;
  const endX = window.innerWidth + 100;
  const endY = startY + window.innerHeight * 0.4;

  star.style.top = `${startY}px`;
  star.style.left = `${startX}px`;
  star.style.opacity = 1;
  star.style.transform = `translate(${endX}px, ${endY}px) rotate(45deg)`;

  // Particules
  let trail = [];
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.top = `${startY + i * 4}px`;
    particle.style.left = `${startX + i * 4}px`;
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.borderRadius = "50%";
    particle.style.background = "white";
    particle.style.opacity = 0.3;
    particle.style.zIndex = 9998;
    container.appendChild(particle);
    trail.push(particle);
  }

  setTimeout(() => {
    star.style.opacity = 0;
    trail.forEach(p => p.remove());
  }, 3000); // 3 sec d’affichage
}

// une étoile toutes les 1.5 sec
setInterval(() => {
  createShootingStar();
}, 1500);
