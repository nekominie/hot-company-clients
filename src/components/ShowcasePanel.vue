<script setup lang="ts">
import { fisinorClientsConfig } from '../config/fisinorClientsConfig'

const config = fisinorClientsConfig

const backdropStyle = {
  backgroundImage: `url(${config.showcase.backgroundImage})`,
}

function marker(index: number) {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <aside class="showcase">
    <div class="showcase__backdrop" :style="backdropStyle" aria-hidden="true"></div>
    <div class="showcase__scrim" aria-hidden="true"></div>

    <div class="showcase__content">
      <header class="showcase__brand reveal">
        <img class="showcase__logo" :src="config.brand.logo" :alt="config.brand.shortName" />
        <div class="showcase__brand-text">
          <span class="showcase__brand-name">{{ config.brand.shortName }}</span>
          <span class="showcase__brand-division">{{ config.brand.portalLabel }}</span>
        </div>
      </header>

      <div class="showcase__hero">
        <p class="showcase__tag reveal" style="--reveal-delay: 80ms">
          <span class="showcase__tag-dash" aria-hidden="true"></span>
          {{ config.showcase.welcomeTag }}
        </p>
        <h2 class="showcase__headline reveal" style="--reveal-delay: 160ms">
          {{ config.showcase.headline }}
        </h2>
        <p class="showcase__subheadline reveal" style="--reveal-delay: 240ms">
          {{ config.showcase.subheadline }}
        </p>

        <div class="showcase__features reveal" style="--reveal-delay: 320ms">
          <p class="showcase__features-label">{{ config.showcase.featuresLabel }}</p>
          <ul class="showcase__list">
            <li
              v-for="(feature, index) in config.showcase.features"
              :key="feature.id"
              class="showcase__item"
            >
              <span class="showcase__marker" aria-hidden="true">{{ marker(index) }}</span>
              <div class="showcase__item-body">
                <h3 class="showcase__item-title">{{ feature.title }}</h3>
                <p class="showcase__item-description">{{ feature.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <footer class="showcase__footer reveal" style="--reveal-delay: 480ms">
        <p class="showcase__status">
          <span class="showcase__status-dot" aria-hidden="true"></span>
          {{ config.showcase.systemStatus }}
        </p>
        <p class="showcase__legal">{{ config.showcase.legalNote }}</p>
      </footer>
    </div>
  </aside>
</template>

<style scoped>
.showcase {
  position: relative;
  display: flex;
  overflow: hidden;
  color: var(--white);
  background: var(--blue-950);
}

.showcase__backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  animation: fc-zoom 26s var(--ease-out) infinite alternate;
}

@keyframes fc-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.07);
  }
}

.showcase__scrim {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(90rem 42rem at 108% -12%, rgba(247, 158, 42, 0.2), transparent 58%),
    linear-gradient(
      158deg,
      rgba(4, 29, 48, 0.96) 0%,
      rgba(6, 38, 62, 0.9) 40%,
      rgba(11, 74, 112, 0.68) 100%
    );
}

.showcase__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  width: 100%;
  padding: clamp(1.75rem, 3.5vw, 3.25rem);
}

/* Marca */
.showcase__brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.showcase__logo {
  width: 52px;
  height: 52px;
  padding: 7px;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 14px;
  box-shadow: 0 10px 26px -10px rgba(4, 29, 48, 0.65);
}

.showcase__brand-name {
  display: block;
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.showcase__brand-division {
  display: block;
  margin-top: 2px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
}

/* Bloque principal */
.showcase__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffd9a6;
}

.showcase__tag-dash {
  width: 26px;
  height: 2px;
  border-radius: 2px;
  background: var(--orange);
}

.showcase__headline {
  margin: 1.1rem 0 0;
  max-width: 17ch;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 2.9vw, 2.75rem);
  font-weight: 700;
  line-height: 1.13;
  letter-spacing: -0.018em;
}

.showcase__subheadline {
  margin: 1rem 0 0;
  max-width: 46ch;
  font-size: 0.97rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
}

/* Lista de capacidades del portal */
.showcase__features {
  margin-top: 2.1rem;
  max-width: 36rem;
}

.showcase__features-label {
  margin: 0 0 0.9rem;
  font-size: 0.71rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.showcase__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.05rem 1.9rem;
}

.showcase__item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding-top: 1.05rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  transition: transform 0.35s var(--ease-out), border-color 0.35s;
}

.showcase__item:hover {
  transform: translateY(-3px);
  border-top-color: rgba(247, 158, 42, 0.75);
}

.showcase__marker {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(247, 158, 42, 0.45);
  border-radius: 10px;
  background: rgba(247, 158, 42, 0.16);
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 700;
  color: #ffd9a6;
}

.showcase__item-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.96rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.showcase__item-description {
  margin: 0.28rem 0 0;
  font-size: 0.83rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
}

/* Pie del panel */
.showcase__footer {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.showcase__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.showcase__status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #3ad08f;
  animation: fc-pulse 2.2s infinite;
}

@keyframes fc-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(58, 208, 143, 0.45);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(58, 208, 143, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(58, 208, 143, 0);
  }
}

.showcase__legal {
  margin: 0;
  max-width: 62ch;
  font-size: 0.78rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.55);
}

/* En pantallas pequeñas el panel se convierte en banda de marca */
@media (max-width: 980px) {
  .showcase__content {
    gap: 1.4rem;
    padding: 1.6rem 1.5rem;
  }

  .showcase__subheadline,
  .showcase__features,
  .showcase__footer {
    display: none;
  }

  .showcase__headline {
    margin-top: 0.8rem;
    font-size: 1.55rem;
  }
}
</style>
