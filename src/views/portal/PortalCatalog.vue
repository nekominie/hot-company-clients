<script setup lang="ts">
import { computed, ref } from 'vue'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import { catalogCategories, catalogProducts, sdsDocument, type CatalogProduct } from '../../mocks/clientPortalData'
import { formatMxn } from '../../utils/format'
import PortalModal from '../../components/portal/PortalModal.vue'

const config = fisinorClientsConfig

const activeFilter = ref<string>('all')
const addedProductId = ref<string | null>(null)
const sdsProduct = ref<CatalogProduct | null>(null)

const filteredProducts = computed(() =>
  activeFilter.value === 'all'
    ? catalogProducts
    : catalogProducts.filter((product) => product.categoryId === activeFilter.value),
)

const stockChipClass: Record<string, string> = {
  available: 'pf-chip--success',
  limited: 'pf-chip--warn',
  restricted: 'pf-chip--dark',
}

const levelChipClass: Record<number, string> = {
  1: 'pf-chip--neutral',
  2: 'pf-chip--info',
  3: 'pf-chip--warn',
}

let addedTimer: ReturnType<typeof setTimeout> | undefined

function addToOrder(productId: string) {
  addedProductId.value = productId
  clearTimeout(addedTimer)
  addedTimer = setTimeout(() => {
    addedProductId.value = null
  }, 1800)
}

function priceLabel(product: CatalogProduct): string {
  return product.price === null ? 'Bajo cotización' : formatMxn(product.price)
}
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.catalog.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.catalog.subtitle }}</p>
      </div>
    </header>

    <div class="pf-filters" role="group" aria-label="Filtros por categoría">
      <button
        type="button"
        class="pf-filter"
        :class="{ 'pf-filter--active': activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        {{ config.portal.catalog.filterAllLabel }}
      </button>
      <button
        v-for="category in catalogCategories"
        :key="category.id"
        type="button"
        class="pf-filter"
        :class="{ 'pf-filter--active': activeFilter === category.id }"
        @click="activeFilter = category.id"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="pf-grid-cards">
      <article v-for="product in filteredProducts" :key="product.id" class="pf-card pf-product">
        <div class="pf-product__body">
          <div class="pf-product__tags">
            <span class="pf-product__sku">{{ product.sku }}</span>
            <span class="pf-chip" :class="levelChipClass[product.level]">
              {{ config.portal.catalog.levelLabels[product.level] }}
            </span>
            <span class="pf-chip" :class="stockChipClass[product.stock]">
              {{ config.portal.catalog.stockLabels[product.stock] }}
            </span>
          </div>

          <h2 class="pf-product__name">{{ product.name }}</h2>
          <p class="pf-product__desc">{{ product.description }}</p>

          <dl class="pf-product__specs">
            <div class="pf-product__spec">
              <dt>{{ config.portal.catalog.concentrationLabel }}</dt>
              <dd>{{ product.concentration }}</dd>
            </div>
            <div class="pf-product__spec">
              <dt>{{ config.portal.catalog.doseLabel }}</dt>
              <dd>{{ product.dose }}</dd>
            </div>
          </dl>
        </div>

        <div v-if="product.level === 3" class="pf-level-warning" role="note">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span>{{ config.portal.catalog.levelWarning }}</span>
        </div>

        <footer class="pf-product__footer">
          <p class="pf-product__price">
            {{ priceLabel(product) }}
            <span class="pf-product__unit">/ {{ product.unit }}</span>
          </p>
          <div class="pf-product__actions">
            <button
              type="button"
              class="pf-btn pf-btn--sm pf-btn--secondary"
              @click="sdsProduct = product"
            >
              {{ config.portal.catalog.sheetLabel }}
            </button>
            <button
              type="button"
              class="pf-btn pf-btn--sm"
              :class="addedProductId === product.id ? 'pf-btn--accent' : 'pf-btn--primary'"
              @click="addToOrder(product.id)"
            >
              {{ addedProductId === product.id ? config.portal.common.addedToOrder : config.portal.common.addToOrder }}
            </button>
          </div>
        </footer>
      </article>
    </div>

    <PortalModal
      :open="sdsProduct !== null"
      :title="`${config.portal.catalog.sheetLabel}${sdsProduct ? ' — ' + sdsProduct.name : ''}`"
      wide
      @close="sdsProduct = null"
    >
      <template v-if="sdsProduct">
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
          <button type="button" class="pf-btn pf-btn--secondary" @click="sdsProduct = null">
            {{ config.portal.common.close }}
          </button>
          <button type="button" class="pf-btn pf-btn--primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {{ config.portal.common.download }}
          </button>
        </div>
      </template>
    </PortalModal>
  </section>
</template>
