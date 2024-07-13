<script setup lang="ts">
import { useQuizStore } from '@/stores';

const emits = defineEmits(['new-game']);
const { isOpen } = defineProps({ isOpen: { type: Boolean, required: true } });

const quiz = useQuizStore();

const newGame = () => {
  emits('new-game');
};
</script>

<template>
  <v-overlay
    :model-value="isOpen"
    class="bg-amber-200 bg-opacity-40 justify-center align-center"
    persistent
  >
    <v-card class="text-center">
      <v-card-title class="text-h2 font-weight-black">GAME OVER</v-card-title>
      <v-card-text>
        You have survived for {{ quiz.citiesGuessed }} turns. But you needed to know
        {{ -quiz.distanceLeft.toFixed(2) }} km better where {{ quiz.selectedCapital.capital }} is,
        to have continued playing.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="newGame" :variant="'tonal'">New Game!</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>
