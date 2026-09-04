<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import { portalNotices } from '../../mocks/clientPortalData'
import { authAccount, displayNameOf, initialsOf, logoutClient } from '../../services/auth'

defineProps<{
  sidebarOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-sidebar'): void
}>()

const router = useRouter()
const config = fisinorClientsConfig

const menuOpen = ref(false)
const dismissedNotices = ref<string[]>([])

const activeNotices = computed(() =>
  portalNotices.filter((notice) => !dismissedNotices.value.includes(notice.id)),
)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.pf-profile')) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))

async function logout() {
  menuOpen.value = false
  await logoutClient()
  router.push({ name: 'login' })
}

const displayName = computed(() => displayNameOf(authAccount.value) || 'Suscriptor')
const displayInitials = computed(() => initialsOf(authAccount.value))

function dismissNotice(id: string) {
  dismissedNotices.value.push(id)
}
</script>

<template>
  <header class="pf-header">
    <div class="pf-header__row">
      <button
        type="button"
        class="pf-header__menu-btn"
        :aria-label="config.portal.header.menuLabel"
        @click="emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <RouterLink class="pf-header__brand" :to="{ name: 'portal-dashboard' }">
        <img class="pf-header__logo" :src="config.brand.logo" :alt="config.brand.shortName" />
        <span>
          <span class="pf-header__name">{{ config.brand.shortName }}</span>
          <span class="pf-header__version">{{ config.portal.brand.versionLabel }}</span>
        </span>
      </RouterLink>

      <p class="pf-header__station">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <span>{{ config.portal.header.stationLabel }} <strong>Módulo V - Costa de Hermosillo</strong></span>
      </p>

      <span class="pf-bio-badge">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        {{ config.portal.header.biosecurityBadge }}
      </span>

      <div class="pf-profile" :class="{ 'pf-profile--open': menuOpen }">
        <button type="button" class="pf-profile__button" @click="toggleMenu">
          <span class="pf-profile__avatar" aria-hidden="true">{{ displayInitials }}</span>
          <span class="pf-profile__meta">
            <span class="pf-profile__name">{{ displayName }}</span>
            <span class="pf-profile__id">{{ config.portal.header.clientIdLabel }}: {{ authAccount?.username }}</span>
          </span>
          <svg
            class="pf-profile__chevron"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div v-if="menuOpen" class="pf-profile__menu">
          <div class="pf-profile__menu-header">
            <span class="pf-profile__menu-name">{{ displayName }}</span>
            <span class="pf-profile__menu-business">{{ authAccount?.email }}</span>
            <span class="pf-profile__menu-id">{{ config.portal.header.clientIdLabel }}: {{ authAccount?.username }}</span>
          </div>
          <RouterLink
            class="pf-profile__menu-item"
            :to="{ name: 'portal-settings' }"
            @click="menuOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ config.portal.header.accountLabel }}
          </RouterLink>
          <button type="button" class="pf-profile__menu-item pf-profile__menu-item--danger" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {{ config.portal.header.logoutLabel }}
          </button>
        </div>
      </div>
    </div>

    <div v-for="notice in activeNotices" :key="notice.id" class="pf-banner">
      <div class="pf-banner__inner">
        <svg
          class="pf-banner__icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.7"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09a48.637 48.637 0 014.297-.307c1.06-.034 2.077-.224 3.02-.616l1.003-.417a.75.75 0 011.04.62 60.86 60.86 0 010 6.85.75.75 0 01-1.04.62l-1.003-.417c-.943-.392-1.96-.582-3.02-.616a48.637 48.637 0 00-4.297-.307zm0 0v4.86c0 .9-.673 1.675-1.564 1.786a48.922 48.922 0 01-1.692.18 1.875 1.875 0 01-2.069-1.866v-4.96"
          />
        </svg>
        <p class="pf-banner__text">{{ notice.text }}</p>
        <button
          type="button"
          class="pf-banner__close"
          :aria-label="config.portal.banner.dismissLabel"
          @click="dismissNotice(notice.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
