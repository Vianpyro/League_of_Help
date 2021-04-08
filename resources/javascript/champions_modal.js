async function open_modal(champion, patch, language) {
    const champion_data = await get_json_from_api(`${base_url}/cdn/${patch}/data/${language}/champion/${champion['id']}.json`)

    // Splash art
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion['id']}_0.jpg`

    // Name and title
    document.getElementById('champion_loading_screen_name').innerHTML = champion['name']
    document.getElementById('champion_loading_screen_title').innerHTML = champion['title']

    // Riot Difficulty
    document.getElementById('riot_difficulty').title = `Riot Difficulty: ${champion['info']['difficulty']}/10`
    document.getElementById('champion_riot_difficulty').value = champion['info']['difficulty']
    
    // Spells images
    document.getElementById('champion_passive_image').src = `${base_url}/cdn/${patch}/img/passive/${champion_data['data'][champion['id']]['passive']['image']['full']}`
    for (i = 0; i < 4; i++) {
        document.getElementById(`champion_${['q', 'w', 'e', 'r'][i]}_spell_image`).src = `
        ${base_url}/cdn/${patch}/img/spell/${champion_data['data'][champion['id']]['spells'][i]['image']['full']}`
    }
        
    // Spells description (TODO: Replace "description" with "tooltip" [from the API])
    document.getElementById('passive_description').innerHTML = `<p id="champion_passive_title">${champion_data['data'][champion['id']]['passive']['name']}</p>
    <p>${champion_data['data'][champion['id']]['passive']['description']}</p>`
    for (i = 0; i < 4; i++) {
        let k = ['q', 'w', 'e', 'r'][i];
        document.getElementById(`${k}_spell_description`).innerHTML = `<p id="champion_${k}_spell_title" class="champion_spell_title">${champion_data['data'][champion['id']]['spells'][i]['name']}</p>
        <p>${champion_data['data'][champion['id']]['spells'][i]['description']}</p>`;
    };
    
    // Display the modal
    document.getElementById('modal_champion').style.display = 'flex';
        
    // Close modal by pressing esc key
    document.body.onkeyup = e => {
        if (e.key === 'Escape' || e.key === 'Esc') return document.getElementById('modal_champion').style.display = 'none';
    }

    // Close modal by clicking on modal-close
    document.getElementById('modal_close').addEventListener('click', () => document.getElementById('modal_champion').style.display = 'none');

    // Close modal by clicking out of it
    window.addEventListener('click', function (e) {
        if (document.getElementById('modal_champion_wrapper').contains(e.target)) {
            return;
        }
        if (document.getElementById('modal_champion').contains(e.target)) {
            return document.getElementById('modal_champion').style.display = 'none';
        }
    });
}
