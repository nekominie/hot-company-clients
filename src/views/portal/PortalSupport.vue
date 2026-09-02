<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import {
  supportFaqs,
  chatWelcome,
  chatQuickReplies,
  portalClient,
} from '../../mocks/clientPortalData'
import { generateFolio } from '../../utils/format'

const config = fisinorClientsConfig

// --- Ticket de incidencia ---
const ticketType = ref('')
const ticketOrderRef = ref('')
const ticketSeverity = ref('medium')
const ticketDescription = ref('')
const ticketContact = ref(portalClient.email)
const ticketSubmitted = ref(false)
const ticketFolio = ref('')

function onTicketSubmit() {
  ticketFolio.value = generateFolio('#TCK')
  ticketSubmitted.value = true
}

// --- FAQ ---
const openFaqId = ref<string | null>(supportFaqs[0]?.id ?? null)

function toggleFaq(faqId: string) {
  openFaqId.value = openFaqId.value === faqId ? null : faqId
}

// --- Chatbot MIRA ---
interface ChatMessage {
  id: number
  from: 'bot' | 'user'
  author: string
  text: string
}

let messageId = 0
const messages = ref<ChatMessage[]>([
  { id: ++messageId, from: 'bot', author: config.portal.support.chatAuthorBot, text: chatWelcome.text },
])
const chatInput = ref('')
const messagesEl = ref<HTMLElement | null>(null)

async function appendBotMessage(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 450))
  messages.value.push({
    id: ++messageId,
    from: 'bot',
    author: config.portal.support.chatAuthorBot,
    text,
  })
  await scrollChat()
}

async function scrollChat() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

async function sendChat(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return
  messages.value.push({
    id: ++messageId,
    from: 'user',
    author: config.portal.support.chatAuthorUser,
    text: trimmed,
  })
  chatInput.value = ''
  await scrollChat()

  const quickReply = chatQuickReplies.find((reply) => reply.label === trimmed)
  if (quickReply) {
    await appendBotMessage(quickReply.response)
    return
  }
  await appendBotMessage(chatQuickReplies[3].response)
}

async function sendQuickReply(reply: { label: string; response: string }) {
  messages.value.push({
    id: ++messageId,
    from: 'user',
    author: config.portal.support.chatAuthorUser,
    text: reply.label,
  })
  await scrollChat()
  await appendBotMessage(reply.response)
}

