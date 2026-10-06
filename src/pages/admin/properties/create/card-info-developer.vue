<script setup lang="ts">
import { presignUploadApi } from '@/composables/api/storages/presign-upload';
import { getFileExtension, isValidFile } from '@/utils/file';

import { type IForm, type IFormError } from './form';


const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    developer_name: undefined,
    whatsapp: undefined,
    mou: undefined,
  }),
});

const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    developer_name: [],
    whatsapp: [],
    mou: [],
  }),
});

const isSaving = defineModel('is-saving', { default: false });

const onFileSelect = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);

  if (!files.length) {
    return;
  }

  for (const file of files) {
    if (!isValidFile(file, ['pdf', 'doc', 'docx'])) {
      return;
    }

    const extension = getFileExtension(file.name);

    const response = await presignUploadApi(extension);

    await uploadToPresignedUrl(
      response.upload_url,
      file,
    );

    data.value.mou = `${response.domain}${response.path}`;
  }
};

const uploadToPresignedUrl = (
  url: string,
  file: File,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url, true);

    xhr.upload.onloadstart = () => {
      // progress = 0;
    };

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || event.total <= 0) {
        return;
      }

      // progress = Math.round(
      //   (event.loaded / event.total) * 100,
      // );
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // progress = 100;
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
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Developer Name" required v-model="data.developer_name" :errors="errors.developer_name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Whatsapp" required v-model="data.whatsapp" :errors="errors.whatsapp" :disabled="isSaving" />

      <base-file-upload layout="horizontal" label="MOU"  @change="onFileSelect" :disabled="isSaving" accept=".pdf,.doc,.docx" />

      {{ data }}
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
