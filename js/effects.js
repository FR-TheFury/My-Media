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
  
    // Position de départ aléatoire en haut de l’écran
    const startY = Math.random() * window.innerHeight * 0.3;
    const startX = -100;
    const endX = window.innerWidth + 100;
    const endY = startY + window.innerHeight * 0.4;
  
    // Style initial
    star.style.top = `${startY}px`;
    star.style.left = `${startX}px`;
    star.style.opacity = 1;
    star.style.transform = `translate(${endX}px, ${endY}px) rotate(45deg)`;
  
    // Crée des petites particules
    let trail = [];
    for (let i = 0; i < 10; i++) {
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
  
    // Nettoyage après animation
    setTimeout(() => {
      star.style.opacity = 0;
      trail.forEach(p => p.remove());
    }, 5500);
  }
  
  // Fais passer une étoile filante toutes les 15 à 30 secondes
  setInterval(() => {
    if (Math.random() > 0.5) createShootingStar();
  }, 1000);