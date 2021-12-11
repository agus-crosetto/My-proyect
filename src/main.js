import { createApp } from 'vue'
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);

app.mount('#app');