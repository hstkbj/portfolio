import './bootstrap';
import { createApp, watch } from 'vue';
import App from './components/App.vue'
import router from './components/router/index.js'

const app = createApp(App)

app.use(router);
app.mount('#app');