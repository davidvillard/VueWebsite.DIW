import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NavBar from '@/components/NavBar.vue';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css';


const app = createApp(App);
app.component('NavBar', NavBar);


app.use(router);
app.mount('#app');
