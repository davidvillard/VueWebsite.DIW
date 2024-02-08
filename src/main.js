import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from '@/components/NavBar.vue';


const app = createApp(App);
app.component('NavBar', NavBar);


app.use(router);
app.mount('#app');
