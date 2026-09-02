<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ShowcasePanel from './components/ShowcasePanel.vue'

const route = useRoute()
const isAuthLayout = computed(() => (route.meta.layout ?? 'auth') === 'auth')
</script>

<template>
  <div v-if="isAuthLayout" class="shell">
    <ShowcasePanel />
    <RouterView />
  </div>
  <RouterView v-else />
</template>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  min-height: 100dvh;
}

@media (max-width: 980px) {
  .shell {
    grid-template-columns: 1fr;
  }
}
</style>
