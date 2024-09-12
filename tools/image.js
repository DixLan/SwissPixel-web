const fs = require('fs');
const path = require('path');

// Dossiers d'images
const categories = ['events', 'danses', 'Portfolio Thibaut_MZL', 'sports'];
const baseDir = './images/';

// Créer un objet pour stocker les images
const imagesData = {};

// Lister les fichiers dans chaque catégorie
categories.forEach(category => {
    const dirPath = path.join(baseDir, category);
    const thumbnailDir = path.join(dirPath, 'thumbnails'); // Dossier des miniatures

    // Vérifier si le dossier existe
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath).filter(file => /\.(jpg|webp|jpeg|png|gif)$/i.test(file));

        imagesData[category] = files.map(file => ({
            thumbnail: path.join(category, 'thumbnails', file.replace(path.extname(file), '.webp')).replace(/\\/g, '/'), // Chemin vers la miniature
            full: path.join(category, file).replace(/\\/g, '/') // Chemin vers l'image originale
        }));
    }
});

// Écrire les données dans un fichier JSON
fs.writeFileSync('./images.json', JSON.stringify(imagesData, null, 2));

console.log('Fichier images.json généré avec succès.');
