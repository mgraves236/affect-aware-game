// import data from './content.json' assert { type: 'json' };



let defaultLanguage = "polish";
let langBar = document.querySelectorAll(".lang");
export let attr = defaultLanguage;

changeLangIntro(defaultLanguage);
langBar.forEach(lang => {
    lang.addEventListener('click', handleLang);
});

function changeLangIntro(language) {
    document.getElementById("hello").innerText = data[language]["hello"];
    document.getElementById("intro").innerText = data[language]["intro"];
    document.getElementById("survey-header").innerText = data[language]["survey-header"];
    document.getElementById("aim").innerText = data[language]["aim"];
    document.getElementById("desc-old").innerText = data[language]["desc-old"];
    document.getElementById("desc-det").innerText = data[language]["desc-det"];
    document.getElementById("refresh").innerText = data[language]["refresh"];
    document.getElementById("browsers").innerText = data[language]["browsers"];
    document.getElementById("agree-suv").innerText = data[language]["agree-suv"];
    // document.getElementById("first-surv").innerText = data[language]["first-surv"];

}

function handleLang(event) {
    attr = event.target.getAttribute("language");
    if (attr) {
        changeLangIntro(attr);
    }
}