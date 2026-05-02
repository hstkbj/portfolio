<template>
  <div class="loading-state" :class="{ 'loading-state--card': card }" role="status" aria-live="polite">
    <div class="loading-state__spinner"></div>
    <p class="loading-state__label">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Chargement en cours...',
  },
  card: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.loading-state {
  display: grid;
  place-items: center;
  gap: 0.85rem;
  min-height: 180px;
  text-align: center;
  color: #475569;
}

.loading-state--card {
  padding: 2rem;
  border: 1px solid var(--app-loader-border);
  border-radius: 1rem;
  background: var(--app-loader-surface);
}

.loading-state__spinner {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 3px solid rgba(13, 110, 253, 0.18);
  border-top-color: var(--app-loader-color);
  animation: loading-spin 0.75s linear infinite;
}

.loading-state__label {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
