import tensorflow as tf
import albumentations as A
import random
import matplotlib.pyplot as plt
import os
from keras.callbacks import ModelCheckpoint

train_dir = 'dataset/train/'
validation_dir = 'dataset/test/'

img_height = 229
img_width = 229
batch_size = 16
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


train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    preprocessing_function=transform,
    rescale=1./255,
)

validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    preprocessing_function=transform,
    rescale=1./255
)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    color_mode='grayscale',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=True
)

validation_generator = validation_datagen.flow_from_directory(
    validation_dir,
    color_mode='grayscale',
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=True
)

img, label = train_generator.__next__()

print(img.shape, label.shape)
i = random.randint(0, (img.shape[0])-1)
image = img[i]
lbl = classes_labels[label[i].argmax()]
plt.imshow(image[:,:,0], cmap='gray')
plt.title(lbl)
plt.show()

# use the untrained Xception model
model = tf.keras.applications.Xception(weights=None, input_shape=(img_height, img_width, 1), classes=classes_num)

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

num_train_imgs = 0
for root, dirs, files in os.walk(train_dir):
    num_train_imgs += len(files)

num_validation_imgs = 0
for root, dirs, files in os.walk(validation_dir):
    num_validation_imgs += len(files)

epochs = 10
initial_checkpoint = ModelCheckpoint('/content/drive/MyDrive/model/model-{epoch:03d}.h5')
# checkpoint = ModelCheckpoint('/content/drive/MyDrive/model/model-{epoch:03d}.h5', monitor='val_loss', save_best_only=False, mode='auto')

history = model.fit(
                  train_generator,
                    steps_per_epoch=num_train_imgs//batch_size,
                    epochs=epochs,
                    validation_data=validation_generator,
                    validation_steps=num_validation_imgs//batch_size,
                    callbacks=[initial_checkpoint]
                    )

# string = '/content/drive/MyDrive/model/FER_' + str(epochs) + 'epochs.h5'
# model.save(string)

loss = history.history['loss']
val_loss = history.history['val_loss']
epochs = range(1, len(loss) + 1)
plt.figure(1)
plt.plot(epochs, loss, 'y', label='Training loss')
plt.plot(epochs, loss, 'r', label='Testing loss')
plt.title('Training and testing loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']
plt.figure(2)
plt.plot(epochs, acc, 'y', label='Training accuracy')
plt.plot(epochs, val_acc, 'r', label='Testing accuracy')
plt.title('Training and testing accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()




