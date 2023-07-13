## data augmentation for FER2013 dataset

import albumentations as A
import cv2 # read images from the disk
import glob
import os


# augmentation pipeline
transform = A.Compose([
    A.Resize(500, 500, always_apply=True),
    A.HorizontalFlip(always_apply=True),
    A.RandomBrightnessContrast(always_apply=True),
    A.GaussianBlur(always_apply=True, blur_limit=(3, 69), sigma_limit=0)
])
folders = ["angry", "fearful", "happy", "neutral", "sad"]

for emotion in folders:
    path = "dataset/test/" + emotion + "/*.*"
    for file in glob.glob(path):
        image = cv2.imread(file)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        transformed = transform(image=image)
        transformed_image = transformed["image"]
#         cv2.imshow('Color image', transformed_image)
#         # wait for 1 second
#         k = cv2.waitKey(1000)
#         # destroy the window
#         cv2.destroyAllWindows()
        only_filename = os.path.basename(file)
        filename = 'dataset/augmented/test/' + emotion +'/' + only_filename
        print(filename)
        cv2.imwrite(filename, transformed_image)