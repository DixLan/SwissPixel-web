const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Répertoire source des images (où les images originales sont stockées)
const sourceDir = 'C:/Users/dpeti/Downloads/toWEBP'; // Répertoire racine des images originales

// Taille et qualité des miniatures (paramètre ajustable)
const qualityPercentage = 50; // Qualité de l'image en pourcentage (50% ici)

// Fonction pour traiter tous les fichiers d'un dossier de manière récursive
async function processDirectory(directory) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {
                // Si c'est un dossier, on le traite de manière récursive
                await processDirectory(fullPath);
            } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
                // Si c'est une image, on génère la miniature
                const thumbnailDir = path.join(directory, 'thumbnails'); // Dossier "thumbnails" dans le même dossier que l'image
                const outputFilePath = path.join(thumbnailDir, file); // Chemin de sortie pour la miniature

                // S'assurer que le dossier "thumbnails" existe
                await fs.ensureDir(thumbnailDir);

                console.log(`Processing ${fullPath}...`);

                // Redimensionner l'image et ajuster la qualité
                await sharp(fullPath)
                    .resize({ width: Math.round(800 * (qualityPercentage / 100)) }) // Ajuste la largeur en fonction du pourcentage
                    .toFormat('webp', { quality: qualityPercentage }) // Convertir en WebP avec la qualité donnée
                    .toFile(outputFilePath.replace(path.extname(file), '.webp')); // Sauvegarder la miniature en WebP

                console.log(`Thumbnail created: ${outputFilePath}`);
            } else {
                console.log(`Skipping non-image file: ${file}`);
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error);
    }
}

// Fonction principale pour parcourir le répertoire source
async function generateThumbnails() {
    try {
        // Traiter le répertoire source de manière récursive
        await processDirectory(sourceDir);

        console.log('All thumbnails generated!');
    } catch (error) {
        console.error('Error generating thumbnails:', error);
    }
}

// Exécuter la fonction pour générer les miniatures
generateThumbnails();
