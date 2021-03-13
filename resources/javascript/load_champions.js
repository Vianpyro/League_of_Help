const user_lang = navigator.language || navigator.userLanguage; 

async function get_json_from_api(source_url) {
    const request = await fetch(source_url);
    const response = await request.json();
    return response;
}

(async () => {
    // Get the language
    const languages = await get_json_from_api("https://ddragon.leagueoflegends.com/cdn/languages.json");
    const language = languages.includes(user_lang) ? user_lang: "en_US";
    console.log(language);

    // Get the latest release
    const versions = await get_json_from_api("https://ddragon.leagueoflegends.com/api/versions.json");
    console.log(`patch ${versions[0]}`);

    // Get the champions list
    const champions = await get_json_from_api(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/${language}/champion.json`);
    console.log(champions['data']);
    document.getElementById('test').innerHTML = Object.keys(champions['data'])
})();
