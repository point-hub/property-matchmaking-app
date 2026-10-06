<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import TableSettingModal from '@/components/table-setting-modal.vue';
import { getPropertiesApi, type IPropertiesData } from '@/composables/api/properties/get.api';
import { useQueryParams } from '@/composables/query-params';
import { useTableFilter } from '@/composables/table-filter';
import { useTableSetting } from '@/composables/table-setting';
import { useAuthStore } from '@/stores/auth.store';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import ModalDelete from '../components/delete-modal/index.vue';

/**
 * Setup table columns and visibility state using the useTableSetting composable.
 */
const {
  isOpen,
  open,
  close,
  columns,
  visibleColumns,
  countVisibleColumns,
  pageSize,
  pageSizeOptions,
  resetTableSetting,
} = useTableSetting({
  columns: {
    code: { label: 'Code', isVisible: true, isSelectable: false },
    name: { label: 'Name', isVisible: true, isSelectable: true },
    address: { label: 'Address', isVisible: true, isSelectable: true },
    subdistrict: { label: 'Subdistrict', isVisible: true, isSelectable: true },
    district: { label: 'District', isVisible: true, isSelectable: true },
    city: { label: 'City', isVisible: true, isSelectable: true },
    google_map_link: { label: 'Google Map Link', isVisible: true, isSelectable: true },
    instagram: { label: 'Instagram', isVisible: true, isSelectable: true },
    pricelists: { label: 'Pricelists', isVisible: true, isSelectable: true },
    land_titles: { label: 'Land Titles', isVisible: true, isSelectable: true },
    facilities: { label: 'Facilities', isVisible: true, isSelectable: true },
    promos: { label: 'Promos', isVisible: true, isSelectable: true },
    developer_name: { label: 'Developer Name', isVisible: true, isSelectable: true },
    whatsapp: { label: 'Whatsapp', isVisible: true, isSelectable: true },
    mou: { label: 'MOU', isVisible: true, isSelectable: true },
    photos_gate: { label: 'Photos Gate', isVisible: true, isSelectable: true },
    photos_building: { label: 'Photos Building', isVisible: true, isSelectable: true },
    notes: { label: 'Notes', isVisible: false, isSelectable: true },
    is_archived: { label: 'Is Archived', isVisible: false, isSelectable: true },
  },
});

/**
 * Setup filtering, sorting, and pagination state using the useTableFilter composable.
 * - initial filters for all, name, age, gender are empty
 * - initial sort keys all set to 0 (no sort)
 */
const {
  filter,
  resetFilter,
  sort,
  sortObjectToString,
  toggleSort,
  pagination,
  resetPagination,
} = useTableFilter({
  initialFilter: {
    all: '',
    code: '',
    name: '',
    address: '',
    subdistrict: '',
    district: '',
    city: '',
    google_map_link: '',
    instagram: '',
    pricelists: '',
    land_titles: '',
    facilities: '',
    promos: '',
    developer_name: '',
    whatsapp: '',
    mou: '',
    photos_gate: '',
    photos_building: '',
    notes: '',
    is_archived: 'false',
  },
  initialSortKeys: {
    code: 0,
    name: 0,
    address: 0,
    subdistrict: 0,
    district: 0,
    city: 0,
    google_map_link: 0,
    instagram: 0,
    pricelists: 0,
    land_titles: 0,
    facilities: 0,
    promos: 0,
    developer_name: 0,
    whatsapp: 0,
    mou: 0,
    photos_gate: 0,
    photos_building: 0,
    notes: 0,
    is_archived: 0,
  },
});

/**
 * Utilities for updating query parameters in the URL.
 */
const { updateQueryParams, applyQueryParams } = useQueryParams();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

/**
 * Reactive references for:
 * - properties data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const properties = ref<IPropertiesData[]>();
const isInitialSetup = ref(true);
const isLoading = ref(false);
const archivedOptions = ref([{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }]);

/**
 * References for dynamic UI components like row menus and delete modal.
 */
