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

    // Get the latest release
    const versions = await get_json_from_api("https://ddragon.leagueoflegends.com/api/versions.json");
    
    console.log(`patch ${versions[0]} - ${language}`);

    // Get the champions list
    const champions_data = await get_json_from_api(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/${language}/champion.json`);
    const champions_list = Object.keys(champions_data['data'])
    console.log(champions_data['data']);

    // Write the "top text"
    document.getElementById('toptext_champions').innerHTML = champions_list.length
    document.getElementById('toptext_champions').title = `patch ${versions[0]}`

    for (champion of champions_list) {
        document.getElementById('wrap').innerHTML += `
        <figure><a>
            <img class="champion_icon" src="https://ddragon.leagueoflegends.com/cdn/${versions[0]}/img/champion/${champion}.png" />
            <figcaption>${champions_data['data'][champion]['name']}</figcaption>
        </a></figure>`
    };
})();
