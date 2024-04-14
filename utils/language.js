import data from './content.json' assert { type: 'json' };

let defaultLanguage = "polish";
let langBar = document.querySelectorAll(".lang");
export let attr = defaultLanguage;

changeLang(defaultLanguage);
langBar.forEach(lang => {
   lang.addEventListener('click', handleLang);
});

function changeLang(language) {
   document.getElementById("about").innerText = data[language]["about"];
   document.getElementById("about").setAttribute("data-tooltip", data[language]["about-text"]);
   document.getElementById("show-video-label").innerText = data[language]["show-video"];
   document.getElementById("webcam-head").innerText = data[language]["webcam-head"];
   document.getElementById("webcam-desc").innerText = data[language]["webcam-desc"];
   document.getElementById("agree").innerText = data[language]["agree"];
   // document.getElementById("enable-emotion-label").innerText = data[language]["enable-emotion"];
   document.getElementById("survey").innerText = data[language]["survey"];
   // document.getElementById("reject").innerText = data[language]["reject"];
   // document.getElementById("time-label").innerText = data[language]["time-label"];
   document.getElementById("predict").innerText = data[language]["predict"];
}

function handleLang(event) {
   attr = event.target.getAttribute("language");
   if (attr) {
      changeLang(attr);
   }
}