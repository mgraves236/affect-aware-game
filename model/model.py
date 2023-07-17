import tensorflow as tf
import albumentations as A


train_dir = 'dataset/train/'
test_dir = 'dataset/test/'


img_height = 229
img_width = 229
batch_size = 16
classes_num = 5
classes = ["angry", "fearful", "happy", "neutral", "sad"]

# augmentation pipeline
# transforms = A.Compose([
#     A.Resize(img_height, img_width, always_apply=True),
#     A.HorizontalFlip(always_apply=True),
#     A.RandomBrightnessContrast(always_apply=True),
#     A.GaussianBlur(always_apply=True, blur_limit=(3, 69), sigma_limit=0)
# ])


def transform(image):
    aug = A.Compose([
        A.Resize(img_height, img_width, p=.5),
        A.HorizontalFlip(p=.5),
        A.RandomBrightnessContrast(p=.5),
        A.GaussianBlur(p=.5, blur_limit=(3, 69), sigma_limit=0)
    ])
    return aug(image=image)['image']


train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1./255,
)

test_datagen = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    color_mode='grayscale',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=True
)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    color_mode='grayscale',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=True
)

# use the untrained Xception model
# model = tf.keras.applications.Xception(weights=None, input_shape=(img_height, img_width, 3))