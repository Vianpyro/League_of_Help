async function open_modal(champion, patch, language) {
    const champion_data = await get_json_from_api(`${base_url}/cdn/${patch}/data/${language}/champion/${champion['id']}.json`)

    // Splash art
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion['id']}_0.jpg`

    // Name and title
    document.getElementById('champion_loading_screen_name').innerHTML = champion['name']
    document.getElementById('champion_loading_screen_title').innerHTML = champion['title']

    // Tag(s)
    const tags = champion_data['data'][champion['id']]['tags']
    if (tags.length > 1) {
        document.getElementById('champion_tags').innerHTML = `<b>Roles:</b> <span id="champion_tags_list"></span>`
        for (i = 0; i < tags.length; i++) {
            if (i == tags.length - 1) {
                document.getElementById('champion_tags_list').innerHTML += `${tags[i]}.`
            } else {
                document.getElementById('champion_tags_list').innerHTML += `${tags[i]}, `
            }
        }
    } else {
        document.getElementById('champion_tags').innerHTML = `<b>Role:</b> ${champion_data['data'][champion['id']]['tags'][0]}.`
    }

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
        // Spell title and name
        document.getElementById(`${spell_keys[i]}_spell_description`).innerHTML = `
        <p id="champion_${spell_keys[i]}_spell_title" class="champion_spell_title">${champion_data['data'][champion['id']]['spells'][i]['name']}</p>
        <p>${champion_data['data'][champion['id']]['spells'][i]['description']}</p>`;

        // Spell cooldowns
        document.getElementById(`${spell_keys[i]}_spell_cooldowns`).innerHTML = `Cooldowns: ${champion_data['data'][champion['id']]['spells'][i]['cooldown']}`
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
