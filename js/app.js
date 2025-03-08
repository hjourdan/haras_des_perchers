// Sélection du header
const header = document.querySelector('.header');

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
        const blocBottom = bloc.getBoundingClientRect().bottom;
        
        // Si le bloc est visible, on ajoute l'animation
        if (blocTop < window.innerHeight - 100 && blocBottom > 0) {
            bloc.classList.add('show');
        } else {
            // Réinitialise si le bloc sort de l'écran
            bloc.classList.remove('show');
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

// Fonction de gestion de l'animation de texte de présentation au scroll
function handlePresentationScroll() {
    const presentation = document.querySelector('.presentation_defile');
    if (!presentation) return; // Si l'élément n'existe pas, on arrête

    const position = presentation.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Si l'élément est visible, on ajoute la classe "show"
    if (position.top < windowHeight - 100 && position.bottom > 0) {
        presentation.classList.add('show');
    } else {
        // Si l'élément n'est plus visible, on retire l'animation
        presentation.classList.remove('show');
    }
}

// Services 

// Sélection des éléments
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const head = document.querySelector('.header');

// Fonction pour afficher/masquer les liens de navigation au clic
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Ajoute ou enlève la classe 'active'
    head.classList.toggle('active');
});

// Gérer le clic en dehors du menu pour le fermer (si nécessaire)
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
        navLinks.classList.remove('active'); // Masque le menu si on clique à l'extérieur
    }
});

//Accueil -Services
// Sélection des éléments
// Sélection des éléments
const carousel = document.querySelector(".carousel");
const indicatorsContainer = document.querySelector(".carousel-indicators");
const items = document.querySelectorAll(".services-item");

let currentIndex = 0;
let isScrolling = false;  // Verrou pour empêcher des changements trop rapides

// Création des boutons (ronds) dynamiquement
items.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(btn);
});

// Mise à jour initiale
const indicators = document.querySelectorAll(".carousel-indicators button");
updateCarousel();

// Aller à une diapositive spécifique
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// Mise à jour de l'affichage
function updateCarousel() {
    // Déplacement du carrousel
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    // Mise à jour des ronds actifs
    indicators.forEach((btn, index) => {
        btn.classList.toggle("active", index === currentIndex);
    });
}

// Ajouter la gestion du scroll horizontal
carousel.addEventListener('wheel', (e) => {
    // Empêcher le défilement vertical de la page

    if (isScrolling) return; // Si on est déjà en train de faire défiler, on ignore l'événement
    isScrolling = true;

    // Ajouter un délai pour limiter la fréquence des changements
    setTimeout(() => {
        // Si le scroll est horizontal (deltaX > 0), on va à la prochaine image
        if (Math.abs(e.deltaX) > 60) { // Seuil de sensibilité
            if (e.deltaX > 0) {
                // Scroll vers la droite (image suivante)
                currentIndex = (currentIndex + 1) % items.length;
            } else {
                // Scroll vers la gauche (image précédente)
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            }
            updateCarousel();
        }
        isScrolling = false; // Libérer le verrou après le délai
    }, 250);  // Délai de 150ms (ajuste cette valeur si nécessaire)
});


// Images de compétitions 

// Sélectionne toutes les images de la section compétition
const images = document.querySelectorAll(".competition-image");
let index = 0;

// Fonction pour changer d'image
function showNextImage() {
    // Cache l'image actuelle
    images[index].classList.remove("active");

    // Calcule l'index de la prochaine image (en boucle)
    index = (index + 1) % images.length;

    // Affiche la prochaine image
    images[index].classList.add("active");
}

// Change d'image toutes les 3 secondes (3000 ms)
setInterval(showNextImage, 3000);

// Gestion globale du scroll
function onScroll() {
    handleScroll();            // Gestion de la transparence du header
    handleDisciplineScroll();  // Animation des blocs de discipline
    handleParallax();          // Effet parallax sur les images
    handlePresentationScroll(); // Animation du texte de présentation
}

// Appliquer les vérifications dès le chargement de la page
window.addEventListener('scroll', onScroll);
document.addEventListener('DOMContentLoaded', onScroll); // Gérer le cas où la page est déjà scrollée

// Appel de la fonction pour gérer les images de la section disciplines (à implémenter si nécessaire)
document.addEventListener('DOMContentLoaded', handleDisciplineImages);
