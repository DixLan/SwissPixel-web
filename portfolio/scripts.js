// Menu burger toggle
const burgerMenu = document.getElementById('burger-menu');
const menu = document.getElementById('menu');

burgerMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
});

// Fonction pour charger les images avec lazy loading
function loadImages(category) {
    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';

            // Ajouter les images de la catégorie
            data[category].forEach(imagePath => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                const img = document.createElement('img');
                img.setAttribute('src', imagePath);
                img.setAttribute('loading', 'lazy'); // Lazy loading
                img.onload = () => {
                    adjustImageHeight(galleryItem, img); // Ajuste la hauteur une fois l'image chargée
                };
                img.addEventListener('click', () => openLightbox(img.src)); // Ouvrir la Lightbox au clic
                galleryItem.appendChild(img);
                gallery.appendChild(galleryItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des images:', error));
}

// Ajuste la hauteur des images en fonction de leur aspect ratio
function adjustImageHeight(item, img) {
    const rowHeight = 8.33; // Hauteur définie dans grid-auto-rows
    const imgHeight = img.naturalHeight;
    const imgWidth = img.naturalWidth;
    const aspectRatio = imgHeight / imgWidth;
    item.style.gridRowEnd = `span ${Math.ceil(aspectRatio * 100 / rowHeight)}`;
}

// Fonction pour ouvrir la Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;

    lightbox.classList.add('show'); // Ajouter la classe pour afficher la Lightbox

    // Écouter les événements du clavier pour fermer avec Escape
    document.addEventListener('keydown', closeLightboxOnEscape);
}

// Fonction pour fermer la Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');

    lightbox.classList.remove('show'); // Retirer la classe show

    // Retirer l'écouteur d'événement pour la touche Escape
    document.removeEventListener('keydown', closeLightboxOnEscape);
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
    loadImages('evenements');
};
