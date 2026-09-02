<script setup lang="ts">
import { reactive, ref } from 'vue'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import {
  accountGeneralFields,
  deliveryAddresses,
  licenseRecords,
  notificationPrefs,
} from '../../mocks/clientPortalData'

const config = fisinorClientsConfig

const activeTab = ref('general')

// --- Información General ---
const general = reactive({ ...accountGeneralFields })
const generalSaved = ref(false)

function saveGeneral() {
  generalSaved.value = true
  setTimeout(() => {
    generalSaved.value = false
  }, 3000)
}

// --- Direcciones ---
const addresses = ref(deliveryAddresses.map((address) => ({ ...address })))

function addAddress() {
  addresses.value.push({
    id: `a-new-${addresses.value.length + 1}`,
    label: '',
    detail: '',
    contact: '',
    primary: false,
  })
}

// --- Bioseguridad ---
const licenseRequested = ref(false)

// --- Notificaciones ---
const notifications = ref(notificationPrefs.map((pref) => ({ ...pref })))
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.settings.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.settings.subtitle }}</p>
      </div>
    </header>

    <div class="pf-tabs" role="tablist">
      <button
        v-for="tab in config.portal.settings.tabs"
        :key="tab.id"
        type="button"
        class="pf-tabs__tab"
        :class="{ 'pf-tabs__tab--active': activeTab === tab.id }"
        role="tab"
        :aria-selected="activeTab === tab.id"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Información General -->
    <article v-if="activeTab === 'general'" class="pf-card">
      <div class="pf-card__body">
        <div class="pf-form-grid">
          <div class="pf-field">
            <label class="pf-field__label" for="settings-business">{{ config.portal.settings.general.fields.businessName }}</label>
            <input id="settings-business" v-model="general.businessName" class="pf-field__input" type="text" />
          </div>
          <div class="pf-field">
            <label class="pf-field__label" for="settings-rfc">{{ config.portal.settings.general.fields.rfc }}</label>
            <input id="settings-rfc" v-model="general.rfc" class="pf-field__input" type="text" />
          </div>
          <div class="pf-field">
            <label class="pf-field__label" for="settings-representative">{{ config.portal.settings.general.fields.representative }}</label>
            <input id="settings-representative" v-model="general.representative" class="pf-field__input" type="text" />
          </div>
          <div class="pf-field">
            <label class="pf-field__label" for="settings-phone">{{ config.portal.settings.general.fields.emergencyPhone }}</label>
            <input id="settings-phone" v-model="general.emergencyPhone" class="pf-field__input" type="tel" />
          </div>
          <div class="pf-field">
            <label class="pf-field__label" for="settings-billing">{{ config.portal.settings.general.fields.billingEmail }}</label>
            <input id="settings-billing" v-model="general.billingEmail" class="pf-field__input" type="email" />
          </div>
          <div class="pf-field">
            <label class="pf-field__label" for="settings-notifications">{{ config.portal.settings.general.fields.notificationsEmail }}</label>
            <input id="settings-notifications" v-model="general.notificationsEmail" class="pf-field__input" type="email" />
          </div>
        </div>

        <div class="pf-modal__actions" style="justify-content: space-between; align-items: center">
          <p class="pf-field__hint">{{ config.portal.settings.general.helper }}</p>
          <div style="display: flex; align-items: center; gap: 0.8rem">
            <span v-if="generalSaved" class="pf-saved">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ config.portal.settings.general.savedNote }}
            </span>
            <button type="button" class="pf-btn pf-btn--primary" @click="saveGeneral">
              {{ config.portal.common.save }}
            </button>
          </div>
        </div>
      </div>
    </article>

    <!-- Direcciones de Entrega -->
    <article v-else-if="activeTab === 'addresses'" class="pf-card">
      <div class="pf-card__body">
        <div class="pf-grid-cards">
          <div v-for="address in addresses" :key="address.id" class="pf-address">
            <div class="pf-address__head">
              <span class="pf-address__label">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <input v-model="address.label" class="pf-field__input" type="text" style="padding: 0.25rem 0.5rem; font-weight: 700" aria-label="Etiqueta de la dirección" />
              </span>
              <span v-if="address.primary" class="pf-chip pf-chip--info">
                {{ config.portal.settings.addresses.primaryLabel }}
              </span>
            </div>
            <input v-model="address.detail" class="pf-field__input" type="text" aria-label="Detalle de la dirección" />
            <input v-model="address.contact" class="pf-field__input" type="text" aria-label="Contacto de la dirección" />
          </div>
        </div>

        <div class="pf-modal__actions" style="justify-content: space-between; align-items: center">
          <p class="pf-field__hint">{{ config.portal.settings.addresses.helper }}</p>
          <button type="button" class="pf-btn pf-btn--secondary" @click="addAddress">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {{ config.portal.settings.addresses.addLabel }}
          </button>
        </div>
      </div>
    </article>

    <!-- Bioseguridad y Licencias -->
    <article v-else-if="activeTab === 'biosecurity'" class="pf-card">
      <div class="pf-card__body">
        <div class="pf-stack">
          <div v-for="license in licenseRecords" :key="license.id" class="pf-license">
            <div>
              <p class="pf-license__name">{{ license.name }}</p>
              <span class="pf-license__level">{{ license.level }}</span>
              <p class="pf-license__expiry">{{ license.expiry }}</p>
            </div>
            <span class="pf-chip" :class="license.status === 'active' ? 'pf-chip--success' : 'pf-chip--warn'">
              {{ config.portal.settings.biosecurity.statusLabels[license.status] }}
            </span>
          </div>

          <div v-if="licenseRequested" class="pf-note" role="status">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ config.portal.settings.biosecurity.requestNote }}
          </div>
        </div>

        <div class="pf-modal__actions" style="justify-content: flex-end">
          <button type="button" class="pf-btn pf-btn--accent" @click="licenseRequested = true">
            {{ config.portal.settings.biosecurity.requestLabel }}
          </button>
        </div>
      </div>
    </article>

    <!-- Notificaciones -->
    <article v-else class="pf-card">
      <div class="pf-card__body">
        <p class="pf-field__hint" style="margin: 0 0 1rem">{{ config.portal.settings.notifications.helper }}</p>
        <div class="pf-stack">
          <div
            v-for="pref in notifications"
            :key="pref.id"
            class="pf-license"
            style="align-items: center"
          >
            <div>
              <p class="pf-license__name">{{ pref.label }}</p>
              <p class="pf-license__expiry">{{ pref.description }}</p>
            </div>
            <label class="pf-switch">
              <input v-model="pref.enabled" type="checkbox" />
              <span class="pf-switch__track" aria-hidden="true"></span>
              <span class="pf-switch__thumb" aria-hidden="true"></span>
            </label>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
