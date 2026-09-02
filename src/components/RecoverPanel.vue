<script setup lang="ts">
import { ref } from 'vue'
import { fisinorClientsConfig } from '../config/fisinorClientsConfig'

const config = fisinorClientsConfig

const email = ref('')
const sent = ref(false)

function onSubmit() {
  // Solo visual; el envío del correo se conectará con la API más adelante.
  sent.value = true
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

      <div class="auth__badge reveal" style="--reveal-delay: 60ms" aria-hidden="true">
        <svg
          v-if="!sent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <div class="auth__heading reveal" style="--reveal-delay: 120ms">
        <h1 class="auth__title">{{ sent ? config.recover.successTitle : config.recover.title }}</h1>
        <p v-if="!sent" class="auth__subtitle">{{ config.recover.subtitle }}</p>
      </div>

      <form v-if="!sent" class="auth__form reveal" style="--reveal-delay: 180ms" @submit.prevent="onSubmit">
        <div class="field">
          <label class="field__label" for="recover-email">{{ config.recover.emailLabel }}</label>
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
              id="recover-email"
              v-model="email"
              class="field__input"
              type="email"
              :placeholder="config.recover.emailPlaceholder"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <button class="auth__submit" type="submit">
          {{ config.recover.submitLabel }}
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

      <div v-else class="success reveal" style="--reveal-delay: 180ms" role="status">
        <svg
          class="success__icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="success__message">{{ config.recover.successMessage }}</p>
      </div>

      <p class="auth__security reveal" style="--reveal-delay: 240ms">
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
        {{ config.recover.securityNote }}
      </p>

      <p class="auth__login reveal" style="--reveal-delay: 280ms">
        {{ config.recover.loginPrompt }}
        <RouterLink class="auth__login-link" :to="config.recover.loginLinkHref">
          {{ config.recover.loginLinkLabel }}
        </RouterLink>
      </p>
    </div>
  </main>
</template>

<style scoped>
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
  width: min(26rem, 100%);
  display: flex;
  flex-direction: column;
}

/* Marca compacta */
.auth__brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 2rem;
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

/* Insignia ilustrativa */
.auth__badge {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 1.3rem;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--blue-600), var(--blue-950));
  color: var(--white);
  box-shadow: var(--shadow-soft);
}

.auth__badge svg {
  width: 26px;
  height: 26px;
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
  margin: 0.55rem 0 0;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--ink-soft);
}

/* Formulario */
.auth__form {
  margin-top: 1.7rem;
  display: grid;
  gap: 1.15rem;
}

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
  padding: 0.82rem 1rem 0.82rem 2.75rem;
  border: 1.5px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--white);
  font-size: 0.92rem;
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
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

/* Estado de confirmación */
.success {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  margin-top: 1.7rem;
  padding: 1.05rem 1.2rem;
  border: 1px solid rgba(23, 152, 181, 0.28);
  border-radius: var(--radius-lg);
  background: linear-gradient(115deg, var(--teal-soft) 0%, rgba(253, 234, 210, 0.55) 100%);
}

.success__icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  color: var(--teal);
}

.success__message {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--ink);
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
</style>
