import data from './content.json' assert { type: 'json' };

let defaultLanguage = "english";
let langBar = document.getElementById("lang");
export let attr = defaultLanguage;
// export const attr = {
//    value: defaultLanguage,
//    get lang() {
//       return this.value;
//    },
//    set lang(val) {
//       this.value = val;
//       this.langListener(val);
//    },
//    langListener: function (val) {},
//    registerNewListener: function (externalListenerFunction) {
//       this.langListener = externalListenerFunction;
//    },
// };
//
// // listen for new predictions
// attr.registerNewListener((val) => console.log(val));


changeLang(defaultLanguage);

langBar.addEventListener('click', handleLang);

function changeLang(language) {
   document.getElementById("show-video-label").innerText = data[language]["show-video"];
   document.getElementById("webcam-head").innerText = data[language]["webcam-head"];
   document.getElementById("webcam-desc").innerText = data[language]["webcam-desc"];
   document.getElementById("agree").innerText = data[language]["agree"];
   // document.getElementById("reject").innerText = data[language]["reject"];
}

function handleLang(event) {
   attr = event.target.getAttribute("language");
   if (attr) {
      changeLang(attr);
   }
}