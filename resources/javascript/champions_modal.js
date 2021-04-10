async function open_modal(champion, patch, language, items) {
    const champion_data = await get_json_from_api(`${base_url}/cdn/${patch}/data/${language}/champion/${champion['id']}.json`)
    const this_champion_data = champion_data['data'][champion['id']]

    // Splash art
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion['id']}_0.jpg`

    // Name and title
    document.getElementById('champion_loading_screen_name').innerHTML = champion['name']
    document.getElementById('champion_loading_screen_title').innerHTML = champion['title']

    // Tag(s)
    if (this_champion_data['tags'].length > 1) {
        document.getElementById('champion_tags').innerHTML = `<b>Roles:</b> <span id="champion_tags_list"></span>`
        for (i = 0; i < this_champion_data['tags'].length; i++) {
            if (i == this_champion_data['tags'].length - 1) {
                document.getElementById('champion_tags_list').innerHTML += `${this_champion_data['tags'][i]}.`
            } else {
                document.getElementById('champion_tags_list').innerHTML += `${this_champion_data['tags'][i]}, `
            }
        }
    } else {
        document.getElementById('champion_tags').innerHTML = `<b>Role:</b> ${this_champion_data['tags'][0]}.`
    }

    // Riot Difficulty
    document.getElementById('riot_difficulty').title = `Riot Difficulty: ${champion['info']['difficulty']}/10`
    document.getElementById('champion_riot_difficulty').value = champion['info']['difficulty']
    
    // Spells images
    document.getElementById('champion_passive_image').src = `${base_url}/cdn/${patch}/img/passive/${this_champion_data['passive']['image']['full']}`
    for (i = 0; i < 4; i++) {
        document.getElementById(`champion_${['q', 'w', 'e', 'r'][i]}_spell_image`).src = `
        ${base_url}/cdn/${patch}/img/spell/${this_champion_data['spells'][i]['image']['full']}`
    }

    // Spells description (TODO: Replace "description" with "tooltip" [from the API])
    document.getElementById('passive_description').innerHTML = `<p id="champion_passive_title">${this_champion_data['passive']['name']}</p>
    <p>${this_champion_data['passive']['description']}</p>`
    for (i = 0; i < 4; i++) {
        // Spell title and name
        document.getElementById(`${spell_keys[i]}_spell_description`).innerHTML = `
        <p id="champion_${spell_keys[i]}_spell_title" class="champion_spell_title">${this_champion_data['spells'][i]['name']}</p>
        <p>${this_champion_data['spells'][i]['description']}</p>`;

        // Spell cooldowns
        document.getElementById(`${spell_keys[i]}_spell_cooldowns`).innerHTML = `Cooldowns: ${this_champion_data['spells'][i]['cooldown']}`
    };

    // Please me optimize this code ASAP!!!
    // TODO: Create an empty array and implement all the recommended items in it, then remove the starting items (1000-2000?) etc...
    document.getElementById('champion_items').innerHTML = ''
    document.getElementById('recommended_items_text').innerHTML = ''
    try {
        for (i = 0; i < this_champion_data['recommended'][4]['blocks'].length; i++) {
            if (['essential', 'npe4', 'standard', 'offensive', 'odyyasuo1', 'recommended'].includes(this_champion_data['recommended'][4]['blocks'][i]['type'])) {
                document.getElementById('champion_items').innerHTML += `
                    <ul class="champion_items_list" id="${this_champion_data['recommended'][4]['blocks'][i]['type']}"></ul>`;
    
                for (j = 0; j < this_champion_data['recommended'][4]['blocks'][i]['items'].length; j++) {
                    if (this_champion_data['recommended'][4]['blocks'][i]['items'][j]['id'] in items['data']) {
                        document.getElementById(this_champion_data['recommended'][4]['blocks'][i]['type']).innerHTML += `
                            <li><img src="${base_url}/cdn/${patch}/img/item/${this_champion_data['recommended'][4]['blocks'][i]['items'][j]['id']}.png"></li>`
                    };
                };
            }
        };
        document.getElementById('recommended_items_text').innerHTML = 'Recommended items:'
    } catch {};

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
