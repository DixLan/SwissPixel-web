// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Merci pour votre message, ' + name + '! Nous vous contacterons bientôt.');
        this.reset();
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Lightbox effect for gallery images
document.querySelectorAll('.gallery img').forEach(image => {
    image.addEventListener('click', function() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.cursor = 'pointer';
        document.body.appendChild(lightbox);

        const img = document.createElement('img');
        img.src = this.src;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        lightbox.appendChild(img);

        lightbox.addEventListener('click', function() {
            lightbox.remove();
        });
    });
});


// Afficher le bouton lorsque l'utilisateur défile vers le bas
window.onscroll = function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Remonter en haut de la page lorsque le bouton est cliqué
document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