const rowMenuRef = ref();
const deleteModalRef = ref();

/**
 * Function triggered when pagination page changes.
 * Fetches new data for the updated page and updates query params.
 */
const onPageUpdate = async () => {
  if (!isInitialSetup.value) {
    await getData(pagination.page);
    await updateQueryParams({ 'page': pagination.page.toString() });
  }
};

/**
 * Reset pagination to first page and fetch data accordingly.
 */
const resetPageAndFetch = async () => {
  pagination.page = 1;
  await updateQueryParams({ page: 1 });
  await getData();
};

/**
 * Fetch data from API based on current filters, sorting, and pagination.
 * Manages loading state and error handling with user notifications.
 * @param page - Current page number to fetch (default 1)
 */
const getData = async (page = 1) => {
  try {
    isLoading.value = true;
    const response = await getPropertiesApi({
      search: filter,
      sort: sortObjectToString(sort),
      page,
      page_size: pagination.page_size,
    });
    properties.value = response.data;

    Object.assign(pagination, response.pagination);
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handler to reset all filters, sorting, pagination, and table settings.
 * Clears URL query parameters and fetches default data.
 */
const onResetFilter = async () => {
  isInitialSetup.value = true;

  // Clear all query params from URL
  await router.push({ query: undefined });

  // Reset pagination, table settings, filter, and sort states
  resetPagination(pageSize.value.size);
  resetTableSetting();
  resetFilter();

  // Fetch data without any filters applied
  await getData();

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
};

/**
 * Opens the delete confirmation modal for a specific property.
 * Also closes the row menu popover.
 * @param property - The data row to delete
 * @param index - Index of the row for UI references
 */
const onDeleteModal = (property: IPropertiesData, index: number) => {
  rowMenuRef.value[index].toggle(false);
  deleteModalRef.value.toggleModal({
    _id: property._id,
    label: `${property.name}`,
  });
};

/**
 * Handler called after a successful deletion.
 * Refreshes the data list.
 */
const onDeleted = async () => {
  await getData();
};

/**
 * Lifecycle hook: runs when component is mounted.
 * Applies query params to state and fetches initial data.
 */
onMounted(async () => {
  isInitialSetup.value = true;

  // Set initial page size from table setting
  pagination.page_size = pageSize.value.size;

  // Apply query params from route to filter, sort, pagination, columns
  applyQueryParams({
    query: route.query,
    filter,
    sort,
    pagination,
    pageSize,
    pageSizeOptions,
    columns,
  });

  // Fetch initial data
  await getData(pagination.page);

  setTimeout(() => { isInitialSetup.value = false; }, 1000);
});

/**
 * Watcher for filter changes with debounce to reduce API calls.
 * Resets page to 1 and fetches data on filter change.
 * Skips if flagged to prevent API calls on initial setup or manual resets.
 */
watchDebounced(filter, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ search: filter });
    await resetPageAndFetch();
  }
}, { debounce: 500, maxWait: 1000 });

/**
 * Watcher for page size changes.
 * Updates pagination and query params, then fetches data.
 */
watch(pageSize, async () => {
  if (!isInitialSetup.value) {
    pagination.page_size = pageSize.value.size;
    await updateQueryParams({ 'page-size': pagination.page_size.toString() });
    await resetPageAndFetch();
  }
});

/**
 * Watcher for visible columns changes.
 * Updates query params to reflect visible columns.
 */
watch(visibleColumns, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ 'columns': visibleColumns.value });
  }
});

/**
 * Watcher for sort state changes.
 * Updates query params and fetches data accordingly.
 */
