import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:8080';
axios.defaults.headers.common['Authorization'] = 'bearer' + localStorage.getItem('token');

const app = createApp(App);
app.component('NavBar', NavBar);


app.use(router);
app.mount('#app');
