// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            playClickSound();
        });
    });

    // Create lightbox dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    lightbox.style.display = 'none'; // Initially hidden
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption" class="caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.dataset.img;
            const description = this.dataset.description;
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = description;
            lightbox.style.display = 'flex'; // Show lightbox
            playClickSound(); // Play click sound
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none'; // Hide lightbox
    });

    // Close lightbox when clicking outside the image
    window.addEventListener('click', e => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none'; // Hide lightbox
        }
    });
});

function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => {
            console.error('Error playing click sound:', error);
        });
    } else {
        console.warn('Click sound element not found.');
    }
}
