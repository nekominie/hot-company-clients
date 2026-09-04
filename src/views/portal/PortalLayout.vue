<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PortalSidebar from '../../components/portal/PortalSidebar.vue'
import PortalHeader from '../../components/portal/PortalHeader.vue'
import { fetchCurrentAccount } from '../../services/auth'

const router = useRouter()
const sidebarOpen = ref(false)
const sessionReady = ref(false)

onMounted(async () => {
  const account = await fetchCurrentAccount()
  if (!account) {
    router.push({ name: 'login' })
    return
  }
  sessionReady.value = true
})
</script>

<template>
  <div v-if="sessionReady" class="pf-shell" :class="{ 'pf-shell--sidebar-open': sidebarOpen }">
    <PortalSidebar :open="sidebarOpen" @navigate="sidebarOpen = false" />
    <div class="pf-sidebar-overlay" @click="sidebarOpen = false"></div>

    <div class="pf-main">
      <PortalHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <div class="pf-content">
        <RouterView />
      </div>
    </div>
  </div>
  <div v-else class="pf-session-loading">
    <span class="pf-session-loading__spinner" aria-hidden="true"></span>
    <p>Verificando sesión...</p>
  </div>
</template>

<style scoped>
.pf-session-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  height: 100dvh;
  color: var(--ink-soft);
  font-size: 13px;
  background: var(--mist);
}

.pf-session-loading__spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba(2, 132, 199, 0.2);
  border-top-color: var(--teal);
  border-radius: 50%;
  animation: pf-spin 0.9s linear infinite;
}

@keyframes pf-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
