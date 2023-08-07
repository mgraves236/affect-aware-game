# Affect Aware Video Games

This project is a part of my Master's Thesis. The main idea is to recognize the player's emotions using a webcam and tune the difficulty of the game according to the player's current mood. The project will use JavaScript and TensorFlowJS, the model for emotion recognition will be written in Python.

### What's done so far

#### Emotion Recognition Dataset
The model will be trained on [FER-2013](https://www.kaggle.com/datasets/ananthu017/emotion-detection-fer) dataset. The dataset contains 35,685 48x48 pixel grayscale images of faces displaying seven emotions (happiness, neutral, sadness, anger, surprise, disgust, fear). For this project, the model needs to identify only five of them: happiness, neutral, sadness, anger, and fear, reducing the dataset to 25,102 training elements and 6,236 testing images.

#### Emotion Recognition Model
Data augmentation is done in Python using [Albumentations](https://github.com/albumentations-team/albumentations/activity). 
Each image is resized to the size of 229 x 229px so that it matches the expected input of the Xception model. Then it is horizontally flipped and Gaussian Blur is added.
The model achieves 63.87% accuracy on FER-2013 testing dataset. 
The trained Xception network was converted into json file with [tfjs-converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter).

#### JavaScript implementation
The first step is to access the user's webcam and detect their face. For this [Face-detction](https://github.com/tensorflow/tfjs-models/tree/master/face-detection) from TensorFlowJS models is used.

The game to be integrated with the AI system is [Pong](https://en.wikipedia.org/wiki/Pong). It has been chosen as it is straightforward how to adjust game difficulty
leaving much space to experiment with parameters that modify it. Player plays against a simple AI which moves a paddle according
to the position of the ball. Difficulty level is mainly dependent on two parameters: paddle speed and 
the ball's acceleration after colliding with the paddle. This two factors are 
dynamically changed based on the player's mood.

