<script setup lang="ts">
import { useQuizStore, type Dificulty } from '@/stores';
import { computed } from 'vue';

const quiz = useQuizStore();

const dificultyList: Dificulty[] = ['easy', 'normal', 'hard'];

const dificulty = computed<Dificulty>({
  get: () => quiz.dificulty,
  set: (v) => quiz.setDificulty(v),
});

const region = computed<string>({
  get: () => quiz.selectedRegion,
  set: (v) => quiz.setRegion(v),
});
</script>

<template>
  <v-select
    class="mt-5"
    label="Region"
    density="comfortable"
    variant="solo-filled"
    v-model="region"
    :items="quiz.regionsList"
  />
  <v-select
    label="Dificulty"
    density="comfortable"
    variant="solo-filled"
    v-model="dificulty"
    :items="dificultyList"
  />
</template>
