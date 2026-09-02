<script setup lang="ts">
import { computed, ref } from 'vue'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import { portalOrders, type PortalOrder } from '../../mocks/clientPortalData'
import { formatMxn } from '../../utils/format'
import PortalModal from '../../components/portal/PortalModal.vue'

const config = fisinorClientsConfig

const trackedOrder = ref<PortalOrder | null>(null)

const statusChipClass: Record<string, string> = {
  processing: 'pf-chip--neutral',
  transit: 'pf-chip--info',
  held: 'pf-chip--danger',
  delivered: 'pf-chip--success',
}

const isHeld = computed(() => trackedOrder.value?.status === 'held')
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.orders.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.orders.subtitle }}</p>
      </div>
    </header>

    <article class="pf-card">
      <div class="pf-table-wrap">
        <table class="pf-table">
          <thead>
            <tr>
              <th>{{ config.portal.orders.columns.code }}</th>
              <th>{{ config.portal.orders.columns.date }}</th>
              <th>{{ config.portal.orders.columns.destination }}</th>
              <th>{{ config.portal.orders.columns.total }}</th>
              <th>{{ config.portal.orders.columns.status }}</th>
              <th>{{ config.portal.orders.columns.tracking }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in portalOrders"
              :key="order.id"
              class="pf-table__row--clickable"
              @click="trackedOrder = order"
            >
              <td class="pf-table__code">{{ order.code }}</td>
              <td>{{ order.date }}</td>
              <td>{{ order.destination }}</td>
              <td class="pf-table__total">{{ formatMxn(order.total) }} {{ order.currency }}</td>
              <td>
                <span class="pf-chip" :class="statusChipClass[order.status]">
                  {{ config.portal.orders.statusLabels[order.status] }}
                </span>
              </td>
              <td>
                <button type="button" class="pf-btn pf-btn--sm pf-btn--secondary" @click.stop="trackedOrder = order">
                  {{ config.portal.common.viewTracking }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <PortalModal
      :open="trackedOrder !== null"
      :title="`${config.portal.orders.trackingTitle} ${trackedOrder?.code ?? ''}`"
      @close="trackedOrder = null"
    >
      <template v-if="trackedOrder">
        <div class="pf-modal__meta">
          <div class="pf-modal__meta-item">
            {{ config.portal.orders.columns.date }}
            <strong>{{ trackedOrder.date }}</strong>
          </div>
          <div class="pf-modal__meta-item">
            {{ config.portal.orders.destinationLabel }}
            <strong>{{ trackedOrder.destination }}</strong>
          </div>
          <div class="pf-modal__meta-item">
            {{ config.portal.orders.guideLabel }}
            <strong>{{ trackedOrder.guide }}</strong>
          </div>
          <div class="pf-modal__meta-item">
            {{ config.portal.orders.columns.total }}
            <strong>{{ formatMxn(trackedOrder.total) }} {{ trackedOrder.currency }}</strong>
          </div>
        </div>

        <div v-if="isHeld" class="pf-held-notice" role="note">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <div>
            <p class="pf-held-notice-title">{{ config.portal.orders.heldNoticeTitle }}</p>
            <p class="pf-held-notice-text">{{ config.portal.orders.heldNoticeText }}</p>
          </div>
        </div>

        <ol class="pf-timeline">
          <li
            v-for="step in trackedOrder.timeline"
            :key="step.label"
            class="pf-timeline__step"
            :class="`pf-timeline__step--${step.state}`"
          >
            <span class="pf-timeline__dot" aria-hidden="true">
              <svg v-if="step.state === 'done'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <div>
              <p class="pf-timeline__label">{{ step.label }}</p>
              <p class="pf-timeline__timestamp">{{ step.timestamp }}</p>
            </div>
          </li>
        </ol>

        <div class="pf-modal__actions">
          <button type="button" class="pf-btn pf-btn--secondary" @click="trackedOrder = null">
            {{ config.portal.common.close }}
          </button>
        </div>
      </template>
    </PortalModal>
  </section>
</template>
