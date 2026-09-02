<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import { portalKpis, portalOrders, catalogProducts, sdsDocument } from '../../mocks/clientPortalData'
import { formatMxn } from '../../utils/format'
import PortalModal from '../../components/portal/PortalModal.vue'

const router = useRouter()
const config = fisinorClientsConfig

const recentOrders = computed(() => portalOrders.slice(0, 3))
const sdsProduct = catalogProducts[0]

const statusChipClass: Record<string, string> = {
  processing: 'pf-chip--neutral',
  transit: 'pf-chip--info',
  held: 'pf-chip--danger',
  delivered: 'pf-chip--success',
}

const kpiIconPaths: Record<string, string> = {
  droplet:
    'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
  layers:
    'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
  truck:
    'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12',
  activity: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
}

const quickActionIcons: Record<string, string> = {
  restock:
    'M12 4.5v15m7.5-7.5h-15',
  sds: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  deviation:
    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
}

const sdsOpen = ref(false)

function onQuickAction(id: string, target: string) {
  if (target === 'catalog') {
    router.push({ name: 'portal-catalog' })
    return
  }
  if (target === 'support') {
    router.push({ name: 'portal-support' })
    return
  }
  if (id === 'sds') {
    sdsOpen.value = true
  }
}
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.dashboard.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.dashboard.subtitle }}</p>
      </div>
    </header>

    <div class="pf-kpis">
      <article v-for="kpi in portalKpis" :key="kpi.id" class="pf-card pf-kpi">
        <div class="pf-kpi__top">
          <span class="pf-kpi__label">{{ kpi.label }}</span>
          <span class="pf-kpi__icon" :class="kpi.accent === 'orange' ? 'pf-kpi__icon--orange' : kpi.accent === 'green' ? 'pf-kpi__icon--green' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" :d="kpiIconPaths[kpi.icon]" />
            </svg>
          </span>
        </div>
        <p class="pf-kpi__value">{{ kpi.value }}</p>
        <p class="pf-kpi__meta">{{ kpi.meta }}</p>
      </article>
    </div>

    <div class="pf-grid-2">
      <article class="pf-card">
        <header class="pf-card__header">
          <div>
            <h2 class="pf-card__title">{{ config.portal.dashboard.recentTitle }}</h2>
            <p class="pf-card__subtitle">{{ config.portal.dashboard.recentSubtitle }}</p>
          </div>
          <RouterLink class="pf-card__link" :to="{ name: 'portal-orders' }">
            {{ config.portal.dashboard.viewAllOrders }}
          </RouterLink>
        </header>
        <div class="pf-table-wrap">
          <table class="pf-table">
            <thead>
              <tr>
                <th>{{ config.portal.dashboard.recentColumns.code }}</th>
                <th>{{ config.portal.dashboard.recentColumns.date }}</th>
                <th>{{ config.portal.dashboard.recentColumns.destination }}</th>
                <th>{{ config.portal.dashboard.recentColumns.total }}</th>
                <th>{{ config.portal.dashboard.recentColumns.status }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id">
                <td class="pf-table__code">{{ order.code }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.destination }}</td>
                <td class="pf-table__total">{{ formatMxn(order.total) }} {{ order.currency }}</td>
                <td>
                  <span class="pf-chip" :class="statusChipClass[order.status]">
                    {{ config.portal.orders.statusLabels[order.status] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="pf-card">
        <header class="pf-card__header">
          <h2 class="pf-card__title">{{ config.portal.dashboard.quickActionsTitle }}</h2>
        </header>
        <div class="pf-card__body">
          <div class="pf-quick">
            <button
              v-for="action in config.portal.dashboard.quickActions"
              :key="action.id"
              type="button"
              class="pf-quick__btn"
              @click="onQuickAction(action.id, action.target)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" :d="quickActionIcons[action.id]" />
              </svg>
              {{ action.label }}
            </button>
          </div>
        </div>
      </article>
    </div>

    <PortalModal :open="sdsOpen" :title="config.portal.dashboard.sdsModalTitle" @close="sdsOpen = false">
      <div class="pf-modal__meta">
        <div class="pf-modal__meta-item">
          {{ config.portal.orders.columns.code }}
          <strong>{{ sdsProduct.sku }}</strong>
        </div>
        <div class="pf-modal__meta-item">
          {{ config.portal.catalog.concentrationLabel }}
          <strong>{{ sdsProduct.concentration }}</strong>
        </div>
        <div class="pf-modal__meta-item">
          {{ config.portal.common.levelLabel }}
          <strong>{{ config.portal.catalog.levelLabels[sdsProduct.level] }}</strong>
        </div>
      </div>

      <div class="pf-stack">
        <article v-for="section in sdsDocument.sections" :key="section.title" class="pf-card">
          <div class="pf-card__body">
            <h3 class="pf-card__title">{{ section.title }}</h3>
            <p class="pf-page__subtitle">{{ section.body }}</p>
          </div>
        </article>
      </div>

      <div class="pf-modal__actions">
        <button type="button" class="pf-btn pf-btn--secondary" @click="sdsOpen = false">
          {{ config.portal.common.close }}
        </button>
        <button type="button" class="pf-btn pf-btn--primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {{ config.portal.common.download }}
        </button>
      </div>
    </PortalModal>
  </section>
</template>
