<script setup lang="ts">
import { ref } from 'vue'
import PortalSidebar from '../../components/portal/PortalSidebar.vue'
import PortalHeader from '../../components/portal/PortalHeader.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="pf-shell" :class="{ 'pf-shell--sidebar-open': sidebarOpen }">
    <PortalSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
    <div class="pf-sidebar-overlay" @click="sidebarOpen = false"></div>

    <div class="pf-main">
      <PortalHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <div class="pf-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>
