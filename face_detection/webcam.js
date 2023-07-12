let video = document.getElementById("webcam")

const setupCamera = () => {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: true
        })
        .then((stream) => {
            video.srcObject = stream;
        });
};

setupCamera();