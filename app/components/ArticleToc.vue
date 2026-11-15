<!-- ./components/ArticleToc.vue -->

<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
})

// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
  const _links = links
    .map((link) => {
      let _link = [link]
      if (link.children) {
        const flattened = flattenLinks(link.children)
        _link = [link, ...flattened]
      }
      return _link
    })
    .flat(1)

  console.log({ _links })

  return _links
}
</script>

<template>
  <nav class="toc">
    <header class="toc-header">
      <h3 class="text-xl font-bold">Spis treści</h3>
    </header>
    <ul class="toc-links">
      <!-- render each link with depth class -->
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="['toc-link', `toc-link-depth-${link.depth}`]"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  max-height: calc(100vh - 6rem);
  padding: 1rem;
  overflow: auto;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.toc-header {
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.toc-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.toc-link {
  color: #64748b;
}

.toc-link-depth-3 {
  padding-left: 0.75rem;
}

.toc-link-depth-4 {
  padding-left: 1.5rem;
}

.toc-link-depth-undefined {
  padding-left: 2rem;
}
</style>
