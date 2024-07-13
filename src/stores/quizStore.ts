import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

export type Country = {
  latlng: number[];
  name: string;
  capital: string;
  region: string;
};

export type Dificulty = 'easy' | 'normal' | 'hard';

export default defineStore('quiz', () => {
  // "private" functions
  const _capitalsList = ref<Country[] | null>(null);

  const _filteredCapitalsByRegion = computed(() => {
    if (regionsList.value.includes(selectedRegion.value) && selectedRegion.value !== 'All') {
      return _capitalsList.value?.filter((el) => el.region === selectedRegion.value);
    }
    return _capitalsList.value;
  });

  const _loadRegions = () => {
    _capitalsList.value?.forEach((el) => {
      if (!regionsList.value.includes(el.region)) regionsList.value.push(el.region);
    });
    regionsList.value.sort();
    regionsList.value.unshift('All');
  };

  const _selectNewQuestion = () => {
    const length = _filteredCapitalsByRegion.value?.length;
    if (length && _filteredCapitalsByRegion.value) {
      //for Typescript to infer length and capitalList to not be undefined
      const rdmIndex = Math.floor(Math.random() * length);
      const capital: Country = _filteredCapitalsByRegion.value[rdmIndex];

      selectedCapital.latlng = capital.latlng;
      selectedCapital.capital = capital.capital;
      selectedCapital.name = capital.name;
    }
  };

  const _haversineDistance = (question: number[], answer: number[]) => {
    const lat1 = question[0];
    const long1 = question[1];
    const lat2 = answer[0];
    const long2 = answer[1];

    const distance = (num1: number, num2: number) => (Math.PI / 180) * Math.abs(num1 - num2);
    const toRadian = (angle: number) => (Math.PI / 180) * angle;
    const EARTH_RADIUS_KM = 6371;

    const yDistance = distance(lat2, lat1);
    const xDistance = distance(long2, long1);

    const latRad1 = toRadian(lat1);
    const latRad2 = toRadian(lat2);

    const a =
      Math.pow(Math.sin(yDistance / 2), 2) +
      Math.pow(Math.sin(xDistance / 2), 2) * Math.cos(latRad1) * Math.cos(latRad2);
    const c = 2 * Math.asin(Math.sqrt(a));

    const finalDistance = EARTH_RADIUS_KM * c;

    if (!finalDistance) return 0;

    return finalDistance;
  };

  // One-time load functions
  const loadCapitals = (data: Country[]) => {
    _capitalsList.value = data;
    _loadRegions();
    _selectNewQuestion();
  };

  // Capitals related functions
  const selectedCapital = reactive<Country | Record<PropertyKey, never>>({});

  const guessToCapitalDistance = computed(() => {
    if (guessLocation.value) {
      return _haversineDistance(guessLocation.value, selectedCapital.latlng);
    }
    return Infinity;
  });

  // Game options functions
  const regionsList = ref<string[]>([]);

  const selectedRegion = ref<string>('All');

  const setRegion = (region: string) => {
    selectedRegion.value = region;
    if (region !== (selectedCapital.region || 'All')) _selectNewQuestion();
  };

  const dificulty = ref<Dificulty>('normal');

  const setDificulty = (newDif: Dificulty) => (dificulty.value = newDif);

  // User stats functions
  const distanceLeft = ref<number>(1500);

  const restDistance = (n: number) => (distanceLeft.value -= n);

  const guessLocation = ref<number[] | null>(null);

  const setGuess = (userGuess: number[] | null) => (guessLocation.value = userGuess);

  const citiesGuessed = ref<number>(0);

  // QoL functions
  const newTurn = () => {
    restDistance(guessToCapitalDistance.value);
    if (distanceLeft.value > 0) {
      citiesGuessed.value++;
      _selectNewQuestion();
    }
  };

  const resetGame = () => {
    setRegion('All');
    setDificulty('normal');
    setGuess(null);
    distanceLeft.value = 1500;
    citiesGuessed.value = 0;
    _selectNewQuestion();
  };

  return {
    loadCapitals,
    selectedCapital,
    regionsList,
    selectedRegion,
    setRegion,
    distanceLeft,
    restDistance,
    citiesGuessed,
    newTurn,
    guessLocation,
    setGuess,
    dificulty,
    setDificulty,
    guessToCapitalDistance,
    resetGame,
  };
});
