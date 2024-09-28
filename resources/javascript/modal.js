const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');

closeButton.addEventListener('click', () => {
    closeModal();
});

window.addEventListener('click', function (e) {
    if (!modal.contains(e.target) && modalContainer.contains(e.target)) {
        closeModal();
    }
});

function closeModal() {
    enableScroll();
    modalContainer.style.display = 'none';
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function fillModal(championId) {
    // Load the champion from the API using their ID
    const champion = fetch(`http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/champion/${championId}.json`)
        .then(response => response.json())
        .then(data => {
            const championData = Object.values(data.data)[0];
            modalTitle.textContent = championData.name;
            modalImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`;
            modalImage.alt = championData.name;
            modalDescription.textContent = championData.blurb;
        });
}

function openModal(champion) {
    disableScroll();
    fillModal(champion);
    modalContainer.style.display = 'flex';
}
