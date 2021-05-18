async function open_modal(champion, versions, language, items) {
    const champion_data = await get_json_from_api(`${base_url}/cdn/${versions[0]}/data/${language}/champion/${champion.id}.json`);
    const this_champion_data = champion_data.data[champion.id];

    // Splash art
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion.id}_0.jpg`;

    // Name and title
    document.getElementById('champion_loading_screen_name').innerHTML = champion.name;
    document.getElementById('champion_loading_screen_title').innerHTML = champion.title;

    // Tag(s)
    document.getElementById('champion_tags').innerHTML = this_champion_data.tags.length == 1 ? `<b>Role:</b> ${this_champion_data.tags}.` : `<b>Roles:</b> ${this_champion_data.tags}.`;

    // Riot Difficulty
    document.getElementById('riot_difficulty').title = `Riot Difficulty: ${champion.info.difficulty}/10`;
    document.getElementById('champion_riot_difficulty').value = champion.info.difficulty;

    // Spells images
    document.getElementById('champion_passive_image').src = `${base_url}/cdn/${versions[0]}/img/passive/${this_champion_data.passive.image.full}`;
    for (i = 0; i < 4; i++) {
        document.getElementById(`champion_${spell_keys[i]}_spell_image`).src = `${base_url}/cdn/${versions[0]}/img/spell/${this_champion_data.spells[i].image.full}`;
    }

    // Spells description (TODO: Replace "description" with "tooltip" [from the API])
    document.getElementById('passive_description').innerHTML = `<p id="champion_passive_title">${this_champion_data.passive.name}</p>
        <p>${this_champion_data.passive.description}</p>`;
    for (i = 0; i < 4; i++) {
        // Spell title and name
        document.getElementById(`${spell_keys[i]}_spell_description`).innerHTML = `
            <p id="champion_${spell_keys[i]}_spell_title" class="champion_spell_title">${this_champion_data.spells[i].name}</p>
            <p>${this_champion_data.spells[i].description}</p>`;

        // Spell cooldowns
        document.getElementById(`${spell_keys[i]}_spell_cooldowns`).innerHTML = `Cooldowns: ${this_champion_data.spells[i].cooldown}`;
    }

    // Display the tips and tricks.
    if (this_champion_data.name in tips) {
        document.getElementById('champion_tips').innerHTML = tips[this_champion_data.name][0];
        document.getElementById('submit_tips').href = tips[this_champion_data.name][1];
    } else {
        document.getElementById('champion_tips').innerHTML = '';
        document.getElementById('submit_tips').href = `https://github.com/Vianpyro/league_of_help/issues/new?assignees=Vianpyro&labels=tip&template=tip_submission.md&title=Tip%3A+${this_champion_data.name}`;
    }

    // Implement an array with all the items recommended for the champion.
    document.getElementById('champion_items').innerHTML = '';
    let recommended_items = [];
    if (this_champion_data.recommended.length == 0) {
        // Display the modal early
        document.getElementById('recommended_items').innerHTML = `Loading recommended items...`;
        document.getElementById('modal_champion').style.display = 'flex';

        let patch_index = 1;
        let patch_exists = true;

        while (this_champion_data.recommended.length == 0 && patch_index < versions.length && patch_exists) {
            try {
                const new_data = await get_json_from_api(`${base_url}/cdn/${versions[patch_index]}/data/${language}/champion/${champion.id}.json`);
                this_champion_data.recommended = new_data.data[champion.id].recommended;
                patch_index++;
            } catch (error) {
                patch_exists = false;
            }
        }

        if (patch_exists) {
            document.getElementById('recommended_items').innerHTML = `Recommended items (patch ${versions[patch_index - 1]}):`;
            console.log(`Loading patch ${versions[patch_index - 1]} items for ${this_champion_data.name}`);

            // Push every item in an array.
            for (i = 0; i < this_champion_data.recommended.length; i++) {
                if (this_champion_data.recommended[i].mode == 'CLASSIC') {
                    for (j = 0; j < this_champion_data.recommended[i].blocks.length; j++) {
                        for (k = 0; k < this_champion_data.recommended[i].blocks[j].items.length; k++) {
                            if (!this_champion_data.recommended[i].blocks[j].items[k].hideCount) {
                                recommended_items.push(this_champion_data.recommended[i].blocks[j].items[k].id);
                            }
                        }
                    }
                }
            }

            // Remove the duplicates.
            const unique_items_set = new Set(recommended_items);
            const unique_items = [...unique_items_set];

            // Display the items.
            for (let item of unique_items) {
                try {
                    if (items.data[item].from && (!(items.data[item].into) || new RegExp(['Mythic', 'Legendary'].join("|")).test(items.data[item].description))) {
                        if (items.data[item].from in items.data) {
                            if (!(this_champion_data.name == 'Cassiopeia' && items.data[items.data[item].from].name == 'Boots')) {
                                document.getElementById('champion_items').innerHTML += `<li class="recommended_item"><img src="${base_url}/cdn/${versions[0]}/img/item/${item}.png" title="${items.data[item].name}"></li>`;
                            }
                        } else {
                            document.getElementById('champion_items').innerHTML += `<li class="recommended_item"><img src="${base_url}/cdn/${versions[0]}/img/item/${item}.png" title="${items.data[item].name}"></li>`;
                        }
                    }
                } catch (error) {}
            }
        } else {
            document.getElementById('recommended_items').innerHTML = `No recommended items for this champion.`;
        }
    }

    // Display the modal
    document.getElementById('modal_champion').style.display = 'flex';

    // Close modal by pessing esc key
    document.body.onkeyup = e => {
        if (e.key === 'Escape' || e.key === 'Esc') return document.getElementById('modal_champion').style.display = 'none';
    };

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
