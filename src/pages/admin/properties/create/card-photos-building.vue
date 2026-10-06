<script setup lang="ts">
import { ref } from 'vue';

import { presignUploadApi } from '@/composables/api/storages/presign-upload.ts';

import { type IForm, type IFormError } from './form';

interface IPhoto {
  file: File;
  preview_url: string;
  url?: string;
  is_uploading: boolean;
  progress: number;
  status: 'converting' | 'uploading' | 'uploaded' | 'error';
  error?: string;
}

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    photos_building: [],
  }),
});

const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    photos_building: [],
  }),
});

const isSaving = defineModel('is-saving', {
  default: false,
});

const photos = ref<IPhoto[]>([]);

const convertToWebp = (
  file: File,
  quality = 0.85,
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext('2d');

      if (!context) {
        reject(new Error('Failed to create canvas context'));
        return;
      }

      context.drawImage(image, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image to WebP'));
            return;
          }

          const filename = file.name.replace(
            /\.[^/.]+$/,
            '.webp',
          );

          resolve(
            new File([blob], filename, {
              type: 'image/webp',
            }),
          );
        },
        'image/webp',
        quality,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    image.src = objectUrl;
  });
};

const uploadToPresignedUrl = (
  url: string,
  photo: IPhoto,
  file: File,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url, true);

    xhr.upload.onloadstart = () => {
      photo.progress = 0;
    };

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || event.total <= 0) {
        return;
      }

      photo.progress = Math.round(
        (event.loaded / event.total) * 100,
      );
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        photo.progress = 100;
        resolve();
        return;
      }

      reject(
        new Error(`Upload failed with status ${xhr.status}`),
      );
    };

    xhr.onerror = () => {
      reject(new Error('Upload failed'));
    };

    xhr.onabort = () => {
      reject(new Error('Upload cancelled'));
    };

    xhr.send(file);
  });
};

const uploadPhoto = async (photo: IPhoto): Promise<void> => {
  photo.is_uploading = true;
  photo.progress = 0;
  photo.status = 'converting';
  photo.error = undefined;

  try {
    const webpFile = await convertToWebp(photo.file);

    const response =
      await presignUploadApi();

    photo.status = 'uploading';

    await uploadToPresignedUrl(
      response.upload_url,
      photo,
      webpFile,
    );

    photo.url = `${response.domain}${response.path}`;
    photo.progress = 100;
    photo.status = 'uploaded';

    if (!data.value.photos_building) {
      data.value.photos_building = [];
    }

    data.value.photos_building.push(photo.url);
  } catch (error) {
    photo.status = 'error';
    photo.error =
      error instanceof Error
        ? error.message
        : 'Failed to upload photo';
  } finally {
    photo.is_uploading = false;
  }
};

const onFileSelect = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);

  if (!files.length) {
    return;
  }

  for (const file of files) {
    photos.value.push({
      file,
      preview_url: URL.createObjectURL(file),
      is_uploading: false,
      progress: 0,
      status: 'converting',
    });

    const photo = photos.value[photos.value.length - 1];

    if (!photo) {
      continue;
    }

    await uploadPhoto(photo);
  }

  input.value = '';
};

const makeCover = (index: number): void => {
  if (index === 0) {
    return;
  }

  const photo = photos.value[index];

  if (!photo) {
    return;
  }

  photos.value.splice(index, 1);
  photos.value.unshift(photo);

  if (photo.url && data.value.photos_building) {
    const photosBuilding = data.value.photos_building.filter(
      (url) => url !== photo.url,
    );

    data.value.photos_building = [
      photo.url,
      ...photosBuilding,
    ];
  }
};

const removePhoto = (index: number): void => {
  const photo = photos.value[index];

  if (!photo) {
    return;
  }

  URL.revokeObjectURL(photo.preview_url);

  if (photo.url && data.value.photos_building) {
    data.value.photos_building = data.value.photos_building.filter(
      (url) => url !== photo.url,
    );
  }

  photos.value.splice(index, 1);
};
</script>

<template>
  <base-card title="Photos - Building">
    <div class="my-5">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <!-- Photos -->
        <div
          v-for="(photo, index) in photos"
          :key="photo.preview_url"
          class="relative aspect-square overflow-hidden rounded-lg border bg-gray-50"
        >
          <img
            :src="photo.preview_url"
            :alt="photo.file.name"
            class="h-full w-full object-cover"
          >

          <!-- Cover -->
          <div
            v-if="index === 0 && photo.status === 'uploaded'"
            class="absolute left-2 top-2 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-white bg-black/60"
          >
            Cover
          </div>

          <!-- Converting -->
          <div
            v-if="photo.status === 'converting'"
            class="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-xs text-white"
          >
            Preparing image...
          </div>

          <!-- Upload progress -->
          <div
            v-else-if="photo.status === 'uploading'"
            class="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-xs text-white"
          >
            Uploading {{ photo.progress }}%
          </div>

          <!-- Upload error -->
          <div
            v-else-if="photo.status === 'error'"
            class="absolute inset-x-0 bottom-0 bg-red-600/80 p-2 text-center text-xs text-white"
          >
            {{ photo.error }}
          </div>

          <!-- Make cover -->
          <base-button
            v-if="index !== 0 && photo.status === 'uploaded'"
            size="sm"
            color="info"
            class="absolute bottom-2 left-2"
            @click="makeCover(index)"
          >
            Make cover
          </base-button>

          <!-- Remove -->
          <base-button
            size="sm"
            class="absolute right-2 top-2"
            :disabled="photo.is_uploading"
            @click="removePhoto(index)"
          >
            <base-icon icon="i-fa7-regular:xmark" />
          </base-button>
        </div>

        <!-- Add photo -->
        <base-file-upload
          multiple
          accept="image/*"
          layout="horizontal"
          :disabled="isSaving"
          @change="onFileSelect"
        >
          <template #default="{ fileRef }">
            <button
              type="button"
              class="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 transition hover:border-primary-500 hover:bg-gray-100 hover:text-primary-500"
              @click="fileRef.click()"
            >
              <base-icon
                icon="i-fa7-regular:plus"
                class="text-2xl"
              />

              <span class="text-sm font-medium">
                Add Photos
              </span>
            </button>
          </template>
        </base-file-upload>
      </div>

      <p
        v-if="errors.photos_building?.length"
        class="mt-2 text-sm text-red-500"
      >
        {{ errors.photos_building.join(', ') }}
      </p>
    </div>
  </base-card>
</template>