// Display the modal
async function open_modal(champion_data) {
    document.getElementById('champion_loading_screen_image').src = `${base_url}/cdn/img/champion/loading/${champion_data['id']}_0.jpg`
    document.getElementById('champion_loading_screen_name').innerHTML = champion_data['name']
    document.getElementById('champion_loading_screen_title').innerHTML = champion_data['title']
    
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
            console.log('HIDE!')
            return document.getElementById('modal_champion').style.display = 'none';
        }
    });
}
