const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', () => {
    const champions = document.querySelectorAll('.champion');
    const query = searchBar.value.toLowerCase();

    champions.forEach(champion => {
        const name = champion.querySelector('h3').textContent.toLowerCase();
        champion.style.display = name.includes(query) ? 'block' : 'none';
    });
});