watch(sort, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ sort: sortObjectToString(sort) });
    await resetPageAndFetch();
  }
});
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col lg:flex-row gap-2 items-center justify-between mb-8">
      <div class="flex-1 w-full">
        <base-input v-model="filter.all" placeholder="Search..." border="full" :readonly="isLoading">
          <template #prefix>
            <base-icon icon="i-fa7-solid-magnifying-glass" />
          </template>
        </base-input>
      </div>
      <div class="flex gap-1">
        <router-link v-if="authStore.hasPermission('properties:create')" to="/admin/properties/create">
          <base-button color="primary" shape="sharp" class="font-bold">
            <base-icon class="i-lucide:square-plus" /> CREATE
          </base-button>
        </router-link>
        <base-button color="info" @click="open()" :disabled="isLoading" class="font-bold">
          <base-icon class="i-ph:sliders-horizontal-bold" />
        </base-button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <!-- Render visible column headers with sortable buttons -->
            <template v-for="(column, key) in columns">
              <th :key="key" v-if="columns[key]?.isVisible">
                <div class="flex items-center gap-2 whitespace-nowrap">
                  <base-button size="xs" class="p-0!" @click="toggleSort(key)">
                    <base-icon v-if="sort[key] === 0" icon="i-solar:square-sort-vertical-outline" />
                    <base-icon v-if="sort[key] === 1" icon="i-heroicons-solid:sort-ascending" />
                    <base-icon v-if="sort[key] === -1" icon="i-heroicons-solid:sort-descending" />
                  </base-button>
                  <span>{{ column.label }}</span>
                </div>
              </th>
            </template>
          </tr>

          <tr class="bg-slate-100 dark:bg-slate-700">
            <th class="w-1"></th>

            <!-- Render filter inputs for visible columns -->
            <th v-if="columns['code']?.isVisible">
              <base-input v-model="filter.code" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['name']?.isVisible">
              <base-input v-model="filter.name" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['address']?.isVisible">
              <base-input v-model="filter.address" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['subdistrict']?.isVisible">
              <base-input v-model="filter.subdistrict" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['district']?.isVisible">
              <base-input v-model="filter.district" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['city']?.isVisible">
              <base-input v-model="filter.city" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['google_map_link']?.isVisible">
              <base-input v-model="filter.google_map_link" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['instagram']?.isVisible">
              <base-input v-model="filter.instagram" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['pricelists']?.isVisible">
              <base-input v-model="filter.pricelists" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['land_titles']?.isVisible">
              <base-input v-model="filter.land_titles" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['facilities']?.isVisible">
              <base-input v-model="filter.facilities" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['promos']?.isVisible">
              <base-input v-model="filter.promos" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['developer_name']?.isVisible">
              <base-input v-model="filter.developer_name" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['whatsapp']?.isVisible">
              <base-input v-model="filter.whatsapp" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['mou']?.isVisible">
              <base-input v-model="filter.mou" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['photos_gate']?.isVisible">
              <base-input v-model="filter.photos_gate" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['photos_building']?.isVisible">
              <base-input v-model="filter.photos_building" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['notes']?.isVisible">
              <base-input v-model="filter.notes" placeholder="Search..." :readonly="isLoading" border="none" paddingless />
            </th>
            <th v-if="columns['is_archived']?.isVisible">
              <base-choosen
                placeholder="Search..."
                title="Is Archived"
                v-model:options="archivedOptions"
                v-model="filter.is_archived"
                border="none"
                paddingless
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading state with loader spanning all columns -->
          <tr v-if="isLoading">
            <td :colspan="countVisibleColumns + 1">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-loader type="classic" sample="2" />
              </p>
            </td>
          </tr>

          <!-- Show no data found message if no properties and query params exist -->
          <tr v-if="!isLoading && properties?.length === 0 && route.query">
            <td :colspan="countVisibleColumns + 1">
              <div class="w-full flex-col p-10 items-center justify-center gap-2 text-center">
                <p class="text-xl">Data Not Found</p>
                <base-button @click="onResetFilter" variant="filled" color="primary" size="xs" shape="pill" class="my-2">
                  Reset Filter
                </base-button>
              </div>
            </td>
          </tr>

          <!-- Render rows of property data when available -->
          <template v-if="!isLoading && properties && properties.length > 0">
            <tr v-for="(property, index) in properties" :key="index">
              <td>
                <!-- Row action menu -->
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-md!" icon="i-fa7-solid:ellipsis-vertical" />
                  </base-button>
                  <template #content>
                    <base-card class="p-0! gap-0! -mt-2" shadow>
                      <div class="flex flex-col">
                        <router-link :to="`/admin/properties/${property._id}`">
                          <base-button variant="text" color="info" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                            <base-icon icon="i-fa7-light-book-open-cover" />
                            <p class="flex-1">View</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <router-link v-if="authStore.hasPermission('properties:update')" :to="`/admin/properties/${property._id}/edit`">
                          <base-button variant="text" color="info" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                            <base-icon icon="i-fa7-light-file-pen" />
                            <p class="flex-1">Edit</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <base-button v-if="authStore.hasPermission('properties:delete')" @click="onDeleteModal(property, index)" variant="text" color="danger" class="w-full py-1! px-3! m-0! flex gap-2! items-center justify-start text-left!">
                          <base-icon icon="i-fa7-light-trash-xmark" />
                          <p class="flex-1">Delete</p>
                        </base-button>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>

              <!-- Fields rendered conditionally based on column visibility -->
              <td v-if="columns['code']?.isVisible">
                <router-link :to="`/admin/properties/${property._id}`" class="text-blue">{{ property.code }}</router-link>
              </td>
              <td v-if="columns['name']?.isVisible">{{ property.name }}</td>
              <td v-if="columns['address']?.isVisible">{{ property.address }}</td>
              <td v-if="columns['subdistrict']?.isVisible">{{ property.subdistrict }}</td>
              <td v-if="columns['district']?.isVisible">{{ property.district }}</td>
              <td v-if="columns['city']?.isVisible">{{ property.city }}</td>
              <td v-if="columns['google_map_link']?.isVisible">{{ property.google_map_link }}</td>
              <td v-if="columns['instagram']?.isVisible">{{ property.instagram }}</td>
              <td v-if="columns['pricelists']?.isVisible">{{ property.pricelists }}</td>
              <td v-if="columns['land_titles']?.isVisible">{{ property.land_titles }}</td>
              <td v-if="columns['facilities']?.isVisible">{{ property.facilities }}</td>
              <td v-if="columns['promos']?.isVisible">{{ property.promos }}</td>
              <td v-if="columns['developer_name']?.isVisible">{{ property.developer_name }}</td>
              <td v-if="columns['whatsapp']?.isVisible">{{ property.whatsapp }}</td>
              <td v-if="columns['mou']?.isVisible">{{ property.mou }}</td>
              <td v-if="columns['photos_gate']?.isVisible">
                <template v-if="property.photos_gate?.length">
                  <img :src="property.photos_gate[0]" alt="Gate">
                  {{ property.photos_gate[0] }}
                </template>
              </td>
              <td v-if="columns['photos_building']?.isVisible">
                <template v-if="property.photos_building?.length">
                  <img :src="property.photos_building[0]" alt="Gate">
                  {{ property.photos_building[0] }}
                </template>
              </td>
              <td v-if="columns['notes']?.isVisible">{{ property.notes }}</td>
              <td v-if="columns['is_archived']?.isVisible">
                <base-badge v-if="property.is_archived" variant="filled" color="danger" class="font-bold">
                  <base-icon icon="i-fa7-solid:box-archive" /> ARCHIVED
                </base-badge>
              </td>
            </tr>
          </template>
        </tbody>
      </base-table>

      <!-- Pagination component with two-way binding to pagination.page -->
      <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      />
    </div>

    <!-- Delete confirmation modal -->
    <modal-delete ref="deleteModalRef" @deleted="onDeleted" />
  </base-card>

  <!-- Table Setting modal -->
  <table-setting-modal
    :is-open="isOpen"
    :columns="columns"
    :page-size="pageSize"
    :page-size-options="pageSizeOptions"
    @update:close="close"
    @update:pageSize="val => { pageSize = val }"
  />
</template>

<style scoped lang="postcss"></style>
