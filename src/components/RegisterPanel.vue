<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fisinorClientsConfig } from '../config/fisinorClientsConfig'
import { registerClientAccount } from '../services/auth'

const config = fisinorClientsConfig
const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  paternalLastname: '',
  maternalLastname: '',
  phone: '',
  partnerType: '',
})

const submitting = ref(false)
const error = ref('')

async function onSubmit() {
  if (submitting.value) return

  if (form.password !== form.confirmPassword) {
    error.value = config.register.passwordMismatch
    return
  }

  submitting.value = true
  error.value = ''
  try {
    await registerClientAccount({
      username: form.username,
      email: form.email,
      password: form.password,
      firstName: form.firstName || undefined,
      lastNamePaternal: form.paternalLastname || undefined,
      lastNameMaternal: form.maternalLastname || undefined,
      phone: form.phone || undefined,
      partnerType: form.partnerType || undefined,
    })
    router.push({ name: 'portal-dashboard' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : config.register.registerErrorFallback
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="auth">
    <div class="auth__inner">
      <header class="auth__brand reveal">
        <img class="auth__logo" :src="config.brand.logo" :alt="config.brand.shortName" />
        <div class="auth__brand-text">
          <span class="auth__brand-name">{{ config.brand.shortName }}</span>
          <span class="auth__brand-division">{{ config.brand.portalLabel }}</span>
        </div>
      </header>

      <div class="auth__heading reveal" style="--reveal-delay: 70ms">
        <h1 class="auth__title">{{ config.register.title }}</h1>
        <p class="auth__subtitle">{{ config.register.subtitle }}</p>
      </div>

      <form class="auth__form reveal" style="--reveal-delay: 140ms" novalidate @submit.prevent="onSubmit">
        <section class="section" aria-label="Datos de acceso">
          <p class="section__label">{{ config.register.sections.access.label }}</p>
          <div class="section__fields">
            <div class="field">
              <label class="field__label" for="register-username">
                {{ config.register.fields.username.label }}
                <span class="field__required" :title="config.register.sections.access.requiredHint" aria-hidden="true">*</span>
              </label>
              <div class="field__control">
                <svg
                  class="field__icon"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="register-username"
                  v-model="form.username"
                  class="field__input"
                  type="text"
                  :placeholder="config.register.fields.username.placeholder"
                  autocomplete="username"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="field__label" for="register-email">
                {{ config.register.fields.email.label }}
                <span class="field__required" :title="config.register.sections.access.requiredHint" aria-hidden="true">*</span>
              </label>
              <div class="field__control">
                <svg
                  class="field__icon"
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  id="register-email"
                  v-model="form.email"
                  class="field__input"
                  type="email"
                  :placeholder="config.register.fields.email.placeholder"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="field__label" for="register-password">
                {{ config.register.fields.password.label }}
                <span class="field__required" :title="config.register.sections.access.requiredHint" aria-hidden="true">*</span>
              </label>
              <div class="field__control">
                <svg
                  class="field__icon"
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <input
                  id="register-password"
                  v-model="form.password"
                  class="field__input"
                  type="password"
                  :placeholder="config.register.fields.password.placeholder"
                  autocomplete="new-password"
                  minlength="8"
                  required
                />
              </div>
            </div>

            <div class="field">
              <label class="field__label" for="register-confirm">{{ config.register.fields.confirmPassword.label }}</label>
              <input
                id="register-confirm"
                v-model="form.confirmPassword"
                class="field__input"
                type="password"
                :placeholder="config.register.fields.confirmPassword.placeholder"
                autocomplete="new-password"
                required
              />
            </div>
          </div>
        </section>

        <div class="section__divider" role="presentation"></div>

        <section class="section" aria-label="Datos personales">
          <div class="section__header">
            <p class="section__label">{{ config.register.sections.personal.label }}</p>
            <span class="section__chip">{{ config.register.sections.personal.optionalLabel }}</span>
          </div>
          <div class="section__fields section__fields--grid">
            <div class="field">
              <label class="field__label" for="register-first-name">{{ config.register.fields.firstName.label }}</label>
              <input
                id="register-first-name"
                v-model="form.firstName"
                class="field__input"
                type="text"
                :placeholder="config.register.fields.firstName.placeholder"
                autocomplete="given-name"
              />
            </div>
            <div class="field">
              <label class="field__label" for="register-paternal">{{ config.register.fields.paternalLastname.label }}</label>
              <input
                id="register-paternal"
                v-model="form.paternalLastname"
                class="field__input"
                type="text"
                :placeholder="config.register.fields.paternalLastname.placeholder"
                autocomplete="off"
              />
            </div>
            <div class="field">
              <label class="field__label" for="register-maternal">{{ config.register.fields.maternalLastname.label }}</label>
              <input
                id="register-maternal"
                v-model="form.maternalLastname"
                class="field__input"
                type="text"
                :placeholder="config.register.fields.maternalLastname.placeholder"
                autocomplete="off"
              />
            </div>
            <div class="field">
              <label class="field__label" for="register-phone">{{ config.register.fields.phone.label }}</label>
              <input
                id="register-phone"
                v-model="form.phone"
                class="field__input"
                type="tel"
                :placeholder="config.register.fields.phone.placeholder"
                autocomplete="tel"
              />
            </div>

            <div class="field field--full">
              <label class="field__label" for="register-partner-type">{{ config.register.partnerType.label }}</label>
              <div class="field__control field__control--select">
                <select
                  id="register-partner-type"
                  v-model="form.partnerType"
                  class="field__input field__select"
                  :class="{ 'field__select--empty': form.partnerType === '' }"
                >
                  <option value="" disabled>{{ config.register.partnerType.placeholder }}</option>
                  <option
                    v-for="option in config.register.partnerType.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <svg
                  class="field__chevron"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <p v-if="error" class="auth__error" role="alert">{{ error }}</p>

        <button class="auth__submit" type="submit" :disabled="submitting">
          {{ submitting ? config.register.submittingLabel : config.register.submitLabel }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>

      <p class="auth__security reveal" style="--reveal-delay: 210ms">
        <svg
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
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
        {{ config.register.termsNote }}
      </p>

      <p class="auth__login reveal" style="--reveal-delay: 260ms">
        {{ config.register.loginPrompt }}
        <RouterLink class="auth__login-link" :to="config.register.loginLinkHref">
          {{ config.register.loginLinkLabel }}
        </RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
.auth__error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0 0 4px;
  padding: 9px 12px;
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 10px;
  background: #fee2e2;
  font-size: 12.5px;
  line-height: 1.5;
  color: #991b1b;
}

.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.75rem, 4vw, 3rem);
  background:
    radial-gradient(58rem 30rem at 112% 112%, rgba(23, 152, 181, 0.1), transparent 60%),
    radial-gradient(48rem 26rem at -12% -18%, rgba(247, 158, 42, 0.1), transparent 55%),
    var(--mist);
}

.auth__inner {
  width: min(29rem, 100%);
  display: flex;
  flex-direction: column;
}

/* Marca compacta */
.auth__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.8rem;
}

.auth__logo {
  width: 42px;
  height: 42px;
  padding: 6px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--blue-700), var(--blue-950));
  box-shadow: var(--shadow-soft);
}

