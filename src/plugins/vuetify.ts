import { createVuetify, type VuetifyOptions } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Styles
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetifyConfig: VuetifyOptions = {
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  // locale: {
  //   locale: (window.navigator.languages[0] ?? window.navigator.language).substring(0, 2),
  //   fallback: 'en',
  //   messages: { en, es },
  // },
  // https://vuetifyjs.com/en/features/theme/
  theme: {
    defaultTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  },
};

export default createVuetify(vuetifyConfig);
