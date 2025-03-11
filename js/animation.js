const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;

const lerp = (start, end, t) => start * (1 - t) + end * t;

/**
 * Effet de retournement au chargement
 */
function flipCardOnLoad(card) {
  card.style.transform = 'rotateY(180deg)'; // Départ à 180°
  setTimeout(() => {
    card.style.transition = 'transform 0.8s ease-out';
    card.style.transform = 'rotateY(0deg)'; // Retour normal
  }, 200); // Délai pour un effet plus fluide
}

/**
 * Applique l'effet de flip à chaque carte
 */
function applyFlipEffect() {
  cards.forEach((card) => flipCardOnLoad(card));
}

/**
 * Animation de scroll pour l'effet de parallaxe
 */
function updateScroll() {
  startY = lerp(startY, endY, easing);
  gallery.style.height = `${track.clientHeight}px`;
  track.style.transform = `translateY(-${startY}px)`;
  activateParallax();
  raf = requestAnimationFrame(updateScroll);
  if (Math.abs(startY - window.scrollY) < 0.5) cancelAnimationFrame(raf);
}

/**
 * Lance le suivi du scroll
 */
function startScroll() {
  endY = window.scrollY;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(updateScroll);
}

/**
 * Effet de parallaxe sur les cartes
 */
function parallax(card) {
  const wrapper = card.querySelector('.card-image-wrapper');
  const diff = card.offsetHeight - wrapper.offsetHeight;
  const { top } = card.getBoundingClientRect();
  const progress = top / window.innerHeight;
  const yPos = diff * progress;
  wrapper.style.transform = `translateY(${yPos}px)`;
}

/**
 * Applique l'effet de parallaxe à toutes les cartes
 */
const activateParallax = () => cards.forEach(parallax);

/**
 * Initialisation
 */
function init() {
  applyFlipEffect();
  activateParallax();
  startScroll();
}

/* Écouteurs d'événements */
window.addEventListener('load', () => {
  updateScroll();
  applyFlipEffect();
});

window.addEventListener('scroll', init, false);
window.addEventListener('resize', updateScroll, false);
