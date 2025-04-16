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
  