const fs = require('fs');
const path = require('path');

// Dossiers d'images
const categories = ['events'];
const baseDir = '../images/';

// Créer un objet pour stocker les images
const imagesData = {};

// Lister les fichiers dans chaque catégorie
categories.forEach(category => {
    const dirPath = path.join(baseDir, category);
    const files = fs.readdirSync(dirPath);

    imagesData[category] = files
        .filter(file => /\.(jpg|webp|jpeg|png|gif)$/i.test(file))
        .map(file => `${dirPath}/${file}`);
});

// Écrire les données dans un fichier JSON
fs.writeFileSync('./images.json', JSON.stringify(imagesData, null, 2));

console.log('Fichier images.json généré avec succès.');
