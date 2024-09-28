const dataDragonUrl = "https://ddragon.leagueoflegends.com";
const spellKeys = ["q", "w", "e", "r"];

async function getGameVersions() {
    const response = await fetch(`${dataDragonUrl}/api/versions.json`);
    return response.json();
}

async function getGameLanguages() {
    const response = await fetch(`${dataDragonUrl}/cdn/languages.json`);
    return response.json();
}

async function getChampionData(version, language) {
    const response = await fetch(`${dataDragonUrl}/cdn/${version}/data/${language}/champion.json`);
    return response.json();
};

async function getItemsData(version, language) {
    const response = await fetch(`${dataDragonUrl}/cdn/${version}/data/${language}/item.json`);
    return response.json();
};
