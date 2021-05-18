async function get_json_from_api(source_url) {
    const request = await fetch(source_url);
    const response = await request.json();
    return response;
}

const user_lang = navigator.language || navigator.userLanguage;
const base_url = 'https://ddragon.leagueoflegends.com';
const spell_keys = ['q', 'w', 'e', 'r'];

(async function () {
    const issues = await get_json_from_api('https://api.github.com/repos/Vianpyro/league_of_help/issues');
    const tips = {};

    for (let element in issues) {
        if (issues[element].labels.length > 0) {
            for (let label of issues[element].labels) {
                if (label.name == 'tip') {
                    tips[issues[element].title.substr(5)] = [issues[element].body, issues[element].html_url];
                }
            }
        }
    }

    window.tips = tips;
})();
