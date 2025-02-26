// Sélection du header
const header = document.getElementById('main-header');

// Fonction pour gérer la transparence du header
function handleScroll() {
    if (window.scrollY > 0) {
        header.classList.add('scrolled'); // Fond blanc dès qu'on scroll
    } else {
        header.classList.remove('scrolled'); // Fond transparent en haut de la page
    }
}

// Apparition des blocs de discipline au scroll
function handleDisciplineScroll() {
    const blocs = document.querySelectorAll('.discipline-bloc');
    blocs.forEach((bloc) => {
        const blocTop = bloc.getBoundingClientRect().top;
        if (blocTop < window.innerHeight -100) {
            bloc.classList.add('show'); // Ajoute l'animation
        }
    });
}

// Effet Parallaxe sur les images
function handleParallax() {
    const images = document.querySelectorAll('.parallax');
    images.forEach((img) => {
        const speed = 0.04; // Ajuste la vitesse de déplacement
        const yPos = window.scrollY * speed;
        img.style.transform = `translateY(${yPos}px)`;
    });
}

// Gestion globale du scroll
function onScroll() {
    handleScroll();            // Gestion de la transparence du header
    handleDisciplineScroll();  // Animation des blocs de discipline
    handleParallax();          // Effet parallax sur les images
}

// Appliquer les vérifications dès le chargement de la page
window.addEventListener('scroll', onScroll);
document.addEventListener('DOMContentLoaded', onScroll); // Gérer le cas où la page est déjà scrollée
