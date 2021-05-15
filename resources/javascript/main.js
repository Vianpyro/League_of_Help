async function get_json_from_api(source_url) {
    const request = await fetch(source_url);
    const response = await request.json();
    return response;
}

const user_lang = navigator.language || navigator.userLanguage;
const base_url = 'https://ddragon.leagueoflegends.com';
const spell_keys = ['q', 'w', 'e', 'r'];
const issues = async () => {
    const r = await get_json_from_api('https://api.github.com/repos/Vianpyro/league_of_help/issues');
    return r
}
console.log(issues())
