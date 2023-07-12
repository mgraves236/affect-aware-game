let model;

const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);
    console.log(prediction);
};

video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();
    await detectFaces();
});

// visualize results

