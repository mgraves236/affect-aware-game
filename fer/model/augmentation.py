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

width = 48
height = 48
# Path to testing dataset
test_path = 'train'

percent = 0.3
new_path = str(percent)

# Copy files to a new path
files = os.listdir(test_path)
print(os.path.join(test_path, new_path))
shutil.copytree(test_path, os.path.join(new_path, test_path))
# Define number of transformations
transformations = 6

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
        transformed_path = os.path.join(new_path, class_path)
        if not os.path.exists(transformed_path):
            os.makedirs(transformed_path)

        image_path = os.path.join(class_path, f'im{index}.png')
        image = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2GRAY)
        if i <= sampled_change:
            transformed_image = gaussian_filter(image, sigma=np.random.uniform(0.5,1))
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), transformed_image)
        elif i > sampled_change and i <= 2 * sampled_change:
            jpeg_quality = np.random.randint(0,70) # value between 0 and 100, higher value - higher quality
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), image, [cv2.IMWRITE_JPEG_QUALITY, jpeg_quality])
        elif i > 2* sampled_change and i <= 3 * sampled_change:
            transformed_image = add_gaussian(image, 0, np.random.uniform(3,10))
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), transformed_image)
        elif i > 3 * sampled_change and i <= 4 * sampled_change:
            transformed_image = median_filter(image, size=np.random.randint(1,5))
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), transformed_image)
        elif i > 4 * sampled_change and i <= 5 * sampled_change:
            transformed_image = cv2.cvtColor(cv2.cvtColor(image, cv2.COLOR_GRAY2BGR), cv2.COLOR_BGR2YCrCb)
            transformed_image[:, :, 0] = np.random.uniform(0.5,0.9) * transformed_image[:, :, 0]
            transformed_image = cv2.cvtColor(cv2.cvtColor(transformed_image, cv2.COLOR_YCrCb2BGR), cv2.COLOR_BGR2GRAY)
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), transformed_image)
        elif i > 5 * sampled_change:
            transformed_image = cv2.resize(image, (np.random.randint(1/2 * width, 3/4 * width), np.random.randint(1/2 * height, 3/4 * height)), interpolation = cv2.INTER_AREA)
            transformed_image = cv2.resize(image, (width, height), interpolation = cv2. INTER_CUBIC)
            cv2.imwrite(os.path.join(transformed_path, f'im{index}.png'), transformed_image)
        i = i + 1