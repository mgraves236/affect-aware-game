import os
import numpy as np
from PIL import Image
import cv2
from scipy.ndimage import gaussian_filter, median_filter
import shutil
import pandas as pd


face_classifier = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Path to testing dataset
test_path = 'CK+'
new_path = 'face'

# Copy files to a new path
files = os.listdir(test_path)
print(os.path.join(test_path, new_path))
# shutil.copytree(test_path, os.path.join(new_path, test_path))

# Count class members
class_members = {}
files = {}
for class_name in os.listdir(test_path):
    class_path = os.path.join(test_path, class_name)
    num_images = len(os.listdir(class_path))
    class_members[class_name] = num_images
    files[class_name] = os.listdir(class_path)


print(files)
for class_name in files:
    class_path = os.path.join(test_path, class_name)
    # Samples per transformation
    for index in range (len(files[class_name])):
        transformed_path = os.path.join(new_path, class_path)
        if not os.path.exists(transformed_path):
            os.makedirs(transformed_path)

        image_path = os.path.join(class_path, files[class_name][index])
        img = cv2.imread(image_path)
        image = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2GRAY)

        face = face_classifier.detectMultiScale(image, scaleFactor=1.1, minNeighbors=15, minSize=(100, 100))
        i = 0
        for (x, y, w, h) in face:

           # cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 4)
           cropped_image = img[y:y+h, x:x+w, : ]

        # print(cropped_image)
        cv2.imwrite(os.path.join(transformed_path, files[class_name][index]), cropped_image)
