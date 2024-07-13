import { createPinia, type Pinia } from 'pinia';

import useGeneralStore from './generalStore';
import useQuizStore, { type Country, type Dificulty } from './quizStore';

const pinia: Pinia = createPinia();

export default pinia;

export { useGeneralStore, useQuizStore };
export type { Country, Dificulty };
