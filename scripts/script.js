document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const projectNameElem = document.getElementById('project-name');
    const photoCounterElem = document.getElementById('photo-counter');
    
    let currentProject = '';
    let currentIndex = 0;
    let images = [];

    // Função para abrir o modal com a imagem correta
    function openModal(index) {
        const projectImages = images.filter(image => image.project === currentProject);
        currentIndex = index;
        modalImage.src = projectImages[currentIndex].src;
        projectNameElem.textContent = currentProject; // Atualiza o nome do projeto
        photoCounterElem.textContent = `${currentIndex + 1} de ${projectImages.length}`;
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Função para mudar a imagem
    function changeImage(direction) {
        const projectImages = images.filter(image => image.project === currentProject);
        currentIndex = (currentIndex + direction + projectImages.length) % projectImages.length;
        modalImage.src = projectImages[currentIndex].src;
        photoCounterElem.textContent = `${currentIndex + 1} de ${projectImages.length}`;
    }

    // Adiciona eventos de clique nas imagens da galeria
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const selectedProject = item.getAttribute('data-project');
            const selectedIndex = Array.from(document.querySelectorAll(`.gallery-item[data-project="${selectedProject}"]`)).indexOf(item);

            // Atualiza o projeto atual e as imagens
            if (selectedProject !== currentProject) {
                currentProject = selectedProject;
                images = Array.from(document.querySelectorAll(`.gallery-item[data-project="${currentProject}"]`)).map(item => ({
                    src: item.getAttribute('data-large'),
                    project: currentProject
                }));
            }

            // Abre o modal com a imagem selecionada
            openModal(selectedIndex);
            modal.style.display = 'block'; // Exibe o modal
        });
    });

    // Adiciona evento de clique para fechar o modal
    closeBtn.addEventListener('click', closeModal);

    // Adiciona eventos de clique para mudar a imagem
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1)
        }
    });

    // Fecha o modal quando clicar fora da imagem
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
