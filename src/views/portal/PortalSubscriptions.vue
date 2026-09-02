<script setup lang="ts">
import { computed, ref } from 'vue'
import { fisinorClientsConfig } from '../../config/fisinorClientsConfig'
import {
  portalSubscriptions,
  subscriptionPlans,
  distributionFrequencies,
  environmentalClauses,
} from '../../mocks/clientPortalData'
import { formatMxn, generateFolio } from '../../utils/format'
import PortalModal from '../../components/portal/PortalModal.vue'

const config = fisinorClientsConfig

const wizardOpen = ref(false)
const step = ref(0)
const selectedPlanId = ref<string | null>(null)
const selectedFrequencyId = ref<string | null>(null)
const acceptedClauses = ref<string[]>([])
const confirmationFolio = ref('')

const wizard = computed(() => config.portal.subscriptions.wizard)

const selectedPlan = computed(() => subscriptionPlans.find((plan) => plan.id === selectedPlanId.value) ?? null)
const selectedFrequency = computed(
  () => distributionFrequencies.find((frequency) => frequency.id === selectedFrequencyId.value) ?? null,
)

const allClausesAccepted = computed(
  () => acceptedClauses.value.length === environmentalClauses.length,
)

const canContinue = computed(() => {
  if (step.value === 0) return selectedPlanId.value !== null
  if (step.value === 1) return selectedFrequencyId.value !== null
  if (step.value === 2) return allClausesAccepted.value
  return false
})

function openWizard() {
  step.value = 0
  selectedPlanId.value = null
  selectedFrequencyId.value = null
  acceptedClauses.value = []
  confirmationFolio.value = ''
  wizardOpen.value = true
}

function nextStep() {
  if (!canContinue.value) return
  if (step.value === 2) {
    confirmationFolio.value = generateFolio('#SUB')
  }
  step.value += 1
}

function previousStep() {
  if (step.value > 0) {
    step.value -= 1
  }
}

function toggleClause(clauseId: string) {
  if (acceptedClauses.value.includes(clauseId)) {
    acceptedClauses.value = acceptedClauses.value.filter((id) => id !== clauseId)
    return
  }
  acceptedClauses.value.push(clauseId)
}
</script>

