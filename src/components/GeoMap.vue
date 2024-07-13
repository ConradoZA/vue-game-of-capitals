<script setup lang="ts">
import { computed, ref } from 'vue';

import 'leaflet/dist/leaflet.css';
import { LMap, LMarker, LTileLayer, LIcon, LPopup } from '@vue-leaflet/vue-leaflet';

import icon from '@/assets/gps.svg';

import { useGeneralStore, useQuizStore, type Dificulty } from '@/stores';

import EndGame from '@/components/EndGame.vue';

const quiz = useQuizStore();
const general = useGeneralStore();

const zoom = ref<number>(2);
const mapCenter = ref<number[]>([19.2524, 79.4531]);
const mapRef = ref<typeof LMap | null>(null);

const isEndGame = computed<boolean>(() => quiz.distanceLeft <= 0);

const isMapVisible = computed(() => (dif: Dificulty) => quiz.dificulty === dif);
const displayObjetive = ref<boolean>(false);

const setMarker = (e: any) => {
  let coordinates: number[] = [];

  if (e.type === 'click') {
    coordinates = [e.latlng.lat, e.latlng.lng];
  } else if (e.type === 'moveend') {
    const latlng: { lat: number; lng: number } = e.target.getLatLng();
    coordinates = [latlng.lat, latlng.lng];
  }

  quiz.setGuess(coordinates);
};

const submit = async () => {
  if (quiz.guessLocation) {
    displayObjetive.value = true;

    mapRef.value?.leafletObject.flyTo(quiz.selectedCapital.latlng, 5, {
      animate: true,
      duration: 1.5,
    });

    general.setMessage(
      `Distance to ${quiz.selectedCapital.capital}: ${quiz.guessToCapitalDistance.toFixed(2)} km`
    );

    setTimeout(() => {
      zoom.value = 3;
      quiz.newTurn();
      quiz.setGuess(null);
      displayObjetive.value = false;
    }, 8000);
  } else {
    general.setMessage('You have to create a location first');
  }
};

const newGame = () => {
  quiz.resetGame();
  mapRef.value?.leafletObject.flyTo([19.2524, 79.4531], 2, {
    animate: true,
    duration: 2,
  });
};
</script>

<template>
  <div class="h-[74dvh]">
    <LMap
      ref="mapRef"
      :zoom="zoom"
      :center="mapCenter"
      :use-global-leaflet="false"
      :maxZoom="13"
      :min-zoom="2"
      @click="setMarker"
    >
      <LTileLayer
        name="easyMode"
        :visible="isMapVisible('easy')"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        url="https://api.mapbox.com/styles/v1/zaknar/ckdro50ni05yr19uhuurkjxkm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrbmFyIiwiYSI6ImNrZDYwbDBlcTBkNG4zMHJhd2k2MDFzdDEifQ.vHMVcC1pxUIB4NrNr2QX6Q"
      />
      <LTileLayer
        name="normalMode"
        :visible="isMapVisible('normal')"
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        url="https://api.mapbox.com/styles/v1/zaknar/ckd63bqbe0d251im97xz0vmdo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemFrbmFyIiwiYSI6ImNrZDYwbDBlcTBkNG4zMHJhd2k2MDFzdDEifQ.vHMVcC1pxUIB4NrNr2QX6Q"
      />
      <LTileLayer
        name="hardMode"
        :visible="isMapVisible('hard')"
        attribution="&copy; NASA Blue Marble, image service by OpenGeo"
        layer-type="base"
        url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
      />

      <LMarker v-if="displayObjetive" :lat-lng="quiz.selectedCapital.latlng">
        <LIcon :icon-size="[30, 30]" :icon-anchor="[15, 15]" :icon-url="icon" />
      </LMarker>

      <LMarker
        v-if="quiz.guessLocation"
        draggable
        :lat-lng="quiz.guessLocation"
        @moveend="setMarker"
      >
        <LPopup>
          Lat: {{ quiz.guessLocation[0].toFixed(4) }}, Long: {{ quiz.guessLocation[1].toFixed(4) }}
        </LPopup>
      </LMarker>
    </LMap>
  </div>

  <v-btn color="green-darken-4" class="mx-auto w-fit" block @click="submit">Submit Answer</v-btn>

  <EndGame v-if="isEndGame" @new-game="newGame" :is-open="isEndGame" />
</template>
