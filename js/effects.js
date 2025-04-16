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




const avatarSrc = "../img/MeFillante.png"; // Mets ici le chemin vers ton image avatar
const sound = document.getElementById("magic-sound");

function createShootingStar() {
  const container = document.querySelector('.shooting-star-container');
  const star = document.createElement('img');
  star.src = avatarSrc;
  star.classList.add('shooting-star');

  // Aléatoire pour début + fin
  const fromLeft = Math.random() > 0.5;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const startX = fromLeft ? -100 : screenW + 100;
  const endX = fromLeft ? screenW + 100 : -100;

  const startY = Math.random() * screenH * 0.8;
  const endY = startY + (Math.random() * 150 - 75);

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  if (!fromLeft) star.style.transform = "scaleX(-1)";

  container.appendChild(star);

  // Son ✨
  sound.currentTime = 0;
  sound.play().catch(() => {}); // évite erreur autoplay sur certains navigateurs

  // Particules dégradées
  const trailInterval = setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("particle");
    const rect = star.getBoundingClientRect();
    p.style.left = `${rect.left + 30}px`;
    p.style.top = `${rect.top + 30}px`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }, 70);

  // Animation avec courbe (utilise translate + slight rotate pour effet sinusoïdal)
  let curve = Math.random() * 60 - 30; // légère rotation
  requestAnimationFrame(() => {
    star.style.opacity = 1;
    star.style.transition = 'transform 3s ease-in-out, opacity 0.5s ease-in-out';
    star.style.transform += ` translate(${endX - startX}px, ${endY - startY}px) rotate(${curve}deg)`;
  });

  // Nettoyage
  setTimeout(() => {
    clearInterval(trailInterval);
    star.remove();
  }, 3000);
}

// Lancer direct au chargement
window.addEventListener('DOMContentLoaded', () => {
  createShootingStar();
  setInterval(createShootingStar, 1500);
});