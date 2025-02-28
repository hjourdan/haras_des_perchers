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

// Effet Parallaxe avec ajustement dynamique du texte sur tous les écrans
function handleParallax() {
    const images = document.querySelectorAll('.parallax');
    const isMobile = window.innerWidth <= 768; // Détecte les petits écrans

    images.forEach((img) => {
        const parentBloc = img.closest('.discipline-bloc');
        const text = parentBloc?.querySelector('.discipline-texte');

        if (!parentBloc || !text) return;

        // Ajustement des paramètres selon la taille de l'écran
        const speed = isMobile ? 0.01 : 0.03; // Ralentir l'effet sur mobile
        const yPos = window.scrollY * speed;

        // Appliquer l'effet parallax sur l'image
        img.style.transform = `translateY(${yPos}px)`;

        // Ajuster la position du texte (plus haut sur tous les écrans)
        const offset = isMobile ? Math.min(40, yPos * 0.2) : Math.min(0.5, yPos * 0.8);
        text.style.marginTop = `-${offset}px`;
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
