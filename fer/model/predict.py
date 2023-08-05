import numpy as np
import tensorflow as tf
import albumentations as A
import random
import matplotlib.pyplot as plt
import os
from keras.callbacks import ModelCheckpoint
from sklearn import metrics
import seaborn as sns

train_dir = 'dataset/train/'
validation_dir = 'dataset/test/'

img_height = 229
img_width = 229
# bigger batches for testing
batch_size = 200
classes_num = 5
classes_labels = ["Angry", "Fearful", "Happy", "Neutral", "Sad"]


# augmentation pipeline
def transform(image):
    aug = A.Compose([
        A.Resize(img_height, img_width, p=.5),
        A.HorizontalFlip(p=.5),
        # A.RandomBrightnessContrast(p=1, brightness_limit=(-0, 0), contrast_limit=(-0, 0)),
        A.GaussianBlur(p=.5, blur_limit=(3, 17), sigma_limit=0)
    ])
    return aug(image=image)['image']


validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    preprocessing_function=transform,
    rescale=1./255
)

validation_generator = validation_datagen.flow_from_directory(
    validation_dir,
    color_mode='grayscale',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=True
)

loaded_model = tf.keras.models.load_model('model/model-067.h5', compile=False)

# generate batch of images to test on
test_img, test_label = validation_generator.__next__()
predicitons = loaded_model.predict(test_img)

predicitons = np.argmax(predicitons, axis=1)
test_labels = np.argmax(test_label, axis=1)

print("Acuracy = ", metrics.accuracy_score(test_labels, predicitons))

# confusion matrix
plt.figure(1)
cm = metrics.confusion_matrix(test_labels, predicitons)
sns.heatmap(cm, annot=True)

# see example results
n = random.randint(0, test_img.shape[0] - 1)
image = test_img[n]
org_label = classes_labels[test_labels[n]]
pred_label = classes_labels[predicitons[n]]
plt.figure(2)
plt.imshow(image[:, :, 0], cmap='gray')
plt.title("Original label: " + org_label + " Predicted label: " + pred_label)
plt.show()