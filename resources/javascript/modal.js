const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const championAbilities = document.getElementById('abilities');

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
    resetModal();
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

async function fillModal(patch, championId) {
    // Load the champion from the API using their ID
    const champion = await fetch(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion/${championId}.json`)
        .then(response => response.json())
        .then(data => {
            const championData = Object.values(data.data)[0];
            return championData;
        });

    // Display the champion's name and image
    modalTitle.textContent = champion.name;
    modalImage.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`;
    modalImage.alt = champion.name;

    fillAbilities(championId, champion.spells);
}

function fillAbilities(championId, abilities) {
    abilities.forEach((ability, index) => {
        const abilityElement = document.createElement('li');
        abilityElement.classList.add('ability');
        abilityElement.innerText = ability.id.startsWith(championId) ? ability.id.slice(championId.length) : defaultSpellKeys[index];
        championAbilities.appendChild(abilityElement);
    });
}

function openModal(patch, champion) {
    disableScroll();
    fillModal(patch, champion);
    modalContainer.style.display = 'flex';
}

function resetModal() {
    modalTitle.textContent = '';
    modalImage.src = '';
    modalImage.alt = '';
    championAbilities.innerHTML = '';
}
