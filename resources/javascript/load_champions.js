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

        // Create element for champion's portrait
        const championPortrait = document.createElement("img");
        championPortrait.src = `${dataDragonUrl}/cdn/${version}/img/champion/${champion.image.full}`;
        championPortrait.alt = champion.name;

        // Create element for champion's name
        const championName = document.createElement("h3");
        championName.textContent = champion.name;

        // Create element for champion's title
        const championTitle = document.createElement("p");
        championTitle.textContent = champion.title;

        // Clear the existing content
        championElement.innerHTML = "";

        // Append the new elements
        championElement.appendChild(championPortrait);
        championElement.appendChild(championName);
        championElement.appendChild(championTitle);
        championsContainer.appendChild(championElement);
    });

    // Remove the loading champions message
    loadingChampionsMessage.remove();
})();
