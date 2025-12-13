/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/pages/login.vue'
import RegistryUser from '@/pages/registryUser.vue'
import Principal from '@/pages/principal.vue'
import Tickets from '@/pages/tickets.vue'
import CrearTicket from '@/pages/crearTicket.vue'
import verTicket from '@/pages/verTicket.vue'


const routes = []

const loginRoute = {
  path: '/',
  component: Login,
}

const registerRoute = {
  path: '/registro',
  name: 'registro',
  component: RegistryUser,
}

const principalRoute = {
  path: '/principal',
  name: 'principal',
  component: Principal,
}

const ticketRoute = {
  path: '/tickets',
  name: 'tickets',
  component: Tickets,
}
const crearTicketRoute = {
  path: '/tickets/crear-ticket',
  name: 'crearTicket',
  component: CrearTicket,
}
const verTicketRoute = {
  path: '/tickets/ver-ticket',
  name: 'verTicket',
  component: verTicket,
}
routes.push(loginRoute, registerRoute, principalRoute, ticketRoute, crearTicketRoute, verTicketRoute)


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
