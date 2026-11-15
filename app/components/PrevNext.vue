<!-- ./components/PrevNext.vue -->

<script setup>
defineProps({
  prev: {
    type: Object,
    default: null,
  },
  next: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <ul class="prev-next-cont">
    <li v-if="prev" class="link-item prev">
      <NuxtLink :to="prev.path">
        <BootstrapIcon icon="arrow-left" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li v-if="next" class="link-item next">
      <NuxtLink :to="next.path">
        <span> {{ next.title }} </span>
        <BootstrapIcon icon="arrow-right" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.link-item a {
  display: flex;
  gap: 0.5rem;
}
</style>
