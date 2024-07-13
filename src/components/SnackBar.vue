<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useGeneralStore } from '@/stores';

const general = useGeneralStore();

const snackbarVisibility = ref<boolean>(false);

const snackbarText = computed<string>(() => general.message);

watch(
  () => general.message,
  (message) => (snackbarVisibility.value = message !== '')
);

const onSnackbarChanged = () => {
  general.setMessage();
};
</script>

<template>
  <v-snackbar
    absolute
    location="top"
    color="green-accent-4"
    rounded="pill"
    v-model="snackbarVisibility"
    @update:model-value="onSnackbarChanged"
  >
    {{ snackbarText }}
    <template #actions>
      <v-btn icon="mdi-close" @click="onSnackbarChanged" />
    </template>
  </v-snackbar>
</template>