<template>
  <section>
    <header class="pf-page__header">
      <div>
        <h1 class="pf-page__title">{{ config.portal.subscriptions.title }}</h1>
        <p class="pf-page__subtitle">{{ config.portal.subscriptions.subtitle }}</p>
      </div>
      <button type="button" class="pf-btn pf-btn--accent" @click="openWizard">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {{ config.portal.subscriptions.newButton }}
      </button>
    </header>

    <div class="pf-grid-cards">
      <article v-for="subscription in portalSubscriptions" :key="subscription.id" class="pf-card">
        <div class="pf-card__body">
          <div class="pf-sub__head">
            <div>
              <h2 class="pf-card__title">{{ subscription.name }}</h2>
              <span class="pf-sub__code">{{ subscription.code }}</span>
            </div>
            <span class="pf-chip pf-chip--success">
              {{ config.portal.subscriptions.statusLabels.active }}
            </span>
          </div>

          <p class="pf-sub__desc">{{ subscription.description }}</p>

          <p class="pf-sub__renewal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            {{ subscription.renewalLabel }}
          </p>

          <div class="pf-sub__features">
            <span class="pf-card__subtitle">{{ config.portal.subscriptions.featuresLabel }}</span>
            <span v-for="feature in subscription.features" :key="feature" class="pf-sub__feature">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              {{ feature }}
            </span>
          </div>
        </div>
        <footer class="pf-product__footer">
          <p class="pf-sub__price">
            {{ formatMxn(subscription.price) }}
            <span>/ {{ subscription.period }}</span>
          </p>
          <span class="pf-chip pf-chip--info">{{ subscription.code }}</span>
        </footer>
      </article>
    </div>

    <PortalModal :open="wizardOpen" :title="wizard.title" wide @close="wizardOpen = false">
      <div class="pf-steps">
        <span
          v-for="(stepLabel, index) in wizard.steps"
          :key="stepLabel"
          class="pf-steps__item"
          :class="{
            'pf-steps__item--current': index === step,
            'pf-steps__item--done': index < step,
          }"
        >
          {{ index + 1 }}. {{ stepLabel }}
        </span>
      </div>

      <!-- Paso 1: Plan -->
      <div v-if="step === 0">
        <p class="pf-field__label">{{ wizard.planLabel }}</p>
        <div class="pf-options" style="margin-top: 0.6rem">
          <button
            v-for="plan in subscriptionPlans"
            :key="plan.id"
            type="button"
            class="pf-option"
            :class="{ 'pf-option--selected': selectedPlanId === plan.id }"
            @click="selectedPlanId = plan.id"
          >
            <span class="pf-option__radio" aria-hidden="true"></span>
            <span>
              <span class="pf-option__name">{{ plan.name }}</span>
              <span class="pf-option__desc">{{ plan.description }}</span>
            </span>
          </button>
        </div>
      </div>

      <!-- Paso 2: Frecuencia -->
      <div v-else-if="step === 1">
        <p class="pf-field__label">{{ wizard.frequencyLabel }}</p>
        <div class="pf-options" style="margin-top: 0.6rem">
          <button
            v-for="frequency in distributionFrequencies"
            :key="frequency.id"
            type="button"
            class="pf-option"
            :class="{ 'pf-option--selected': selectedFrequencyId === frequency.id }"
            @click="selectedFrequencyId = frequency.id"
          >
            <span class="pf-option__radio" aria-hidden="true"></span>
            <span class="pf-option__name">{{ frequency.label }}</span>
          </button>
        </div>
      </div>

      <!-- Paso 3: Cláusulas -->
      <div v-else-if="step === 2">
        <p class="pf-field__label">{{ wizard.clausesLabel }}</p>
        <p class="pf-field__hint" style="margin: 0.25rem 0 0.8rem">{{ wizard.clausesHint }}</p>
        <div class="pf-options">
          <article
            v-for="clause in environmentalClauses"
            :key="clause.id"
            class="pf-clause"
            :class="{ 'pf-clause--accepted': acceptedClauses.includes(clause.id) }"
          >
            <div>
              <p class="pf-clause__text">{{ clause.text }}</p>
              <label class="pf-clause__accept">
                <input
                  type="checkbox"
                  :checked="acceptedClauses.includes(clause.id)"
                  @change="toggleClause(clause.id)"
                />
                {{ wizard.acceptLabel }}
              </label>
            </div>
          </article>
        </div>
      </div>

      <!-- Paso 4: Confirmación -->
      <div v-else class="pf-confirm">
        <span class="pf-confirm__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <h2 class="pf-confirm__title">{{ wizard.confirmationTitle }}</h2>
        <p class="pf-confirm__text">
          {{ wizard.confirmationText.replace('{folio}', confirmationFolio) }}
        </p>
        <span class="pf-confirm__folio">{{ confirmationFolio }}</span>

        <div class="pf-summary" style="margin-top: 1.3rem; text-align: left">
          <div class="pf-summary__row">
            <span>{{ wizard.summaryPlan }}</span>
            <strong>{{ selectedPlan?.name }}</strong>
          </div>
          <div class="pf-summary__row">
            <span>{{ wizard.summaryFrequency }}</span>
            <strong>{{ selectedFrequency?.label }}</strong>
          </div>
        </div>
      </div>

      <div v-if="step < 3" class="pf-modal__actions">
        <button
          type="button"
          class="pf-btn pf-btn--secondary"
          :disabled="step === 0"
          @click="previousStep"
        >
          {{ config.portal.common.back }}
        </button>
        <button type="button" class="pf-btn pf-btn--primary" :disabled="!canContinue" @click="nextStep">
          {{ step === 2 ? wizard.confirmButton : config.portal.common.continueLabel }}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      <div v-else class="pf-modal__actions">
        <button type="button" class="pf-btn pf-btn--primary" @click="wizardOpen = false">
          {{ wizard.closeButton }}
        </button>
      </div>
    </PortalModal>
  </section>
</template>