// Tipos de incidencia definidos por la operación (contenido simulado)
const incidentTypes: { id: string; label: string }[] = [
  { id: 'dosage', label: 'Falla en Dosificación' },
  { id: 'crop', label: 'Anomalía en Cultivo Tratado' },
  { id: 'billing', label: 'Aclaración de Facturación' },
]
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.support.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.support.subtitle }}</p>
      </div>
    </header>

    <div class="pf-support-grid">
      <!-- Ticket de incidencia -->
      <article class="pf-card">
        <header class="pf-card__header">
          <div>
            <h2 class="pf-card__title">{{ config.portal.support.ticketTitle }}</h2>
            <p class="pf-card__subtitle">{{ config.portal.support.ticketSubtitle }}</p>
          </div>
        </header>
        <div class="pf-card__body">
          <form v-if="!ticketSubmitted" class="pf-stack" @submit.prevent="onTicketSubmit">
            <div class="pf-form-grid">
              <div class="pf-field">
                <label class="pf-field__label" for="ticket-type">{{ config.portal.support.fields.type }}</label>
                <div class="pf-field__control">
                  <select id="ticket-type" v-model="ticketType" class="pf-field__select" required>
                    <option value="" disabled>{{ config.portal.support.fields.typePlaceholder }}</option>
                    <option v-for="type in incidentTypes" :key="type.id" :value="type.id">{{ type.label }}</option>
                  </select>
                  <svg class="pf-field__chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div class="pf-field">
                <label class="pf-field__label" for="ticket-severity">{{ config.portal.support.fields.severity }}</label>
                <div class="pf-field__control">
                  <select id="ticket-severity" v-model="ticketSeverity" class="pf-field__select">
                    <option v-for="severity in config.portal.support.severities" :key="severity.id" :value="severity.id">
                      {{ severity.label }}
                    </option>
                  </select>
                  <svg class="pf-field__chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div class="pf-field pf-field--full">
                <label class="pf-field__label" for="ticket-order">{{ config.portal.support.fields.orderRef }}</label>
                <input
                  id="ticket-order"
                  v-model="ticketOrderRef"
                  class="pf-field__input"
                  type="text"
                  :placeholder="config.portal.support.fields.orderRefPlaceholder"
                />
              </div>

              <div class="pf-field pf-field--full">
                <label class="pf-field__label" for="ticket-description">{{ config.portal.support.fields.description }}</label>
                <textarea
                  id="ticket-description"
                  v-model="ticketDescription"
                  class="pf-field__textarea"
                  :placeholder="config.portal.support.fields.descriptionPlaceholder"
                  required
                ></textarea>
              </div>

              <div class="pf-field pf-field--full">
                <label class="pf-field__label" for="ticket-contact">{{ config.portal.support.fields.contact }}</label>
                <input
                  id="ticket-contact"
                  v-model="ticketContact"
                  class="pf-field__input"
                  type="email"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <button type="submit" class="pf-btn pf-btn--primary" style="justify-self: start">
              {{ config.portal.support.fields.submit }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>

          <div v-else class="pf-note" role="status">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ config.portal.support.ticketSuccess.replace('{folio}', ticketFolio) }}
          </div>
        </div>
      </article>

      <!-- Buzón Directo / Chatbot -->
      <article class="pf-card">
        <header class="pf-card__header">
          <div>
            <h2 class="pf-card__title">{{ config.portal.support.chatTitle }}</h2>
            <p class="pf-card__subtitle">{{ config.portal.support.chatSubtitle }}</p>
          </div>
        </header>
        <div class="pf-card__body">
          <div ref="messagesEl" class="pf-chat__messages">
            <div
              v-for="message in messages"
              :key="message.id"
              class="pf-chat__bubble"
              :class="message.from === 'bot' ? 'pf-chat__bubble--bot' : 'pf-chat__bubble--user'"
            >
              <span class="pf-chat__author">{{ message.author }}</span>
              {{ message.text }}
            </div>
          </div>

          <p class="pf-chat__quick-label">{{ config.portal.support.chatQuickLabel }}</p>
          <div class="pf-chat__quick">
            <button
              v-for="reply in chatQuickReplies"
              :key="reply.id"
              type="button"
              class="pf-chat__quick-btn"
              @click="sendQuickReply(reply)"
            >
              {{ reply.label }}
            </button>
          </div>

          <form class="pf-chat__input-row" @submit.prevent="sendChat(chatInput)">
            <div class="pf-field__control pf-field__control--icon">
              <input
                v-model="chatInput"
                class="pf-field__input"
                type="text"
                :placeholder="config.portal.support.chatPlaceholder"
                :aria-label="config.portal.support.chatPlaceholder"
              />
            </div>
            <button type="submit" class="pf-chat__send" :aria-label="config.portal.support.chatSendLabel">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>

          <p class="pf-chat__disclaimer">{{ config.portal.support.chatDisclaimer }}</p>
        </div>
      </article>
    </div>

    <!-- FAQ -->
    <article class="pf-card" style="margin-top: 1rem">
      <header class="pf-card__header">
        <h2 class="pf-card__title">{{ config.portal.support.faqTitle }}</h2>
      </header>
      <div class="pf-card__body">
        <div class="pf-faq">
          <div
            v-for="faq in supportFaqs"
            :key="faq.id"
            class="pf-faq__item"
            :class="{ 'pf-faq__item--open': openFaqId === faq.id }"
          >
            <button type="button" class="pf-faq__question" @click="toggleFaq(faq.id)">
              {{ faq.question }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <p v-show="openFaqId === faq.id" class="pf-faq__answer">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
