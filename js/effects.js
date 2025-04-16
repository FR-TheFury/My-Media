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
  const directions = ['left', 'right', 'top', 'bottom'];
  const dir = directions[Math.floor(Math.random() * directions.length)];

  const star = document.createElement('img');
  star.src = avatarSrc;
  star.classList.add('shooting-star');

  let startX, startY, endX, endY;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  if (dir === 'left' || dir === 'right') {
    startY = Math.random() * screenH * 0.8;
    endY = startY + (Math.random() * 100 - 50);
    if (dir === 'left') {
      startX = -100;
      endX = screenW + 100;
      star.style.transform = "scaleX(1)";
    } else {
      startX = screenW + 100;
      endX = -100;
      star.style.transform = "scaleX(-1)"; // miroir
    }
  } else {
    startX = Math.random() * screenW * 0.8;
    endX = startX + (Math.random() * 100 - 50);
    if (dir === 'top') {
      startY = -100;
      endY = screenH + 100;
    } else {
      startY = screenH + 100;
      endY = -100;
    }
    // flip vertical optionnel ici si tu veux aussi miroir haut/bas
  }

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  container.appendChild(star);

  // Traînée de particules
  let interval = setInterval(() => {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = `${star.getBoundingClientRect().left + 30}px`;
    p.style.top = `${star.getBoundingClientRect().top + 30}px`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }, 80);

  // Lancer animation après injection
  requestAnimationFrame(() => {
    star.style.opacity = 1;
    star.style.transition = 'transform 3s linear, opacity 0.5s ease-in-out';
    star.style.transform += ` translate(${endX - startX}px, ${endY - startY}px)`;
  });

  // Cleanup
  setTimeout(() => {
    clearInterval(interval);
    star.remove();
  }, 3000);
}

// Commencer immédiatement à l'ouverture
window.addEventListener('DOMContentLoaded', () => {
  createShootingStar();
  setInterval(createShootingStar, 1500); // 1,5s entre chaque étoile
});
