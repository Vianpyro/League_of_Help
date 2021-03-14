async function get_json_from_api(source_url) {
    const request = await fetch(source_url);
    const response = await request.json();
    return response;
}

(async () => {
    /*
    CHAMPION ICONS
    */

    // Get the language
    const languages = await get_json_from_api(`${base_url}/cdn/languages.json`);
    const language = languages.includes(user_lang) ? user_lang: "en_US";

    // Get the latest release
    const versions = await get_json_from_api(`${base_url}/api/versions.json`);
    
    console.log(`patch ${versions[0]} - ${language}`);

    // Get the champions list
    const champions_data = await get_json_from_api(`${base_url}/cdn/${versions[0]}/data/${language}/champion.json`);
    const champions_list = Object.keys(champions_data['data']);
    /* console.log(champions_data['data']); */

    // Write the "top text"
    document.getElementById('toptext_champions').innerHTML = champions_list.length;
    document.getElementById('toptext_champions').title = `patch ${versions[0]}`;

    // Display all the champions
    for (champion of champions_list) {
        const champ = champion
        const aToOpenModal = document.createElement("a");
        aToOpenModal.addEventListener("click", () => { open_modal(champions_data['data'][champ]) });
        aToOpenModal.classList.add(`click_to_${champion}_open_modal`);

        aToOpenModal.innerHTML += `
        <img loading="lazy" class="champion_icon" id="${champion}_icon" src="${base_url}/cdn/${versions[0]}/img/champion/${champion}.png" />
        <figcaption>${champions_data['data'][champion]['name']}</figcaption>
        `;

        const figure = document.createElement("figure");
        figure.append(aToOpenModal);
        document.getElementById('wrapper').append(figure)
    };
})();
