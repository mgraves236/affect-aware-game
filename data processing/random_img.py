import os
import numpy as np
from PIL import Image
import cv2
from scipy.ndimage import gaussian_filter, median_filter
import shutil
import pandas as pd

def gaussian_noise(img, mean, std):
    gaussian_noise = np.random.normal(mean, std, img.shape)
    new_img = img + gaussian_noise
    return new_img

# Path to testing dataset
test_path = 'test'


# Copy files to a new path
files = os.listdir(test_path)
new_path = 'random_imgck'
print(os.path.join(test_path, new_path))



# Count class members
class_members = {}
files = {}
for class_name in os.listdir(test_path):
    class_path = os.path.join(test_path, class_name)
    num_images = len(os.listdir(class_path))
    class_members[class_name] = num_images
    files[class_name] = os.listdir(class_path)

np.random.seed(61)
sampled = {}
for class_name in class_members:
    sample_size = 47
    sampled[class_name] = np.random.choice(class_members[class_name], sample_size, replace=False)

for class_name, sample_indices in sampled.items():
    class_path = os.path.join(test_path, class_name)
    
    for index in sample_indices:
        transformed_path = os.path.join(new_path, class_path)
        if not os.path.exists(transformed_path):
            os.makedirs(transformed_path)

        image_path = os.path.join(class_path, files[class_name][index])
        image = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2GRAY)
        
        cv2.imwrite(os.path.join(transformed_path, files[class_name][index]), image)
   