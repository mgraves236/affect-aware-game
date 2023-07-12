let video = document.getElementById("video")

const setupCamera = () => {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: { width: 600, height: 400}
        })
}