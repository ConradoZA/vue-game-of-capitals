<script setup lang="ts">
import { onMounted, ref } from 'vue';

import logo from './assets/logo.svg';

import { useGeneralStore, useQuizStore, type Country } from './stores';

import GeoMap from '@/components/GeoMap.vue';
import SnackBar from '@/components/SnackBar.vue';
import ScoreMenu from '@/components/ScoreMenu.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheLoader from '@/components/TheLoader.vue';
import TheDrawer from '@/components/TheDrawer.vue';
import TheFooter from '@/components/TheFooter.vue';

interface CustomResponse {
  capitalInfo: {
    latlng: number[];
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
}

const title = 'Game of Capitals';

const general = useGeneralStore();
const quiz = useQuizStore();

const isOpenDrawer = ref<boolean>(false);

const initialLoad = async () => {
  try {
    const rawRes = await fetch(
      'https://restcountries.com/v3.1/all?fields=capitalInfo,capital,name,region'
    );
    const res: CustomResponse[] = await rawRes.json();

    const list: Country[] = [];

    res.forEach((el) => {
      list.push({
        name: el.name.common,
        capital: el.capital[0],
        latlng: el.capitalInfo.latlng,
        region: el.region,
      });
    });

    quiz.loadCapitals(list);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  general.setLoading(true);
  await initialLoad();
  general.setLoading(false);
});
</script>

<template>
  <v-app :theme="general.theme.name" full-height>
    <TheHeader :title="title" @toggle-drawer="() => (isOpenDrawer = !isOpenDrawer)" />

    <v-navigation-drawer v-model="isOpenDrawer" temporary>
      <TheDrawer />
    </v-navigation-drawer>

    <v-main class="w-dvw">
      <ScoreMenu />
      <br />
      <GeoMap />
    </v-main>

    <SnackBar />
    <TheLoader />

    <TheFooter />
  </v-app>

  <teleport to="head">
    <title>{{ title }}</title>
    <link rel="icon" :href="logo" type="image/svg+xml" />
  </teleport>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  /* 
  variables to use like var(--enterprise-primary-color)
  --enterprise-primary-color: #c01e1e;
  */
}

html {
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
