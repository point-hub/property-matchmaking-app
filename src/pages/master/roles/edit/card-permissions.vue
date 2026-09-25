```vue
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';

import { getPermissionsApi } from '@/composables/api/master/permissions/get.api';

import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    permissions: [],
  }),
});

const isSaving = defineModel('is-saving', { default: false });

const SCOPE_MAP = {
  master: ['master', 'users', 'roles', 'land-titles', 'facilities', 'problems', 'promos', 'properties'],
  administrator: ['administrator', 'audit-logs'],
} as const;

const RESOURCE_LABELS: Record<string, string> = {
  'master': 'Menu Master',
  'users': 'Users',
  'roles': 'Roles',
  'land-titles': 'Land Titles',
  'facilities': 'Facilities',
  'problems': 'Problems',
  'promos': 'Promos',
  'properties': 'Properties',
  'administrator': 'Menu Administrator',
  'audit-logs': 'Audit Logs',
};

const availablePermissions = ref<Record<string, string[]>>({});

watchEffect(() => {
  if (!Array.isArray(data.value.permissions)) {
    data.value.permissions = [];
  }
});

const toResourceActions = (list: { name: string }[]) => {
  const result: Record<string, string[]> = {};

  for (const { name } of list) {
    const [resource, action] = name.split(':');

    if (!resource || !action) {
      continue;
    }

    result[resource] ??= [];

    if (!result[resource].includes(action)) {
      result[resource].push(action);
    }
  }

  return result;
};

const hasPermission = (resource: string, action: string) => {
  return data.value.permissions?.includes(`${resource}:${action}`) ?? false;
};

const togglePermission = (
  resource: string,
  action: string,
  checked: boolean,
) => {
  const key = `${resource}:${action}`;

  if (checked) {
    if (!data.value.permissions?.includes(key)) {
      data.value.permissions?.push(key);
    }

    return;
  }

  data.value.permissions = data.value.permissions?.filter(
    permission => permission !== key,
  );
};

const checkAll = (
  scope: keyof typeof SCOPE_MAP,
  checked: boolean,
) => {
  for (const resource of SCOPE_MAP[scope]) {
    const actions = availablePermissions.value[resource] ?? [];

    for (const action of actions) {
      togglePermission(resource, action, checked);
    }
  }
};

onMounted(async () => {
  const response = await getPermissionsApi();

  availablePermissions.value = toResourceActions(response.data);
});
</script>

<template>
  <base-card title="Permissions">
    <BaseTabGroup as="div" class="dark:bg-slate-800">
      <BaseTabList class="tablist">
        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0)"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            Master
          </a>
        </BaseTab>

        <BaseTab as="template" v-slot="{ selected }">
          <a
            href="javascript:void(0)"
            class="tab"
            :class="{ 'border-b-2 !border-slate-500': selected }"
          >
            Administrator
          </a>
        </BaseTab>
      </BaseTabList>

      <BaseTabPanels class="flex-1 text-sm p-4">
        <BaseTabPanel
          v-for="scope in Object.keys(SCOPE_MAP) as Array<keyof typeof SCOPE_MAP>"
          :key="scope"
        >
          <div class="flex gap-2 pt-2 pb-8">
            <base-button
              class="px-4!"
              size="xs"
              color="primary"
              :disabled="isSaving"
              @click="checkAll(scope, true)"
            >
              Select All
            </base-button>

            <base-button
              class="px-4!"
              size="xs"
              color="danger"
              :disabled="isSaving"
              @click="checkAll(scope, false)"
            >
              Deselect All
            </base-button>
          </div>

          <div class="flex flex-col gap-4">
            <template
              v-for="resource in SCOPE_MAP[scope]"
              :key="resource">
              <div
                v-if="availablePermissions[resource]"
                class="flex flex-col lg:flex-row lg:gap-8"
              >
                <p class="uppercase font-bold lg:w-48">
                  {{ RESOURCE_LABELS[resource] ?? resource }}
                </p>

                <div
                  v-for="action in availablePermissions[resource]"
                  :key="action"
                >
                  <base-checkbox
                    class="uppercase"
                    :text="action"
                    :disabled="isSaving"
                    :model-value="hasPermission(resource, action)"
                    @update:model-value="
                      (value: boolean) =>
                        togglePermission(resource, action, value)
                    "
                  />
                </div>
              </div>
            </template>
          </div>
        </BaseTabPanel>
      </BaseTabPanels>
    </BaseTabGroup>
  </base-card>
</template>

<style scoped lang="postcss">
.tablist {
  @apply flex overflow-x-auto pt-4 border-b border-slate-200 dark:border-[#191e3a];
}

.tab {
  @apply flex pb-2 px-4 gap-2 items-center -mb-[1px] whitespace-nowrap outline-none;
}
</style>
```