.auth__brand-name {
  display: block;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--ink);
}

.auth__brand-division {
  display: block;
  margin-top: 2px;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

/* Encabezado */
.auth__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.3vw, 1.95rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.auth__subtitle {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* Formulario */
.auth__form {
  margin-top: 1.7rem;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.section {
  display: grid;
  gap: 0.85rem;
}

.section__header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.section__label {
  margin: 0;
  font-size: 0.71rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.section__chip {
  padding: 0.16rem 0.6rem;
  border: 1px solid rgba(247, 158, 42, 0.4);
  border-radius: 999px;
  background: var(--orange-soft);
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--orange-strong);
}

.section__divider {
  height: 1px;
  background: var(--line);
}

.section__fields {
  display: grid;
  gap: 1rem;
}

.section__fields--grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field--full {
  grid-column: 1 / -1;
}

/* Campos */
.field {
  display: grid;
  gap: 0.4rem;
}

.field__label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--ink);
}

.field__required {
  margin-left: 2px;
  color: var(--orange-strong);
  font-weight: 800;
}

.field__control {
  position: relative;
}

.field__icon {
  position: absolute;
  top: 50%;
  left: 0.95rem;
  translate: 0 -50%;
  width: 18px;
  height: 18px;
  color: var(--ink-faint);
  pointer-events: none;
  transition: color 0.2s;
}

.field__control:focus-within .field__icon {
  color: var(--teal);
}

.field__input {
  width: 100%;
  padding: 0.78rem 1rem 0.78rem 2.75rem;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--white);
  font-size: 0.92rem;
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.section__fields--grid .field__input {
  padding-left: 1rem;
}

.field__input::placeholder {
  color: var(--ink-faint);
}

.field__input:hover {
  border-color: #b7cedd;
}

.field__input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 4px rgba(23, 152, 181, 0.14);
}

/* Select */
.field__control--select {
  display: flex;
  align-items: center;
}

.field__select {
  appearance: none;
  padding-right: 2.75rem;
  cursor: pointer;
}

.field__select--empty {
  color: var(--ink-faint);
}

.field__chevron {
  position: absolute;
  right: 0.9rem;
  width: 16px;
  height: 16px;
  color: var(--ink-faint);
  pointer-events: none;
}

/* Botón principal */
.auth__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  margin-top: 0.2rem;
  padding: 0.95rem 1.25rem;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(120deg, var(--blue-600) 0%, var(--blue-700) 55%, var(--blue-900) 100%);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
  transition: transform 0.25s var(--ease-out), box-shadow 0.25s, filter 0.25s;
}

.auth__submit svg {
  width: 17px;
  height: 17px;
  transition: transform 0.25s var(--ease-out);
}

.auth__submit:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lift);
  filter: saturate(1.15);
}

.auth__submit:hover svg {
  transform: translateX(4px);
}

.auth__submit:active {
  transform: translateY(0);
}

/* Notas y pie */
.auth__security {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin: 1.4rem 0 0;
  font-size: 0.76rem;
  line-height: 1.55;
  color: var(--ink-faint);
}

.auth__security svg {
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  margin-top: 1px;
  color: var(--teal);
}

.auth__login {
  margin: 1.1rem 0 0;
  font-size: 0.86rem;
  text-align: center;
  color: var(--ink-soft);
}

.auth__login-link {
  margin-left: 0.35rem;
  font-weight: 800;
  color: var(--teal);
  transition: color 0.2s;
}

.auth__login-link:hover {
  color: var(--orange-strong);
}

@media (max-width: 560px) {
  .section__fields--grid {
    grid-template-columns: 1fr;
  }
}
</style>
