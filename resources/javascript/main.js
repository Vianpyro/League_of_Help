const navigatorLanguage = navigator.language || navigator.userLanguage;
const dataDragonUrl = "https://ddragon.leagueoflegends.com";
const spellKeys = ["q", "w", "e", "r"];

// Verify if the user is using a language supported by Data Dragon
const supportedLanguages = [null];
