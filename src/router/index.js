import { createRouter, createWebHistory } from 'vue-router';
import TablaClientes from '@/components/TablaClientes.vue';
import PaginaInicio from '@/components/PaginaInicio.vue';
import NotFound from '@/components/NotFound.vue';
import TablaTareas from '@/components/TablaTareas.vue';




const routes = [
  {
    path: '/',
    name: 'home',
    component: PaginaInicio
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: TablaClientes
  },
  {
    path: '/tareas',
    name: 'tareas',
    component: TablaTareas
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
