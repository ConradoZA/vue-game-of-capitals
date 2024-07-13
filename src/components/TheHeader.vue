<script setup lang="ts">
import { onMounted } from 'vue';
import { useGeneralStore } from '../stores';

const emit = defineEmits(['toggle-drawer']);
const { title } = defineProps({ title: { type: String, required: true } });

const config = useGeneralStore();

const LOCALSTORAGE_NAME = 'game-of-capitals-theme';

const toggleDrawer = () => {
  emit('toggle-drawer');
};

const toggleTheme = () => {
  config.toggleTheme();
  localStorage.setItem(LOCALSTORAGE_NAME, config.theme.name);
};

onMounted(() => {
  const oldConfig = localStorage.getItem(LOCALSTORAGE_NAME);

  oldConfig && config.theme.name !== oldConfig && config.toggleTheme();
});
</script>

<template>
  <v-app-bar color="blue-darken-3">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-app-bar-title tag="h1">{{ title }}</v-app-bar-title>
    <v-spacer />
    <v-btn color="blue-darken-2" icon="mdi-theme-light-dark" variant="flat" @click="toggleTheme"
  /></v-app-bar>
</template>
