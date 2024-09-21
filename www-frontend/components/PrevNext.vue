<!-- ./components/PrevNext.vue -->

<script setup>
// define prev and next props
defineProps(["prev", "next"]);
</script>

<template>
  <ul class="prev-next-cont">
    <li v-if="prev" class="link-item prev">
      <NuxtLink :to="prev._path">
        <BootstrapIcon icon="arrow-left" />
        <span> {{ prev.title }} </span>
      </NuxtLink>
    </li>
    <li v-if="next" class="link-item next">
      <NuxtLink :to="next._path">
        <span> {{ next.title }} </span>
        <BootstrapIcon icon="arrow-right" />
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.prev-next-cont {
  @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}

.link-item a {
  @apply flex gap-2;
}
</style>
