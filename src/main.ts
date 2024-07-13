import { createApp } from 'vue';

import vuetify from './plugins/vuetify';

import App from './App.vue';

import pinia from './stores/index';

const app = createApp(App);

app.use(pinia);
app.use(vuetify);

app.mount('#app');
