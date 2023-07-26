import data from './content.json' assert { type: 'json' };

let defaultLanguage = "english";
let langBar = document.getElementById("lang");

changeLang(defaultLanguage);

langBar.addEventListener('click', handleLang);

function changeLang(language) {
   let title = document.getElementById("webcam-head");
   let desc = document.getElementById("webcam-desc");
   let buttonAllow = document.getElementById("agree");
   let buttonReject = document.getElementById("reject");
   title.innerText = data[language]["webcam-head"];
   desc.innerText = data[language]["webcam-desc"];
   buttonAllow.innerText = data[language]["agree"];
   // buttonReject.innerText = data[language]["reject"];
}

function handleLang(event) {
   let attr = event.target.getAttribute("language");
   if (attr) {
      changeLang(attr);
   }
}