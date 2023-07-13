# Affect Aware Video Games

This project is a part of my Master's Thesis. The main idea is to recognize the player's emotions using a webcam and tune the difficulty of the game according to the player's current mood. The project will use JavaScript and TensorFlowJS, the model for emotion recognition might be written in Python.

### What's done so far

The first step is to access the user's webcam and detect their face. For this [Face-detction](https://github.com/tensorflow/tfjs-models/tree/master/face-detection) from TensorFlowJS models will be used.

Data augmentation will be done in Python using [Albumentations](https://github.com/albumentations-team/albumentations/activity).
