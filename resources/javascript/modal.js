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

function createAbilityElements(ability) {
    const abilityElement = document.createElement('li');
    const abilityImage = document.createElement('img');
    const abilityCaption = document.createElement('figcaption');
    const abilityDescription = document.createElement('div');
    const abilityDescriptionTitle = document.createElement('h3');
    const abilityDescriptionTooltip = document.createElement('p');
    const abilityDescriptionCooldown = document.createElement('p');

    abilityImage.src = ability.imageSrc;
    abilityDescriptionTitle.textContent = ability.name;
    abilityDescriptionTooltip.innerHTML = ability.description;
    abilityDescriptionCooldown.textContent = `Cooldown: ${ability.cooldown}`;

    abilityCaption.appendChild(abilityDescription);
    abilityDescription.appendChild(abilityDescriptionTitle);
    abilityDescription.appendChild(abilityDescriptionTooltip);
    abilityDescription.appendChild(abilityDescriptionCooldown);
    abilityElement.appendChild(abilityImage);
    abilityElement.appendChild(abilityCaption);

    return { abilityElement, abilityCaption };
}

function createSpellElement(ability, index) {
    const { abilityElement, abilityCaption } = createAbilityElements(ability);
    const abilityKey = document.createElement('span');

    if (index !== undefined) {
        abilityKey.textContent = defaultSpellKeys[index];
        abilityCaption.appendChild(abilityKey);
    }

    return abilityElement;
}

function createPassiveElement(ability) {
    const { abilityElement } = createAbilityElements(ability);
    return abilityElement;
}

function fillAbilities(patch, passive, abilities) {
    const passiveElement = createPassiveElement({
        imageSrc: `${dataDragonUrl}/cdn/${patch}/img/passive/${passive.image.full}`,
        name: passive.name,
        description: passive.description,
        cooldown: 'N/A'
    });
    championAbilities.appendChild(passiveElement);

    abilities.forEach((ability, index) => {
        const abilityElement = createSpellElement({
            imageSrc: `${dataDragonUrl}/cdn/${patch}/img/spell/${ability.image.full}`,
            name: ability.name,
            description: ability.description,
            cooldown: `${ability.cooldownBurn} second(s)`
        }, index);
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
