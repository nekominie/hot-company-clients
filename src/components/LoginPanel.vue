<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fisinorClientsConfig } from '../config/fisinorClientsConfig'
import { loginClient } from '../services/auth'

const config = fisinorClientsConfig
const router = useRouter()

const identifier = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const submitting = ref(false)
const error = ref('')

async function onSubmit() {
  if (submitting.value) return
  submitting.value = true
  error.value = ''
  try {
    await loginClient(identifier.value, password.value)
    router.push({ name: 'portal-dashboard' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : config.login.errorFallback
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
        <h1 class="auth__title">{{ config.login.title }}</h1>
        <p class="auth__subtitle">{{ config.login.subtitle }}</p>
      </div>

      <form class="auth__form reveal" style="--reveal-delay: 140ms" @submit.prevent="onSubmit">
        <p v-if="error" class="auth__error" role="alert">{{ error }}</p>
        <div class="field">
          <label class="field__label" for="login-identifier">{{ config.login.identifierLabel }}</label>
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
              id="login-identifier"
              v-model="identifier"
              class="field__input"
              type="text"
              :placeholder="config.login.identifierPlaceholder"
              autocomplete="username"
              required
            />
          </div>
        </div>

        <div class="field">
          <div class="field__label-row">
            <label class="field__label" for="login-password">{{ config.login.passwordLabel }}</label>
            <RouterLink class="auth__forgot" :to="config.login.forgotHref">
              {{ config.login.forgotLabel }}
            </RouterLink>
          </div>
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
              id="login-password"
              v-model="password"
              class="field__input field__input--password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="config.login.passwordPlaceholder"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="field__toggle"
              :aria-label="showPassword ? config.login.hidePasswordLabel : config.login.showPasswordLabel"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
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
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
              <svg
                v-else
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <label class="check">
          <input v-model="rememberMe" class="check__input" type="checkbox" />
          <span class="check__box" aria-hidden="true"></span>
          {{ config.login.rememberLabel }}
        </label>

        <button class="auth__submit" type="submit" :disabled="submitting">
          {{ submitting ? config.login.submittingLabel : config.login.submitLabel }}
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

      <aside class="signup reveal" style="--reveal-delay: 210ms">
        <div class="signup__text">
          <p class="signup__title">{{ config.login.createAccount.title }}</p>
          <p class="signup__description">{{ config.login.createAccount.description }}</p>
        </div>
        <RouterLink class="signup__link" :to="config.login.createAccount.href">
          {{ config.login.createAccount.linkLabel }}
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
        </RouterLink>
      </aside>

      <p class="auth__security reveal" style="--reveal-delay: 280ms">
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
        {{ config.login.securityNote }}
      </p>

      <p class="auth__legal reveal" style="--reveal-delay: 320ms">{{ config.login.legal }}</p>
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
  width: min(27rem, 100%);
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

/* Encabezado */
.auth__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.auth__subtitle {
  margin: 0.55rem 0 0;
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

/* Formulario */
.auth__form {
  margin-top: 1.9rem;
  display: grid;
  gap: 1.15rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field__label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.field__label {
  font-size: 0.82rem;
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

.field__input--password {
  padding-right: 3rem;
}

.field__toggle {
  position: absolute;
  top: 50%;
  right: 0.55rem;
  translate: 0 -50%;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: var(--ink-faint);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.field__toggle svg {
  width: 19px;
  height: 19px;
}

.field__toggle:hover {
  color: var(--teal);
  background: var(--teal-soft);
}

.auth__forgot {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--teal);
}

.auth__forgot:hover {
  color: var(--orange-strong);
}

/* Checkbox personalizado */
.check {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  font-size: 0.85rem;
  color: var(--ink-soft);
  cursor: pointer;
  user-select: none;
  position: relative;
}

.check__input {
  position: absolute;
  opacity: 0;
}

.check__box {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 19px;
  height: 19px;
  border: 1.5px solid var(--line);
  border-radius: 6px;
  background: var(--white);
  transition: background 0.2s, border-color 0.2s;
}

.check__box::after {
  content: '';
  width: 10px;
  height: 5px;
  border-left: 2px solid var(--white);
  border-bottom: 2px solid var(--white);
  transform: rotate(-45deg) translate(0.5px, -1px);
  opacity: 0;
  transition: opacity 0.15s;
}

.check:hover .check__box {
  border-color: var(--teal);
}

.check__input:checked + .check__box {
  background: var(--teal);
  border-color: var(--teal);
}

.check__input:checked + .check__box::after {
  opacity: 1;
}

.check__input:focus-visible + .check__box {
  outline: 2px solid var(--orange-strong);
  outline-offset: 2px;
}

/* Botón principal */
.auth__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  margin-top: 0.35rem;
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

/* Llamado a crear cuenta */
.signup {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  margin-top: 1.9rem;
  padding: 1.05rem 1.2rem;
  border: 1px solid rgba(23, 152, 181, 0.28);
  border-radius: var(--radius-lg);
  background: linear-gradient(115deg, var(--teal-soft) 0%, rgba(253, 234, 210, 0.55) 100%);
}

.signup__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--ink);
}

.signup__description {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--ink-soft);
}

.signup__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  font-size: 0.84rem;
  font-weight: 800;
  color: var(--orange-strong);
  white-space: nowrap;
  transition: color 0.2s;
}

.signup__link svg {
  width: 15px;
  height: 15px;
  transition: transform 0.25s var(--ease-out);
}

.signup__link:hover {
  color: var(--blue-700);
}

.signup__link:hover svg {
  transform: translateX(3px);
}

/* Notas */
.auth__security {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  margin: 1.5rem 0 0;
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

.auth__legal {
  margin: 1.4rem 0 0;
  font-size: 0.72rem;
  text-align: center;
  color: var(--ink-faint);
}

@media (max-width: 980px) {
  .auth {
    padding: 1.9rem 1.5rem 2.4rem;
  }
}
</style>
