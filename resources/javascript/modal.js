const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');

closeButton.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (!modal.contains(e.target) && modalContainer.contains(e.target)) {
        closeButton.click();
    }
});

function fillModal(champion) {
    modalTitle.innerText = champion;
}

function openModal(champion) {
    fillModal(champion);
    modalContainer.style.display = 'flex';
}
