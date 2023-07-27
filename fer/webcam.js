let video = document.getElementById("webcam");
let modal = document.getElementById("webcam-alert");
let w, h;

video.addEventListener(
    "resize",
    videoSize,
    false,
);

document.getElementById("agree").addEventListener('click', closeModal)

// openModal();
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
