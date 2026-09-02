<script setup lang="ts">
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'

defineProps<{
  open: boolean
  title: string
  wide?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const config = fisinorClientsConfig

function onBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="pf-modal" @click="onBackdropClick">
      <div class="pf-modal__panel" :class="{ 'pf-modal__panel--wide': wide }" role="dialog" aria-modal="true">
        <header class="pf-modal__header">
          <h3 class="pf-modal__title">{{ title }}</h3>
          <button type="button" class="pf-modal__close" :aria-label="config.portal.common.close" @click="emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div class="pf-modal__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
