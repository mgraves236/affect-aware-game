import os
import numpy as np
from PIL import Image
import cv2
from scipy.ndimage import gaussian_filter, median_filter
import shutil

def add_gaussian(img, mean, std):
    gaussian_noise = np.random.normal(mean, std, img.shape)
    new_img = img + gaussian_noise
    return new_img


# Path to testing dataset
test_path = 'test'

new_path = '10'
percent = 0.1

# Copy files to a new path
# files = os.listdir(test_path)
# shutil.copytree(test_path, new_path)

# Define number of transformations
transformations = 2

# Count class members
class_members = {}
for class_name in os.listdir(test_path):
    class_path = os.path.join(test_path, class_name)
    num_images = len(os.listdir(class_path))
    class_members[class_name] = num_images


np.random.seed(61)
sampled = {}
for class_name in class_members:
    sample_size = int(class_members[class_name] * percent)
    sampled[class_name] = np.random.choice(class_members[class_name], sample_size, replace=False)


for class_name, sample_indices in sampled.items():
    class_path = os.path.join(test_path, class_name)
    # Samples per transformation
    sampled_change = len(sample_indices) // transformations
    i = 0
    for index in sample_indices:
        image_path = os.path.join(class_path, f'im{index}.png')
        image = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2GRAY)
        if i <= sampled_change:
            transformed_image = gaussian_filter(image, sigma=np.random.uniform(0.5,1))
        else:
            # transformed_image = add_gaussian(image, 0, np.random.uniform(1,10))
        # transformed_image = median_filter(image, size=size[k])
        #     transformed_image = cv2.cvtColor(cv2.cvtColor(image, cv2.COLOR_GRAY2BGR), cv2.COLOR_BGR2YCrCb)
        #     transformed_image[:, :, 0] = np.random.uniform(0.5,0.9) * transformed_image[:, :, 0]
        #     transformed_image = cv2.cvtColor(cv2.cvtColor(transformed_image, cv2.COLOR_YCrCb2BGR), cv2.COLOR_BGR2GRAY)
        # Save the transformed image
        transformed_path = os.path.join(new_path, class_path)
        if not os.path.exists(transformed_path):
            os.makedirs(transformed_path)
        # transformed_image.save(os.path.join(transformed_path, f'im{index}.jpg'))
        cv2.imwrite(os.path.join(transformed_path, f'im{index}.jpg'), transformed_image)
        i = i + 1