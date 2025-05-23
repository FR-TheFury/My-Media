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

    function createShootingStar() {
    const container = document.querySelector('.shooting-star-container');
    const star = document.createElement('img');
    star.src = avatarSrc;
    star.classList.add('shooting-star');

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const edges = ['top', 'bottom', 'left', 'right'];
    const startEdge = edges[Math.floor(Math.random() * edges.length)];

    let startX, startY, endX, endY;

    switch (startEdge) {
        case 'top':
        startX = Math.random() * screenW;
        startY = -100;
        endX = Math.random() * screenW;
        endY = screenH + 100;
        break;
        case 'bottom':
        startX = Math.random() * screenW;
        startY = screenH + 100;
        endX = Math.random() * screenW;
        endY = -100;
        break;
        case 'left':
        startX = -100;
        startY = Math.random() * screenH;
        endX = screenW + 100;
        endY = Math.random() * screenH;
        break;
        case 'right':
        startX = screenW + 100;
        startY = Math.random() * screenH;
        endX = -100;
        endY = Math.random() * screenH;
        break;
    }

    // Position initiale
    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    // Flip miroir si on va de droite vers gauche
    if (endX < startX) {
        star.style.transform = "scaleX(-1)";
    }

    container.appendChild(star);

    // Traînée magique
    const trailInterval = setInterval(() => {
        const p = document.createElement("div");
        p.classList.add("particle");
        const rect = star.getBoundingClientRect();
        p.style.left = `${rect.left + 30}px`;
        p.style.top = `${rect.top + 30}px`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 1500);
    }, 70);

    // Lancer l’animation
    requestAnimationFrame(() => {
        star.style.opacity = 1;
        star.style.transition = 'transform 3s ease-in-out, opacity 0.5s ease-in-out';
        star.style.transform += ` translate(${endX - startX}px, ${endY - startY}px)`;
    });

    // Nettoyage après 3 secondes
    setTimeout(() => {
        clearInterval(trailInterval);
        star.remove();
    }, 3000);
    }

    // Lancement immédiat
    window.addEventListener('DOMContentLoaded', () => {
    createShootingStar();
    setInterval(createShootingStar, 1500);
    });
