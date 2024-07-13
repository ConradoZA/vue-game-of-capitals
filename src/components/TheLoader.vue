<script setup lang="ts">
import { computed } from 'vue';

import { useGeneralStore } from '@/stores';

const general = useGeneralStore();

const loading = computed<boolean>({
  get: () => general.loading,
  set: (v) => general.setLoading(v),
});
</script>

<template>
  <v-overlay v-model="loading" app class="justify-center align-center">
    <v-progress-circular indeterminate size="64" />
  </v-overlay>
</template>
