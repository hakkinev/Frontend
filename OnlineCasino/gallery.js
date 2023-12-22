document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const imageSrc = this.getAttribute('data-image');
            lightboxImg.src = imageSrc;
            lightbox.style.display = 'flex';
        });
    });
});

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
