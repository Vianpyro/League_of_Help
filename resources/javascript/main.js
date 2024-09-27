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

(async () => {
    const languages = await getGameLanguages();
    const navigatorLanguage = navigator.language || navigator.userLanguage;
    const language = languages.includes(navigatorLanguage) ? navigatorLanguage : "en_US";

    console.log(language);
})();
