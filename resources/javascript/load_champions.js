const championsCountSpan = document.getElementById("champions-count");
const championsContainer = document.getElementById("champions");
const loadingChampionsMessage = document.getElementById("loading-champions");

(async () => {
    const languages = await getGameLanguages();
    const navigatorLanguage = navigator.language.replace("-", "_") || navigator.userLanguage.replace("-", "_");
    const language = languages.includes(navigatorLanguage) ? navigatorLanguage : "en_US";

    const versions = await getGameVersions();
    const version = versions[0];
    const championData = await getChampionData(version, language);
    const champions = Object.values(championData.data);

    // Update the champions count
    championsCountSpan.textContent = champions.length;

    // Create elements for each champion and append them to the champions container
    champions.forEach(champion => {
        const championElement = document.createElement("div");
        championElement.classList.add("champion");

        // Create img element
        const imgElement = document.createElement('img');
        imgElement.src = `${dataDragonUrl}/cdn/${version}/img/champion/${champion.image.full}`;
        imgElement.alt = champion.name;

        // Create h3 element
        const h3Element = document.createElement('h3');
        h3Element.textContent = champion.name;

        // Create p element
        const pElement = document.createElement('p');
        pElement.textContent = champion.title;

        // Clear the existing content
        championElement.innerHTML = '';

        // Append the new elements
        championElement.appendChild(imgElement);
        championElement.appendChild(h3Element);
        championElement.appendChild(pElement);
        championsContainer.appendChild(championElement);
    });

    // Remove the loading champions message
    loadingChampionsMessage.remove();
})();
