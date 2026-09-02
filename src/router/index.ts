import { createRouter, createWebHistory } from 'vue-router'
import LoginPanel from '../components/LoginPanel.vue'
import RegisterPanel from '../components/RegisterPanel.vue'
import RecoverPanel from '../components/RecoverPanel.vue'
import PortalLayout from '../views/portal/PortalLayout.vue'
import PortalDashboard from '../views/portal/PortalDashboard.vue'
import PortalCatalog from '../views/portal/PortalCatalog.vue'
import PortalOrders from '../views/portal/PortalOrders.vue'
import PortalSubscriptions from '../views/portal/PortalSubscriptions.vue'
import PortalSupport from '../views/portal/PortalSupport.vue'
import PortalSettings from '../views/portal/PortalSettings.vue'
import { fisinorClientsConfig } from '../config/fisinorClientsConfig'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginPanel, meta: { layout: 'auth' } },
    { path: '/register', name: 'register', component: RegisterPanel, meta: { layout: 'auth' } },
    { path: '/recover', name: 'recover', component: RecoverPanel, meta: { layout: 'auth' } },
    {
      path: '/portal',
      name: 'portal',
      component: PortalLayout,
      meta: { layout: 'portal' },
      children: [
        { path: '', name: 'portal-dashboard', component: PortalDashboard },
        { path: 'catalogo', name: 'portal-catalog', component: PortalCatalog },
        { path: 'pedidos', name: 'portal-orders', component: PortalOrders },
        { path: 'suscripciones', name: 'portal-subscriptions', component: PortalSubscriptions },
        { path: 'soporte', name: 'portal-support', component: PortalSupport },
        { path: 'ajustes', name: 'portal-settings', component: PortalSettings },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
  ],
})

router.afterEach((to) => {
  const titles = fisinorClientsConfig.documentTitles
  const pageTitle = titles.pages[String(to.name)]
  document.title = pageTitle ? `${titles.base} — ${pageTitle}` : titles.base
})
