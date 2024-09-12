// Fonction pour activer le menu burger
const burgerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');

// Ouvrir/fermer le menu burger au clic
burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('show'); // Ajoute/retire la classe 'show' pour ouvrir/fermer le menu
});

// Ajouter des écouteurs d'événements pour chaque lien du menu
const menuLinks = document.querySelectorAll('#menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        const category = link.getAttribute('data-category'); // Récupérer la catégorie choisie
        loadImages(category); // Charger les images de la catégorie sélectionnée
        menu.classList.remove('show'); // Fermer le menu après sélection
    });
});

// Variables pour la gestion du chargement par groupe
const imagesPerPage = 20;
let categoryIndexes = {}; // Objets pour stocker les index de chaque catégorie

// Fonction pour charger les images en groupes
function loadImages(category) {
    console.log(`Loading images for category: ${category}`);
    // Mettre à jour le titre avec la catégorie actuelle
    const categoryTitle = document.getElementById('category-title');
    categoryTitle.textContent = `Catégorie : ${capitalizeFirstLetter(category)}`;

    // Initialiser l'index si cette catégorie n'a pas encore été chargée
    if (!categoryIndexes[category]) {
        categoryIndexes[category] = 0;
    }

    // Réinitialiser la galerie et le bouton "Charger plus"
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Réinitialiser la galerie pour la nouvelle catégorie

    // Charger un premier groupe d'images
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            loadMoreImages(data[category], category); // Charger les premières images
        })
        .catch(error => console.error('Erreur lors du chargement des images:', error));

    // Attacher dynamiquement la catégorie au bouton "Charger plus"
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.style.display = 'block'; // S'assurer que le bouton est visible
    loadMoreButton.setAttribute('data-category', category); // Assigner la catégorie au bouton
    loadMoreButton.removeEventListener('click', handleLoadMore); // Retirer tout ancien événement
    loadMoreButton.addEventListener('click', handleLoadMore); // Ajouter l'événement avec la bonne catégorie
}

// Fonction pour charger plus d'images
function loadMoreImages(images, category) {
    const gallery = document.getElementById('gallery');

    // Utiliser l'index spécifique à la catégorie
    const currentIndex = categoryIndexes[category];
    const slice = images.slice(currentIndex, currentIndex + imagesPerPage); // Prendre un groupe d'images

    console.log(`Current index for category ${category}: ${currentIndex}`);

    slice.forEach(imagePath => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        const img = document.createElement('img');
        img.setAttribute('src', imagePath);
        img.setAttribute('loading', 'lazy'); // Lazy loading natif

        // Ajuster la hauteur de l'image une fois qu'elle est chargée
        img.onload = () => {
            adjustImageHeight(galleryItem, img);
        };

        img.addEventListener('click', () => openLightbox(img.src)); // Ouvrir la Lightbox au clic

        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });

    // Mettre à jour l'index de la catégorie après chargement
    categoryIndexes[category] += imagesPerPage;

    console.log(`Updated index for category ${category}: ${categoryIndexes[category]}`);

    // Masquer le bouton si toutes les images sont chargées
    if (categoryIndexes[category] >= images.length) {
        const loadMoreButton = document.getElementById('load-more');
        loadMoreButton.style.display = 'none'; // Masquer le bouton
    }
}

// Fonction qui gère le chargement supplémentaire d'images
function handleLoadMore(event) {
    const button = event.currentTarget; // Obtenir le bouton
    const category = button.getAttribute('data-category'); // Récupérer la catégorie liée au bouton

    console.log(`Loading more images for category: ${category}`);

    // Récupérer les images depuis le fichier JSON
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            loadMoreImages(data[category], category); // Charger plus d'images pour la catégorie active
        })
        .catch(error => console.error('Erreur lors du chargement des images:', error));
}

// Fonction pour ajuster la hauteur des images dans la grille
function adjustImageHeight(item, img) {
    const rowHeight = 10;
    const imgHeight = img.naturalHeight;
    const imgWidth = img.naturalWidth;
    const aspectRatio = imgHeight / imgWidth;
    item.style.gridRowEnd = `span ${Math.ceil(aspectRatio * 100 / rowHeight)}`;
}

// Fonction pour capitaliser la première lettre de la catégorie
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fonction pour ouvrir la Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;

    lightbox.classList.add('show'); // Afficher la Lightbox

    // Écouter les événements du clavier pour fermer avec Escape
    document.addEventListener('keydown', closeLightboxOnEscape);
}

// Fonction pour fermer la Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show'); // Masquer la Lightbox
    document.removeEventListener('keydown', closeLightboxOnEscape); // Retirer l'écouteur d'événement
}

// Fermer la Lightbox lorsque la touche Escape est appuyée
function closeLightboxOnEscape(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
}

// Fermer la Lightbox si on clique en dehors de l'image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

// Fermer la Lightbox avec le bouton de fermeture
document.querySelector('.lightbox .close').addEventListener('click', closeLightbox);

// Charger par défaut la catégorie "evenements"
window.onload = () => {
    loadImages('events');
};
