const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImageBig = document.getElementById('modal-image-big');
const modalImageSmall = document.getElementById('modal-image-small');
const championAbilities = document.getElementById('modal-abilities');
const difficultyMeter = document.getElementById('modal-difficulty-meter');

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

function createAbilityElement(imageSrc, captionText) {
    const element = document.createElement('li');
    const image = document.createElement('img');
    image.src = imageSrc;
    const caption = document.createElement('figcaption');
    caption.innerText = captionText;
    element.appendChild(image);
    element.appendChild(caption);
    return element;
}

function fillAbilities(patch, passive, abilities) {
    const passiveElement = createAbilityElement(`${dataDragonUrl}/cdn/${patch}/img/passive/${passive.image.full}`, passive.name);
    championAbilities.appendChild(passiveElement);

    abilities.forEach((ability, index) => {
        const abilityElement = createAbilityElement(`${dataDragonUrl}/cdn/${patch}/img/spell/${ability.image.full}`, defaultSpellKeys[index]);
        championAbilities.appendChild(abilityElement);
    });
}

function fillDifficulty(difficulty) {
    if (difficulty == 0) {
        difficultyMeter.removeAttribute('value');
        difficultyMeter.title = 'Difficulty to master unknown';
        return;
    }

    difficultyMeter.value = difficulty;
    difficultyMeter.title = `Difficulty to master: ${difficulty}/10`;
}

function fillNameAndTitle(name, title) {
    const championName = document.createElement('span');
    championName.textContent = name;
    modalTitle.appendChild(championName);

    const championTitle = document.createElement('span');
    championTitle.textContent = title;

    modalTitle.appendChild(championTitle);
}

async function fillModal(patch, championId) {
    // Load the champion from the API using their ID
    const champion = await fetch(`${dataDragonUrl}/cdn/${patch}/data/en_US/champion/${championId}.json`)
        .then(response => response.json())
        .then(data => {
            const championData = Object.values(data.data)[0];
            return championData;
        });

    console.log(champion);

    // Display the champion's information in the modal
    fillNameAndTitle(champion.name, champion.title);
    modalImageBig.src = `${dataDragonUrl}/cdn/img/champion/loading/${championId}_0.jpg`;
    modalImageSmall.src = `${dataDragonUrl}/cdn/${patch}/img/champion/${champion.image.full}`;
    modalImageBig.alt = champion.name;
    modalImageSmall.alt = champion.name;
    fillAbilities(patch, champion.passive, champion.spells);
    fillDifficulty(champion.info.difficulty);
}

function openModal(patch, champion) {
    disableScroll();
    fillModal(patch, champion);
    modalContainer.style.display = 'flex';
}

function resetModal() {
    modalTitle.textContent = '';
    modalImageBig.src = '';
    modalImageSmall.alt = '';
    championAbilities.innerHTML = '';
}
