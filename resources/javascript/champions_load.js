(async () => {
    let tags_array = []
    try {
        // Get the language
        const languages = await get_json_from_api(`${base_url}/cdn/languages.json`);        
        const language = languages.includes(user_lang) ? user_lang: "en_US";

        // Get the latest release
        const versions = await get_json_from_api(`${base_url}/api/versions.json`);
        console.log(`patch ${versions[0]} - ${language}`);

        // Get the champions list
        const champions_data = await get_json_from_api(`${base_url}/cdn/${versions[0]}/data/${language}/champion.json`);
        const champions_list = Object.keys(champions_data['data']);

        // Get the items list
        const items_data = await get_json_from_api(`${base_url}/cdn/${versions[0]}/data/${language}/item.json`)

        // Write the "top text"
        document.getElementById('toptext_champions').innerHTML = champions_list.length;
        document.getElementById('toptext_champions').title = `patch ${versions[0]}`;

        // Display all the champions
        for (champion of champions_list) {
            // Save the champion name (to prevent bugs).
            const champ = champion;

            // Create the 'img' element and define its properties.
            const champion_image = document.createElement('img');
            champion_image.loading = 'lazy'
            champion_image.classList.add('champion_icon')
            champion_image.id = `${champ}_icon`
            champion_image.src = `${base_url}/cdn/${versions[0]}/img/champion/${champ}.png`

            // Create the 'a' element and define its properties.
            const a_to_open_modal = document.createElement('a');
            a_to_open_modal.append(champion_image);
            a_to_open_modal.classList.add(`click_to_open_${champ}_modal`);
            a_to_open_modal.addEventListener('click', () => { open_modal(champions_data['data'][champ], versions, language, items_data) });
            a_to_open_modal.innerHTML += `<figcaption>${champions_data['data'][champ]['name']}</figcaption>`;
            
            // Create the 'figure' element and define its properties.
            const figure = document.createElement('figure');

            // Add the tags of the champion to the figure element.
            for (tag of champions_data['data'][champion]['tags']) {
                figure.classList.add(tag);
                
                // Save every different tag in an array.
                if (!(tags_array.includes(tag))) {
                    tags_array.push(tag);
                };
            };

            // Add the 'a' element to the 'figure' element.
            figure.append(a_to_open_modal);

            // Add the figure to the document.
            document.getElementById('wrapper').append(figure);
        };
    } catch (error) {
        document.getElementById('fetch_error').innerHTML = error;
    };
    
    // Add tags list on top of the champions
    for (tag of tags_array.sort()) {
        // Save the tag name (to prevent bugs).
        const this_tag = tag;

        // Create the 'img' element and define its properties.
        const tag_image = document.createElement('img');
        tag_image.loading = 'lazy';
        tag_image.src = `resources/images/tags/${this_tag.toLowerCase()}.png`;
        tag_image.style.backgroundColor = '#ccc'

        // Create the 'a' element and define its properties.
        const a_to_display_by_tag = document.createElement('a');
        a_to_display_by_tag.append(tag_image)
        a_to_display_by_tag.classList.add(`click_to_show_only_${this_tag}s`);
        a_to_display_by_tag.title = `${this_tag}s`
        a_to_display_by_tag.addEventListener('click', () => { display_by_tag(this_tag) });


        // Create the 'span' element and define its properties.
        const span = document.createElement('span');
        span.classList.add(tag);
        span.append(a_to_display_by_tag);

        // Add the span to the document.
        document.getElementById('tags').append(span);
    };
})();
