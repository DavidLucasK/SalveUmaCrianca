document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const projectName = document.getElementById('project-name');
    const photoCounter = document.getElementById('photo-counter');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const closeBtn = document.querySelector('.close');
    const images = document.querySelectorAll('.imagens-eventos ul li img');
    let currentIndex = 0;

    function openModal(index) {
        modal.style.display = 'flex';
        currentIndex = index;
        updateModal();
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModal() {
        modalImg.src = images[currentIndex].src;
        projectName.textContent = images[currentIndex].alt;
        photoCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateModal();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateModal();
    }

    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            showNext();
        } else if (event.key === 'ArrowLeft') {
            showPrev();
        }
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

window.onload = () => {
    modal.style.display = 'none'; //Oculta o modal por default
}
