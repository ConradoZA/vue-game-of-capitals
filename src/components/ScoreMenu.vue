<script setup lang="ts">
import { useQuizStore } from '@/stores';

const quiz = useQuizStore();
const question = quiz.selectedCapital;
</script>

<template>
  <v-container class="mx-auto text-center">
    <v-row no-gutters>
      <v-col cols="12">
        You have to find <b>{{ question.capital }}</b> in <b>{{ question.name }}</b>
      </v-col>
      <v-col cols="12" md="6">
        <b>{{ quiz.citiesGuessed }}</b> turns survived
        <v-tooltip activator="parent" location="top">
          Each answer submited is a turn survived... if the distance to your objetive is less than
          your km's left
        </v-tooltip>
      </v-col>
      <v-col cols="12" md="6">
        You have <b>{{ quiz.distanceLeft >= 0 ? quiz.distanceLeft.toFixed(2) : 0 }}</b> km left
        <v-tooltip activator="parent" location="top">
          Each time you submit an answer, we decrement this amount by the distance to the real
          location
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>
