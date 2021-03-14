async function open_modal(champion_data) {
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion_data['id']}_0.jpg`
    document.getElementById('champion_loading_screen_name').innerHTML = champion_data['name']
}