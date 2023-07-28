let video = document.getElementById("webcam");
let modal = document.getElementById("webcam-alert");
let w, h;
let checkbox = document.getElementById("show-video");
let webcamComponent = document.getElementById("webcam-component");

video.addEventListener(
    "resize",
    videoSize,
    false,
);

document.getElementById("agree").addEventListener('click', closeModal)
setupCamera();

function setupCamera() {

    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video:
                {
                    facingMode: 'user'
                }
        })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            openModal();
        });
}

function openModal() {
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";

}

// resize the html5 video element
function videoSize(ev) {
    w = video.videoWidth;
    h = video.videoHeight;

    if (w && h) {
        video.style.width = w;
        video.style.height = h;
    }
    canvas.height = h;
    canvas.width = w;
}

// show video on page
function showVideo() {
    if (checkbox.checked === true) {
        webcamComponent.style.visibility = "visible";

    } else {
        webcamComponent.style.visibility = "hidden";
    }

}
