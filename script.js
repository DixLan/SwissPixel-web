document.querySelectorAll('.lightbox').forEach(image => {
    image.addEventListener('click', e => {
        e.preventDefault();
        const src = image.getAttribute('href');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
    });
});